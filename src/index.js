define(["require", "exports", "jquery", "jszip", "kendo.all.min"], function (require, exports, $, JSZip) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.JSZip = JSZip;
    $('#grid').kendoGrid({
        toolbar: ['excel'],
        dataSource: {
            data: [{ name: 'Jane Doe 123131' }, { name: 'John Doe' }]
        }
    });
});
//# sourceMappingURL=index.js.map