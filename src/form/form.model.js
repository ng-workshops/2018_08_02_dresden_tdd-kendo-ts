/// <amd-dependency path="kendo.all.min" />
define(["require", "exports", "tslib", "kendo.all.min"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FormViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(FormViewModel, _super);
        function FormViewModel() {
            var _this = _super.call(this) || this;
            // the expenses array will hold the grid values
            _this.expenses = [];
            // the type array populates the drop down
            _this.type = [
                { name: 'Food', value: 'food' },
                { name: 'Clothing', value: 'clothing' },
                { name: 'Bills', value: 'bills' },
                { name: 'Drinks', value: 'drinks' },
                { name: 'Tax', value: 'tax' }
            ];
            // the expenseType holds the currently selected value of the dropdown list
            _this.expenseType = 'food';
            // the values are bound to the merchant and amount fields
            _this.merchant = null;
            _this.amount = null;
            _super.prototype.init.call(_this, _this);
            return _this;
        }
        // the event executes on clicking the Add button
        FormViewModel.prototype.create = function (e) {
            // add the items to the array of expenses
            this.get('expenses').push({ Type: this.get('expenseType'), Merchant: this.get('merchant'), Amount: this.get('amount') });
            // reset the form
            this.set('expenseType', 'food');
            this.set('merchant', '');
            this.set('amount', '');
        };
        return FormViewModel;
    }(kendo.data.ObservableObject));
    exports.FormViewModel = FormViewModel;
    function init() {
        return new FormViewModel();
    }
    exports.init = init;
});
//# sourceMappingURL=form.model.js.map