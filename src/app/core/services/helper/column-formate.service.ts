import { Injectable } from '@angular/core';
import {
  TableColumns,
  TableSchema,
} from '../../../shared/ui/table/table.component.models';

@Injectable({ providedIn: 'root' })
export class ColumnFormateService {
  userColors = new Map<number, string>();
  iconColorList = [
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-orange-100 text-orange-600',
    'bg-purple-100 text-purple-600',
    'bg-indigo-100 text-indigo-600',
    'bg-red-100 text-red-600',
  ];

  constructor() {}

  getInitials(name: string): string {
    if (!name) return '';

    const nameParts = name.trim().split(' ');
    const firstInitial = nameParts[0]?.charAt(0) || '';
    const lastInitial = nameParts[1]?.charAt(0) || '';

    return (firstInitial + lastInitial).toUpperCase();
  }

  getRandomColor(userId: number): string {
    if (this.userColors.has(userId)) {
      return this.userColors.get(userId)!;
    }
    const randomIndex = userId % this.iconColorList.length;
    const colorClass = this.iconColorList[randomIndex];
    this.userColors.set(userId, colorClass);

    return colorClass;
  }

  formatAvatar = <T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) => {
    const initials = this.getInitials(event[columnSchema.dataPropertyName]);
    const colorClass = this.getRandomColor(event.id);

    return `
        <div class="flex items-center">
            <div class="h-7 w-7 text-xs rounded-full flex items-center justify-center ${colorClass}">
                ${initials}
            </div>
            <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">
                    ${event[columnSchema.dataPropertyName]}
                </div>
                <div class="text-sm text-gray-500">
                    ${event.email}
                </div>
            </div>
        </div>
        `;
  };

  formatAvatarWithNameSubName = <T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) => {
    const initials = this.getInitials(event.company);
    const colorClass = this.getRandomColor(event.id);

    return `
        <div class="flex items-center">
            <div class="h-7 w-7 text-xs rounded-full flex items-center justify-center ${colorClass}">
                ${initials}
            </div>
            <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">
                    ${event[columnSchema.dataPropertyName]}
                </div>
                <div class="text-sm text-gray-500">
                    ${event.company}
                </div>
            </div>
        </div>
        `;
  };

  formatNameDescription = <T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) => {
    return `
        <div class="flex items-center">
            <div>
                <div class="text-sm font-medium text-gray-900">
                    ${event[columnSchema.dataPropertyName]}
                </div>
                <div class="text-sm text-gray-500">
                    ${event.description}
                </div>
            </div>
        </div>
        `;
  };

  formatAvatarWithName = <T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) => {
    const initials = this.getInitials(event[columnSchema.dataPropertyName]);
    const colorClass = this.getRandomColor(event.id);

    return `
        <div class="flex items-center">
            <div class="h-7 w-7 text-xs rounded-full flex items-center justify-center ${colorClass}">
                ${initials}
            </div>
            <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">
                    ${event[columnSchema.dataPropertyName]}
                </div>
            </div>
        </div>
        `;
  };

  formatString<T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) {
    return `<div class="text-sm text-gray-900">${
      event[columnSchema.dataPropertyName]
    }</div>`;
  }

  formatFileCount<T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) {
    return `
        <div class="text-sm text-gray-900 flex items-center">
            <div class="w-5 h-5 flex items-center justify-center mr-1 text-gray-500">
                <i class="ri-file-line"></i>
            </div>
            ${event[columnSchema.dataPropertyName]} files
        </div>
        `;
  }

  formatStatus<T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) {
    const status = event[columnSchema.dataPropertyName];
    let statusClass = '';

    switch (status) {
      case 'Pending':
        statusClass = 'bg-[#89dee2]/20 text-[#2e4450]';
        break;
      case 'Approved':
        statusClass = 'bg-[#16c2d5]/20 text-[#10217d]';
        break;
      case 'Confirmed':
        statusClass = 'bg-green-100 text-green-800';
        break;
      case 'Rejected':
        statusClass = 'bg-[#d7baad]/50 text-[#2e4450]';
        break;
      case 'Info Requested':
        statusClass = 'bg-[#d7baad]/30 text-[#527c88]';
        break;
      case 'Active':
        statusClass = 'bg-green-100 text-green-800';
        break;
      case 'Expiring Soon':
        statusClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Draft':
        statusClass = 'bg-gray-100 text-gray-800';
        break;
      case 'Closed':
        statusClass = 'bg-red-100 text-red-800';
        break;
      case 'Open':
        statusClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Filled':
        statusClass = 'bg-green-100 text-green-800';
        break;
      case 'Urgent':
        statusClass = 'bg-red-100 text-red-800';
        break;
      case 'In Progress':
        statusClass = 'bg-blue-100 text-blue-800';
        break;
      default:
        statusClass = 'bg-[#89dee2]/20 text-[#2e4450]';
    }
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">${status}</span>`;
  }

  formatGroupAvatar = <T, TD>(
    tableSchema: TableSchema<T, TD[]>,
    columnSchema: TableColumns<T, TD[]>,
    event: any
  ) => {
    const avatars =
      event.staffAssigned
        ?.map((member: any) => {
          const initials = this.getInitials(member.name);
          const colorClass = this.getRandomColor(member.id);
          return `<div class="h-7 w-7 text-xs rounded-full flex items-center justify-center ${colorClass} ring-2 ring-white">
                ${initials}
              </div>`;
        })
        .join('') || '';

    return `
      <div class="px-4 py-2 whitespace-nowrap">
        <div class="flex -space-x-2">
        ${avatars}
        ${
          event?.additionalMembers
            ? `
          <div class="h-7 w-7 text-xs rounded-full flex items-center justify-center bg-gray-100 text-gray-600 ring-2 ring-white">
            +${event?.additionalMembers}
          </div>`
            : ''
        }
        </div>
      </div>
        `;
  };

  formatAvatarName(
    event: any,
    dataPropertyName: string,
    name: boolean = false
  ) {
    const initials = this.getInitials(event[dataPropertyName]);
    const colorClass = this.getRandomColor(event.id);

    return `
        <div class="flex items-center">
            <div class="h-10 w-10 text-xs rounded-full flex items-center justify-center ${colorClass}">
                ${initials}
            </div>            
            <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">
                    ${name ? event[dataPropertyName] : ''}
                </div>
            </div>
        </div>
        `;
  }

  // ri-stethoscope-line
  // ri-psychotherapy-line
  // ri-surgical-mask-line
  // ri-heart-pulse-line
  // ri-mental-health-line
  // ri-hospital-line
}
