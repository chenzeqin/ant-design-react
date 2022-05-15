import React, { ReactChild } from 'react';
export interface UploadProps {
    accept?: string;
    multiple?: boolean;
    children?: ReactChild;
    action: string;
    name?: string;
    headers?: any;
    withCredentials?: boolean;
    data?: {
        [key: string]: string;
    };
    drag?: boolean;
    beforeUpload?: (file: File) => boolean | Promise<any>;
    onProgress?: (progress: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (error: Error, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
}
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
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
declare const Upload: React.FC<UploadProps>;
export default Upload;
