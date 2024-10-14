import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnDefinition } from 'verben-ng-ui/src/lib/components/data-table/data-table.types';
import { TableStyles } from 'verben-ng-ui/src/lib/components/data-table/style.types';
import { DataExportService } from 'verben-ng-ui/src/public-api';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  dropdownOptions: string[] = ['Tester', 'Admin', 'Staff'];

  tableData = signal<YourDataType[]>(
    Array.from({ length: 10 }, (_, index) => ({
      id: `ACTIVITY-${index + 1}`,
      activityDetails: Array.from(
        { length: Math.floor(Math.random() * 5) + 1 },
        () => generateRandomName()
      ),
      numberOfParticipants: Math.floor(Math.random() * 20) + 1,
      role: 'Tester',
      names: generateRandomName(),
      age: Math.floor(Math.random() * 50) + 1,
      money: Math.floor(Math.random() * 500) + 1,
      message:
        'Dark seas and dark towers. Night sky and wry smile. Loneliness, nonetheless.',
    }))
  );

  tableColumns: ColumnDefinition<YourDataType>[] = [
    {
      id: 'select',
      header: 'Select',
    },
    {
      id: 'customer',
      header: 'Customer',
      accessorFn: (row) => ({
        names: row.activityDetails
          ?.map((detail) => `${detail.firstName} ${detail.lastName}`)
          .join(', '),
        participants: row.numberOfParticipants,
      }),
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
    },
    {
      id: 'actions',
      header: 'Actions',
    },
  ];

  table2Styles = defaultTableStyles;

  tableColumns2: ColumnDefinition<YourDataType>[] = [
    {
      id: 'select',
      header: 'Select',
    },
    {
      id: 'name',
      header: 'Full Name',
      accessorFn: (row) => row.names?.firstName + ' ' + row.names?.lastName,
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
    },
    {
      id: 'age',
      header: 'Age',
      accessorKey: 'age',
    },
    {
      id: 'money',
      header: 'Money',
      accessorKey: 'money',
    },
    {
      id: 'message',
      header: 'Message',
      accessorKey: 'message',
    },
    {
      id: 'actions',
      header: 'Actions',
    },
  ];

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private exportService: DataExportService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      customer: this.fb.group({
        names: ['', Validators.required],
        participants: [0, [Validators.required, Validators.min(1)]],
      }),
      // Add other form controls as needed
    });
  }

  onRowEdit(editedRow: YourDataType) {
    console.log('Row edited:', editedRow);
    // Handle the edited row
  }

  onSelectionChange(selectedRows: YourDataType[]) {
    console.log('Selection changed:', selectedRows);
    // Handle the selection change
  }

  onRowSave(row: YourDataType) {
    if (this.form.valid) {
      this.tableData.update((data) => {
        const index = data.findIndex((item) => item.id === row.id);
        if (index !== -1) {
          data[index] = row;
        }
        return [...data];
      });
      console.log('Saved row:', row);
    }
  }

  onRowDelete(row: YourDataType) {
    this.tableData.update((data) => data.filter((item) => item.id !== row.id));
    console.log('Deleted row:', row);
  }

  getDataProperties(): string[] {
    if (this.tableData && this.tableData.length > 0) {
      return Object.keys(this.tableData()[0]);
    }
    return [];
  }

  handleExport(exportedData: Partial<any>[]) {
    // Here you would implement the actual download functionality
    console.log('Exported data:', exportedData);
    // For example, you could convert to CSV and trigger a download
    this.downloadCSV(exportedData);
  }

  private downloadCSV(data: Partial<any>[]) {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map((row) => headers.map((header) => row[header]).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

// Function to generate random first and last names
function generateRandomName(): { firstName: string; lastName: string } {
  const firstNames = [
    'John',
    'Jane',
    'Emily',
    'Michael',
    'Sarah',
    'William',
    'Olivia',
    'James',
    'Ava',
    'Robert',
  ];
  const lastNames = [
    'Doe',
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
  ];

  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
  };
}
interface YourDataType {
  id: string;
  activityDetails: { firstName: string; lastName: string }[];
  numberOfParticipants: number;
  role?: string;
  age?: number;
  money?: number;
  message?: string;
  names?: { firstName: string; lastName: string };
}

// Default styles
const defaultTableStyles: TableStyles = {
  // borderCollapse: 'collapse',
  borderSpacing: '0px',
  border: '1px solid #D4A007',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  width: '100%',
  header: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: '2px solid #e0e0e0',
  },
  rows: {
    even: {
      backgroundColor: '#FDFDFD',
    },
    odd: {
      backgroundColor: '#F2F2F2',
    },
    nth: {
      interval: 5,
      style: {
        backgroundColor: '#f0f0f0',
      },
    },
  },
  cells: {
    padding: '12px 16px',
    borderBottom: '1px solid #e0e0e0',
  },
  footer: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    padding: '12px 16px',
    borderTop: '2px solid #e0e0e0',
  },
};
