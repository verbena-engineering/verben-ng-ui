import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ColumnDefinition } from 'verben-ng-ui/src/lib/components/data-table/data-table.types';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  tableData: YourDataType[] = Array.from({ length: 10 }, (_, index) => ({
    id: `ACTIVITY-${index + 1}`,
    activityDetails: Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => generateRandomName()
    ),
    numberOfParticipants: Math.floor(Math.random() * 20) + 1,
  }));

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
      id: 'actions',
      header: 'Actions',
    },
  ];

  onRowEdit(editedRow: YourDataType) {
    console.log('Row edited:', editedRow);
    // Handle the edited row
  }

  onSelectionChange(selectedRows: YourDataType[]) {
    console.log('Selection changed:', selectedRows);
    // Handle the selection change
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
}
