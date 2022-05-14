import React, { DragEvent, useState } from 'react';
import classNames from 'classnames';

export interface DraggerProps {
  onFile: (fileList: FileList) => void;
  children?: React.ReactChild;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const klass = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver,
  });
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    onFile(files);
  };

  return (
    <div
      className={klass}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
export default Dragger;
