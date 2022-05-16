var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, } from 'react';
import axios from 'axios';
import UploadList from './UploadList';
import Dragger from './Dragger';
var Upload = function (props) {
    var children = props.children, accept = props.accept, multiple = props.multiple, action = props.action, headers = props.headers, beforeUpload = props.beforeUpload, onError = props.onError, onProgress = props.onProgress, onSuccess = props.onSuccess, onChange = props.onChange, onRemove = props.onRemove, data = props.data, name = props.name, withCredentials = props.withCredentials, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState([]), fileList = _a[0], setFileList = _a[1];
    var handleClick = function (e) {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            uploadFiles(files);
        }
        if (fileInput.current)
            fileInput.current.value = '';
    };
    var uploadFiles = function (fileList) {
        var files = Array.from(fileList);
        files.forEach(function (file) {
            if (beforeUpload) {
                var before = beforeUpload(file);
                if (before instanceof Promise) {
                    before.then(function (newFile) {
                        console.log(newFile);
                        post(newFile);
                    });
                }
                else {
                    if (before)
                        post(file);
                }
            }
            else {
                post(file);
            }
        });
    };
    var updateList = function (uploadFile, newObj) {
        // setFileList 是异步更新,使用回调方式更新
        setFileList(function (prevList) {
            var newFileList = prevList.map(function (file) {
                if (file.uid === uploadFile.uid) {
                    return __assign(__assign({}, file), newObj);
                }
                return file;
            });
            console.log(newFileList);
            return newFileList;
        });
    };
    var post = function (file) {
        var uploadFile = {
            uid: 'file-uid-' + Date.now(),
            raw: file,
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
        };
        setFileList(function (prevList) {
            return __spreadArray([uploadFile], prevList, true);
        });
        onChange && onChange(file);
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        var _headers = __assign({ 'Content-Type': 'multipart/form-data' }, headers);
        axios
            .post(action, formData, {
            headers: _headers,
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
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
            .then(function (res) {
            updateList(uploadFile, {
                percent: 100,
                status: 'success',
                response: res.data,
            });
            onSuccess && onSuccess(res, file);
            onChange && onChange(file);
        })
            .catch(function (error) {
            updateList(uploadFile, {
                percent: 100,
                status: 'error',
                error: error,
            });
            onError && onError(error, file);
            onChange && onChange(file);
        });
    };
    var handleRemove = function (uploadFile) {
        setFileList(function (prevFileList) {
            return prevFileList.filter(function (file) { return file.uid !== uploadFile.uid; });
        });
        onRemove && onRemove(uploadFile);
    };
    return (_jsxs("div", __assign({ className: "viking-upload-component" }, { children: [_jsxs("div", __assign({ className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ? _jsx(Dragger, __assign({ onFile: uploadFiles }, { children: children })) : children, _jsx("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })] })), _jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: 'file',
    withCredentials: false,
};
export default Upload;
