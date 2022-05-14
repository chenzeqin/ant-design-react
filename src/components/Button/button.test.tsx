import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, { ButtonSize, ButtonProps, ButtonType } from './Button';

// 随便写一个测试case
test('first react test case', () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText('Nice');
  expect(element).toBeInTheDocument();
});

const defaultProps = {
  onClick: jest.fn(), // 创建出一个被监控的模拟函数
};
const testProps: ButtonProps = {
  btnType: 'danger',
  className: 'my-classname',
  size: 'lg',
};
const testLink: ButtonProps = {
  btnType: 'link',
};
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('tset Button components', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    // 事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render correct components base on diff props', () => {
    const button = render(<Button {...testProps}>Nice</Button>);
    const element = button.getByText('Nice');
    expect(element).toHaveClass('my-classname btn-danger');
  });
  it('should render a link when btnType equal link', () => {
    const button = render(<Button {...testLink}>Nice</Button>);
    const element = button.getByText('Nice');
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn-link');
  });
  it('should render disabled button when disabled is true', () => {
    const button = render(<Button {...disabledProps}>Nice</Button>);
    const element = button.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
