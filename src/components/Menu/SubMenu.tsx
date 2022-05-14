import React, { useState } from 'react';
import classnames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';
import Icon from '../Icon';

import { CSSTransition } from 'react-transition-group';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, className, title, children } = props;
  const context = useContext(MenuContext);
  const isOpen = !!index && context.defaultOpenSubMenus.indexOf(index) > -1;
  // console.log(index, isOpen, context.defaultOpenSubMenus);
  const [menuOpen, setOpen] = useState<boolean>(isOpen);
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  });
  let timer: any;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvent =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};
  const mouseEvent =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subClasses = classnames('viking-submenu', {
      'menu-opened': menuOpen,
    });
    const childComs = React.Children.map(children, (child, i) => {
      const childEle = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childEle.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childEle, { index: `${index}-${i}` });
      }
      return <></>;
    });

    return (
      <CSSTransition
        in={menuOpen}
        timeout={400}
        unmountOnExit
        classNames="zoom-in-top"
      >
        <ul className={subClasses}>{childComs}</ul>
      </CSSTransition>
    );
  };

  return (
    <li className={classes} {...mouseEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
