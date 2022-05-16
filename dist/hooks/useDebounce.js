import { useEffect, useState } from "react";
export var useDebounce = function (value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var handler = setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        // value变化，就清空重新计时
        return function () {
            clearTimeout(handler);
        };
    }, [value]);
    return debounceValue;
};
