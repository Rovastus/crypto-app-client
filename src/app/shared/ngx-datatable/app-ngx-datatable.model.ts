import { TemplateRef } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable/lib/types/table-column.type';

export interface AppTableRow {
  id: number;
  rowDetailHeight: number | undefined;
}

export interface AppTableColumn extends TableColumn {
  extraData?: unknown;
}

export type ExpanderColumnSetting = {
  cellTemplate: TemplateRef<unknown>;
  headerTemplate: TemplateRef<unknown>;
};

export type AppTableColumnSettings = Map<string, Partial<AppTableColumn>>;
