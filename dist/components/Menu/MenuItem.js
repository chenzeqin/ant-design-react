var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.activeIndex === index,
    });
    var handleClick = function () {
        if (!disabled && context.itemClick && typeof index === 'string') {
            context.itemClick(index);
        }
    };
    return (_jsx("li", __assign({ className: classes, onClick: handleClick, style: style }, { children: children })));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
