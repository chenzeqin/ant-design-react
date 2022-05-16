import { useEffect } from "react";
export var useClickOutside = function (htmlRef, handle) {
    console.log('cli');
    useEffect(function () {
        var clickHandler = function (e) {
            if (!htmlRef.current || htmlRef.current.contains(e.target)) {
                return;
            }
            handle(e);
        };
        document.addEventListener('click', clickHandler);
        return function () {
            document.removeEventListener('click', clickHandler);
        };
    }, [htmlRef, handle]);
};
