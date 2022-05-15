import React from 'react';
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactChild;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
