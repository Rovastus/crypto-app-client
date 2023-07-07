import { ColumnMode } from '@swimlane/ngx-datatable';
import { AppTableColumn, AppTableColumnSettings, AppTableRow, ExpanderColumnSetting } from './app-ngx-datatable.model';

export abstract class AppNgxDatatable {
  protected getNgxDatatableMessages() {
    return {
      emptyMessage: 'No data to display',
    };
  }

  protected rowHeight(): number {
    return 50;
  }

  protected columnMode(): ColumnMode {
    return ColumnMode.force;
  }

  protected rowDetailsHeight(row: AppTableRow): number {
    return row.rowDetailHeight ?? 0;
  }

  protected createColumns(settings: AppTableColumnSettings, expanderSettings: ExpanderColumnSetting | undefined): AppTableColumn[] {
    const appTableColumns: AppTableColumn[] = [];

    if (expanderSettings) {
      appTableColumns.push(this.createExpanderColumn(expanderSettings));
    }

    settings.forEach((value, key) => appTableColumns.push(this.createColumn(key, value)));

    return appTableColumns;
  }

  private createExpanderColumn(expanderSettings: ExpanderColumnSetting) {
    return this.createColumn('expander', {
      width: 48,
      cellTemplate: expanderSettings.cellTemplate,
      headerTemplate: expanderSettings.headerTemplate,
      frozenLeft: true,
      canAutoResize: false,
      resizeable: false,
      sortable: false,
      draggable: false,
    });
  }

  private createColumn(name: string, columnSettings: Partial<AppTableColumn>): AppTableColumn {
    return {
      name,
      headerClass: name + '-column-cell',
      cellClass: name + '-column-cell',
      resizeable: false,
      draggable: false,
      ...columnSettings,
    };
  }
}
