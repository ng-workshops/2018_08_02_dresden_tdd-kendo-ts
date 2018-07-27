import * as $ from 'jquery';
import 'kendo.all.min';
import * as JSZip from 'jszip';

(window as any).JSZip = JSZip;

$('#grid').kendoGrid({
  toolbar: ['excel'],
  dataSource: {
    data: [{ name: 'Jane Doe 123131' }, { name: 'John Doe' }]
  }
} as any);
