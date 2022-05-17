import React, {
  ChangeEvent,
  MouseEvent,
  ReactChild,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import UploadList from './UploadList';
import Dragger from './Dragger';

export interface UploadProps {
  accept?: string;
  multiple?: boolean;
  children?: ReactChild;
  action: string;
  name?: string;
  headers?: any;
  withCredentials?: boolean;
  data?: { [key: string]: string };
  drag?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<any>;
  onProgress?: (progress: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: Error, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

const Upload: React.FC<UploadProps> = (props) => {
  const {
    children,
    accept,
    multiple,
    action,
    headers,
    beforeUpload,
    onError,
    onProgress,
    onSuccess,
    onChange,
    onRemove,
    data,
    name,
    withCredentials,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadFiles(files);
    }
    if (fileInput.current) fileInput.current.value = '';
  };
  const uploadFiles = (fileList: FileList) => {
    const files = Array.from(fileList);
    files.forEach((file) => {
      if (beforeUpload) {
        const before = beforeUpload(file);
        if (before instanceof Promise) {
          before.then((newFile) => {
            console.log(newFile);
            post(newFile);
          });
        } else {
          if (before) post(file);
        }
      } else {
        post(file);
      }
    });
  };
  const updateList = (uploadFile: UploadFile, newObj: Partial<UploadFile>) => {
    // setFileList 是异步更新,使用回调方式更新
    setFileList((prevList) => {
      const newFileList = prevList.map((file) => {
        if (file.uid === uploadFile.uid) {
          return {
            ...file,
            ...newObj,
          };
        }
        return file;
      });
      console.log(newFileList);
      return newFileList;
    });
  };
  const post = (file: File) => {
    const uploadFile: UploadFile = {
      uid: 'file-uid-' + Date.now(),
      raw: file,
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
    };
    setFileList((prevList) => {
      return [uploadFile, ...prevList];
    });
    onChange && onChange(file);
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    const _headers = {
      'Content-Type': 'multipart/form-data',
      ...headers,
    };
    axios
      .post(action, formData, {
        headers: _headers,
        withCredentials: withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateList(uploadFile, {
              percent: percentage,
              status: 'uploading',
            });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        updateList(uploadFile, {
          percent: 100,
          status: 'success',
          response: res.data,
        });
        onSuccess && onSuccess(res, file);
        onChange && onChange(file);
      })
      .catch((error) => {
        updateList(uploadFile, {
          percent: 100,
          status: 'error',
          error: error,
        });
        onError && onError(error, file);
        onChange && onChange(file);
      });
  };
  const handleRemove = (uploadFile: UploadFile) => {
    setFileList((prevFileList) => {
      return prevFileList.filter((file) => file.uid !== uploadFile.uid);
    });
    onRemove && onRemove(uploadFile);
  };

  return (
    <div className="viking-upload-component">
      <div
        className="viking-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {drag ? <Dragger onFile={uploadFiles}>{children}</Dragger> : children}
        <input
          className="viking-file-input"
          data-testid="test-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};
Upload.defaultProps = {
  name: 'file',
  withCredentials: false,
};
export default Upload;
