/**
 * Generate, manage and validate Universally Unique Identifiers v4.
 * For usage and details, see the [docs](https://github.com/jonamat/uuid-v4-validator)
 */
export declare class UUIDv4 {
    protected readonly _validationRegex: RegExp;
    protected readonly _uuidPattern = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    private _id;
    static blockingError: boolean;
    /**
     * Generate a new Error or warn message
     * @param id Invalid UUID
     * @private
     */
    private _throwInvalidIdError;
    /**
     * Create a new UUIDv4 instance.
     * @param id Initialize with custom UUID. It will be validated at runtime and it could generate an error.
     * If not specified, a valid random one will be generated.
     */
    constructor(id?: string);
    /**
     * Generate a new valid UUID v4 string
     * @returns A random generated UUID v4 string
     */
    static generate: () => string;
    /**
     * Generate a new UUID that will override the old one
     */
    refreshId: () => void;
    /**
     * Validate an UUID v4 string, instance or UUIDv4-like object
     * ```
     * // UUIDv4-like object:
     * const toValidate = {
     *   _id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
     * }
     * ```
     * @param arg An UUIDv4 instance, a string or an UUIDv4-like object
     * @returns Validity of the provided param
     */
    static validate(arg: UUIDv4 | string | Record<string, unknown>): boolean;
    /**
     * The current assigned UUID
     * @param id A valid UUID v4 string. It will be validated at runtime and it could generate an error.
     * @returns The current assigned UUID
     */
    get id(): string;
    set id(id: string);
}
