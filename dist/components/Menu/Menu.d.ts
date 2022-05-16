import React from 'react';
declare type SelectCB = (index: string) => void;
declare type MenuMode = 'horizontal' | 'vertical';
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
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
