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
import { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import Transition from '../Transition/index';
import Icon from '../Icon';
import classNames from 'classnames';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutside } from '../../hooks/useClickOutside';
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOption"]);
    var _a = useState(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(-1), highlightIndex = _c[0], setHighlightIndex = _c[1];
    var _d = useState(false), loading = _d[0], setloading = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    var triggerSearch = useRef(false);
    // 防抖
    var debounceValue = useDebounce(inputValue);
    var wraperDiv = useRef(null);
    useClickOutside(wraperDiv, function (e) {
        setShowDropdown(false);
        setSuggestions([]);
    });
    var handleChange = function (e) {
        var value = e.target.value.trim();
        triggerSearch.current = true;
        setInputValue(value);
    };
    var handleSelect = function (item) {
        triggerSearch.current = false;
        setInputValue(item.value);
        onSelect && onSelect(item);
        setShowDropdown(false);
    };
    useEffect(function () {
        if (inputValue && fetchSuggestions && triggerSearch.current) {
            setSuggestions([]);
            var result = fetchSuggestions(inputValue);
            if (result instanceof Promise) {
                setloading(true);
                result.then(function (res) {
                    console.log(res);
                    setSuggestions(res);
                    setShowDropdown(res.length > 0);
                    setloading(false);
                });
            }
            else {
                setSuggestions(result);
                setShowDropdown(result.length > 0);
            }
        }
        else {
            setSuggestions([]);
        }
    }, [debounceValue]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (_jsx(Transition, __assign({ in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () {
                setSuggestions([]);
            } }, { children: _jsxs("ul", __assign({ className: "viking-suggestion-list" }, { children: [loading && (_jsx("div", __assign({ className: "suggstions-loading-icon" }, { children: _jsx(Icon, { icon: "spinner", spin: true }) }))), suggestions.map(function (item, index) {
                        var cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex,
                        });
                        return (_jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
                    })] })) })));
    };
    return (_jsxs("div", __assign({ ref: wraperDiv, className: "viking-auto-complete" }, { children: [_jsx(Input, __assign({ value: inputValue, onKeyDown: handleKeyDown, onChange: handleChange }, restProps)), generateDropdown()] })));
};
export default AutoComplete;
