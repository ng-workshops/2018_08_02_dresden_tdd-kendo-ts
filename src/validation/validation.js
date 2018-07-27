define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Validator = /** @class */ (function () {
        function Validator() {
            this.validationRules = new Map([['alphabetical', /^[a-z]+$/i], ['numeric', /^[0-9]+$/]]);
        }
        Validator.prototype.validateItem = function (validation, validationRules) {
            if (!validationRules.has(validation.type)) {
                return false;
            }
            return validationRules.get(validation.type).test(validation.value);
        };
        Validator.prototype.createValidationQueries = function (inputs) {
            return Array.from(inputs).map(function (input) { return ({
                name: input.name,
                type: input.dataset.validation,
                value: input.value
            }); });
        };
        Validator.prototype.validateForm = function (form) {
            var e_1, _a;
            var result = {
                get isValid() {
                    return this.errors.length === 0;
                },
                errors: []
            };
            try {
                for (var _b = tslib_1.__values(this.createValidationQueries(form.querySelectorAll('input'))), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var validation = _c.value;
                    var isValid = this.validateItem(validation, this.validationRules);
                    if (!isValid) {
                        result.errors.push(new Error(validation.value + " is not a valid " + validation.name + " value"));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        };
        return Validator;
    }());
    exports.Validator = Validator;
});
//# sourceMappingURL=validation.js.map