import React from 'react';
export interface DraggerProps {
    onFile: (fileList: FileList) => void;
    children?: React.ReactChild;
}
declare const Dragger: React.FC<DraggerProps>;
export default Dragger;
