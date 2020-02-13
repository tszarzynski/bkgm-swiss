export declare function asc<T, K extends keyof T>(prop: K): (a: T, b: T) => 1 | -1 | 0;
export declare function desc<T, K extends keyof T>(prop: K): (a: T, b: T) => 1 | -1 | 0;
export declare function sortWith<T>(compareFuncs: Array<(a: T, b: T) => number>): (arr: T[]) => T[];
