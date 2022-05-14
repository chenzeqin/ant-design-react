import React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface ButtonDefaultProps {
  className?: string;
  size?: ButtonSize;
  /** 按钮类型 */
  btnType?: ButtonType;
  disabled?: boolean;
  children: React.ReactChild;
  href?: string;
}
type NativeButtonProps = ButtonDefaultProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = ButtonDefaultProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// 把所有属性统一设置为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'vikingship'
 * ~~~
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const { className, size, btnType, disabled, children, href, ...restProps } =
    props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  });

  if (btnType === 'link') {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  btnType: 'default',
  disabled: false,
};
/**
 * General component description.
 */
export default Button;
