import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Upload from './Upload';
import Button from '../Button';
import Icon from '../Icon';

const onSuccess = (data: any, file: File) => {
  console.log(data);
};
// const beforeUpload = (file: File) => {
//   const newFile = new File([file], 'new_file_name', { type: file.type });
//   return Promise.resolve(newFile);
// };

const DefaultUpload = () => {
  return (
    <Upload
      action="https://jsonplaceholder.typicode.com/posts"
      onSuccess={onSuccess}
      onProgress={action('progress')}
      multiple={true}
      drag={true}
    >
      <Button><Icon icon="upload"></Icon></Button>
    </Upload>
  );
};

storiesOf('upload component', module).add('Upload', DefaultUpload);
