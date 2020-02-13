"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asc(prop) {
    return (a, b) => {
        if (a[prop] > b[prop])
            return 1;
        if (a[prop] < b[prop])
            return -1;
        return 0;
    };
}
exports.asc = asc;
function desc(prop) {
    return (a, b) => {
        if (a[prop] > b[prop])
            return -1;
        if (a[prop] < b[prop])
            return 1;
        return 0;
    };
}
exports.desc = desc;
function sortWith(compareFuncs) {
    return (arr) => arr.slice().sort((a, b) => {
        let result = 0;
        let i = 0;
        while (result === 0 && i < compareFuncs.length) {
            result = compareFuncs[i](a, b);
            i += 1;
        }
        return result;
    });
}
exports.sortWith = sortWith;
;
//# sourceMappingURL=sort.js.map