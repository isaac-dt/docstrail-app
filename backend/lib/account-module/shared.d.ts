export declare class Test {
    readonly name: string;
    constructor(name: string);
    runTest(): void;
    sayHello(): void;
}
/** Sanitizer for account handlers. */
export declare class Sanitizer {
    readonly test: Test;
    constructor(test: Test);
    sayHello(): void;
}
