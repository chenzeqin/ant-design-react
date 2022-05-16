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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from './components/Button/index';
import Menu from './components/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Transition from './components/Transition';
library.add(fas);
function App() {
    var onClick = function () {
        console.log('btn have been clicked');
    };
    var onSelect = function (index) {
        console.log(index);
    };
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    return (_jsxs("div", __assign({ className: "App" }, { children: [_jsx(Icon, { icon: "arrow-down", theme: "primary", onClick: function () {
                    setOpen(!open);
                } }), _jsx(Transition, __assign({ in: open, timeout: 400, wrapper: true, unmountOnExit: true, classNames: "zoom-in-top" }, { children: _jsx(Icon, { icon: "arrow-down", theme: "primary" }) })), _jsxs(Menu, __assign({ onSelect: onSelect, mode: "horizontal", defaultOpenSubMenus: ['3'] }, { children: [_jsx(MenuItem, { children: "menu1" }), _jsx(MenuItem, __assign({ disabled: true }, { children: "menu2" })), _jsx(MenuItem, { children: "menu3" }), _jsxs(SubMenu, __assign({ title: "submenu-title" }, { children: [_jsx(MenuItem, { children: "menu1" }), _jsx(MenuItem, __assign({ disabled: true }, { children: "menu2" })), _jsx(MenuItem, { children: "menu3" })] }))] })), _jsx(Button, __assign({ size: "lg", onClick: onClick }, { children: "large" })), _jsx(Button, __assign({ size: "sm" }, { children: "small" })), _jsx(Button, __assign({ btnType: "danger" }, { children: "danger" }))] })));
}
export default App;
