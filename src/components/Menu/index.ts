import Menu, { MenuProps } from "./Menu";
import SubMenu, { SubMenuProps } from "./SubMenu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import { FC } from "react";

export type IMenuComponent = FC<MenuProps> & { SubMenu: FC<SubMenuProps>, MenuItem: FC<MenuItemProps> }
const TransMenu = Menu as IMenuComponent
TransMenu.SubMenu = SubMenu
TransMenu.MenuItem = MenuItem

export default TransMenu