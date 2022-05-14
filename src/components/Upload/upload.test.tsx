import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  createEvent,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../Icon', () => {
  return ({ icon, onClick }: any) => {
    return (
      <i className="fa" onClick={onClick}>
        {icon}
      </i>
    );
  };
});

import Upload, { UploadProps } from './Upload';
const testProps: UploadProps = {
  action: 'fake.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
const testFile = new File(['ccc'], 'test.png', { type: 'image/png' });
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
describe('upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>click to upload</Upload>);
    fileInput = wrapper.container.querySelector('input')!;
    uploadArea = wrapper.queryByText('click to upload')!;
  });
  it('upload should work', async () => {
    const { queryByText } = wrapper;
    expect(fileInput).not.toBeVisible();
    expect(uploadArea).toBeInTheDocument();
    const users = [{ name: 'Bob' }];
    const resp = { data: users };
    // https://jestjs.io/zh-Hans/docs/mock-functions#%E6%A8%A1%E6%8B%9F%E6%A8%A1%E5%9D%97
    // 模拟 http请求 方式1
    // mockAxios.post.mockImplementation(() => {
    //   return Promise.resolve(resp);
    // });
    // 模拟 http请求 方式2，快捷方式
    mockAxios.post.mockResolvedValue(Promise.resolve(resp));
    // upload file
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    // loading 开始出现 图标mock为了图标名称spinner
    expect(queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
      expect(queryByText('check-circle')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(resp, testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    // remove file
    expect(queryByText('times')).toBeInTheDocument();
    fireEvent.click(queryByText('times')!);
    //  toBeCalledWith + objectContaining: 判断对象包含某些属性
    expect(testProps.onRemove).toBeCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    );
  });
  it('drag and drop files should work', async () => {
    const { queryByText } = wrapper;
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');

    const users = [{ name: 'Bob' }];
    const resp = { data: users };
    mockAxios.post.mockResolvedValue(Promise.resolve(resp));
    fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });

    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
      expect(queryByText('check-circle')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(resp, testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);
  });
});