import { fireEvent, render,screen } from '@testing-library/react';
import Input, { InputProps } from './Input';

const defaultProps: InputProps = {
  placeholder: 'input placeholder',
  onChange: jest.fn(),
};

describe('input component', () => {
  it('should render the correct default input', () => {
    render(<Input {...defaultProps}></Input>);
    expect(
      screen.getByPlaceholderText('input placeholder')
    ).toBeInTheDocument();
  });
  it('should call the ChangeEvent', () => {
    render(<Input {...defaultProps}></Input>);
    const input = screen.getByTestId('test-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '23' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(input.value).toEqual('23');
  });
});
