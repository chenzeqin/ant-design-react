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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useState } from 'react';
import classnames from 'classnames';
export var MenuContext = createContext({
    activeIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: [],
});
var Menu = function (props) {
    var className = props.className, style = props.style, mode = props.mode, defaultIndex = props.defaultIndex, onSelect = props.onSelect, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), activeIndex = _a[0], setIndex = _a[1];
    var itemClick = function (index) {
        setIndex(index);
        onSelect && onSelect(index);
    };
    var contextValue = {
        activeIndex: activeIndex || '0',
        mode: mode || 'vertical',
        itemClick: itemClick,
        defaultOpenSubMenus: defaultOpenSubMenus || [],
    };
    var classes = classnames('viking-menu', className, "menu-".concat(mode));
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childEle = child;
            var displayName = childEle.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childEle, { index: index.toString() });
            }
            return _jsx(_Fragment, {});
        });
    };
    return (_jsx("ul", __assign({ className: classes, style: style, "data-testid": "test-menu" }, { children: _jsx(MenuContext.Provider, __assign({ value: contextValue }, { children: renderChildren() })) })));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: [],
};
export default Menu;
