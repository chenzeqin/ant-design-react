import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './MenuItem';

type SelectCB = (index: string) => void;
type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
  mode?: MenuMode;
  defaultIndex?: string;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCB;
  children?: React.ReactNode;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  activeIndex: string;
  itemClick?: SelectCB;
  mode: MenuMode;
  defaultOpenSubMenus: string[];
}

export const MenuContext = createContext<IMenuContext>({
  activeIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: [],
});
const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    style,
    mode,
    defaultIndex,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props;
  const [activeIndex, setIndex] = useState(defaultIndex);

  const itemClick = (index: string) => {
    setIndex(index);
    onSelect && onSelect(index);
  };
  const contextValue: IMenuContext = {
    activeIndex: activeIndex || '0',
    mode: mode || 'vertical',
    itemClick,
    defaultOpenSubMenus: defaultOpenSubMenus || [],
  };
  const classes = classnames('viking-menu', className, `menu-${mode}`);

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childEle = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childEle.type;

      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childEle, { index: index.toString() });
      }
      return <></>;
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={contextValue}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: [],
};

export default Menu;
