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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from 'classnames';
import Icon from '../Icon';
// fix: 受控表单不能传入defaultValue
var fixControlledValue = function (value) {
    if (value === undefined || value === null) {
        return '';
    }
    return value;
};
var Input = function (props) {
    var _a;
    var className = props.className, size = props.size, disabled = props.disabled, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["className", "size", "disabled", "icon", "prepend", "append", "style"]);
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    var classNames = classnames('viking-input-wrapper', className, (_a = {},
        // 根据样式复制过来的
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    return (_jsxs("div", __assign({ className: classNames, style: style }, { children: [prepend && _jsx("div", __assign({ className: "viking-input-group-prepend" }, { children: prepend })), icon && (_jsx("div", __assign({ className: "icon-wrapper" }, { children: _jsx(Icon, { icon: icon, title: "title-".concat(icon) }) }))), _jsx("input", __assign({ className: "viking-input-inner", disabled: disabled, "data-testid": "test-input" }, restProps)), append && _jsx("div", __assign({ className: "viking-input-group-append" }, { children: append }))] })));
};
export default Input;
