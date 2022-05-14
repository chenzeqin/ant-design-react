import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

type InputSize = 'sm' | 'lg';
// Omit忽略某个属性
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// fix: 受控表单不能传入defaultValue
const fixControlledValue = (value: any) => {
  if (value === undefined || value === null) {
    return '';
  }
  return value;
};

const Input: FC<InputProps> = (props) => {
  const {
    className,
    size,
    disabled,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props;

  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  const classNames = classnames('viking-input-wrapper', className, {
    // 根据样式复制过来的
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });
  return (
    <div className={classNames} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        data-testid="test-input"
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
