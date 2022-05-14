import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactChild;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.activeIndex === index,
  });
  const handleClick = () => {
    if (!disabled && context.itemClick && typeof index === 'string') {
      context.itemClick(index);
    }
  };
  return (
    <li className={classes} onClick={handleClick} style={style}>
      {children}
    </li>
  );
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
