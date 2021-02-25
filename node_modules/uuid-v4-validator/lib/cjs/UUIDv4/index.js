"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Base pattern for UUIDv4 generation */
var uuidPattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
var validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;
/**
 * UUIDv4 custom type guard
 * @param arg UUIDv4-like object to check
 * @return UUIDv4-like object validity
 */
var isUUIDv4Like = function (arg) {
    return arg && arg._id && typeof arg._id == 'string';
};
/**
 * Generate, manage and validate Universally Unique Identifiers v4.
 * For usage and details, see the [docs](https://github.com/jonamat/uuid-v4-validator)
 */
var UUIDv4 = /** @class */ (function () {
    /**
     * Create a new UUIDv4 instance.
     * @param id Initialize with custom UUID. It will be validated at runtime and it could generate an error.
     * If not specified, a valid random one will be generated.
     */
    function UUIDv4(id) {
        var _this = this;
        this._validationRegex = validationRegex;
        this._uuidPattern = uuidPattern;
        /**
         * Generate a new Error or warn message
         * @param id Invalid UUID
         * @private
         */
        this._throwInvalidIdError = function (id) {
            if (UUIDv4.blockingError)
                throw new Error("The provided UUIDv4 \"" + id + "\" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one");
            else
                console.warn("The provided UUIDv4 \"" + id + "\" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one");
        };
        /**
         * Generate a new UUID that will override the old one
         */
        this.refreshId = function () {
            _this._id = UUIDv4.generate();
        };
        if (id) {
            if (!UUIDv4.validate(id)) {
                this._throwInvalidIdError(id);
                this._id = UUIDv4.generate();
            }
            else
                this._id = id;
        }
        else
            this._id = UUIDv4.generate();
    }
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
    UUIDv4.validate = function (arg) {
        if (arg instanceof UUIDv4)
            return validationRegex.test(arg.id);
        else if (typeof arg == 'string')
            return validationRegex.test(arg);
        else
            return isUUIDv4Like(arg) && validationRegex.test(arg._id);
    };
    Object.defineProperty(UUIDv4.prototype, "id", {
        /**
         * The current assigned UUID
         * @param id A valid UUID v4 string. It will be validated at runtime and it could generate an error.
         * @returns The current assigned UUID
         */
        get: function () {
            return this._id;
        },
        set: function (id) {
            if (!UUIDv4.validate(id))
                this._throwInvalidIdError(id);
            else
                this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    UUIDv4.blockingError = true;
    /**
     * Generate a new valid UUID v4 string
     * @returns A random generated UUID v4 string
     */
    UUIDv4.generate = function () {
        return uuidPattern.replace(/[xy]/g, function (char) {
            var rand = (Math.random() * 16) | 0;
            return (char === 'x' ? rand : (rand & 0x3) | 0x8).toString(16);
        });
    };
    return UUIDv4;
}());
exports.UUIDv4 = UUIDv4;
