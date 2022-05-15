import { MenuProps } from "./Menu";
import { SubMenuProps } from "./SubMenu";
import { MenuItemProps } from "./MenuItem";
import { FC } from "react";
export declare type IMenuComponent = FC<MenuProps> & {
    SubMenu: FC<SubMenuProps>;
    MenuItem: FC<MenuItemProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
