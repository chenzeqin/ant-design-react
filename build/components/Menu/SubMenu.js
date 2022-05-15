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
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import classnames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './Menu';
import Icon from '../Icon';
import { CSSTransition } from 'react-transition-group';
var SubMenu = function (props) {
    var index = props.index, className = props.className, title = props.title, children = props.children;
    var context = useContext(MenuContext);
    var isOpen = !!index && context.defaultOpenSubMenus.indexOf(index) > -1;
    // console.log(index, isOpen, context.defaultOpenSubMenus);
    var _a = useState(isOpen), menuOpen = _a[0], setOpen = _a[1];
    var classes = classnames('menu-item submenu-item', className, {
        'is-active': context.activeIndex === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    var timer;
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var handleMouse = function (e, toggle) {
        e.preventDefault();
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvent = context.mode === 'vertical'
        ? {
            onClick: handleClick,
        }
        : {};
    var mouseEvent = context.mode === 'horizontal'
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    var renderChildren = function () {
        var subClasses = classnames('viking-submenu', {
            'menu-opened': menuOpen,
        });
        var childComs = React.Children.map(children, function (child, i) {
            var childEle = child;
            var displayName = childEle.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childEle, { index: "".concat(index, "-").concat(i) });
            }
            return _jsx(_Fragment, {});
        });
        return (_jsx(CSSTransition, __assign({ in: menuOpen, timeout: 400, unmountOnExit: true, classNames: "zoom-in-top" }, { children: _jsx("ul", __assign({ className: subClasses }, { children: childComs })) })));
    };
    return (_jsxs("li", __assign({ className: classes }, mouseEvent, { children: [_jsxs("div", __assign({ className: "submenu-title" }, clickEvent, { children: [title, _jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] })));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
