import React from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface ButtonDefaultProps {
    className?: string;
    size?: ButtonSize;
    /** 按钮类型 */
    btnType?: ButtonType;
    disabled?: boolean;
    children: React.ReactChild;
    href?: string;
}
declare type NativeButtonProps = ButtonDefaultProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = ButtonDefaultProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'vikingship'
 * ~~~
 */
export declare const Button: React.FC<ButtonProps>;
/**
 * General component description.
 */
export default Button;
