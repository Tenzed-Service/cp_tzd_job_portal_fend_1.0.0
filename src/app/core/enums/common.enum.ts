export enum SystemNameEnum{
    DESKTOP = 'DESKTOP',
    MOBILE = 'MOBILE'
}

export enum DeviceTypeEnum{
  DESKTOP = 1,
  MOBILE = 2,
}

export enum ResponseCodeEnum{
  SUCCESS = 0,
  FAIL = 1,
}

export enum FieldDataTypeEnum{
  VARCHAR = 'VARCHAR',
  INT = 'INT',
  TIME = 'TIME',
  DATE = 'DATE',
  BIT = 'BIT',
  DECIMAL = 'DECIMAL',
}

export enum UserTypeEnum{
  WORKER = 'WORKER',
  COMPANY = 'COMPANY',
}

export enum JobTypeEnum{
  FULL_TIME = 1,
  PART_TIME = 2,
  CONTRACT = 3,
}


export enum JobAmountTypeEnum{
  MONTHLY = 1,
  HOURLY = 2,
}

export enum RoleOptionEnum{
  SIDEBAR = "sidebarOptions",
  SETTING = "settingOptions",
  REPORT = "reportOptions"
}

export enum ActionTypeEnum{
  View = 1,
  Add = 2,
  Edit = 3,
  Delete = 4,
  // Import = 5,
  // Export = 6,
  // Layout = 7,
  // Share = 8,
  // Download = 9,
  // Print = 10,
  // BulkUpload = 11,
  // Cancel = 12,
  // Add = 13,
  // Delete = 14,
  // View = 17,
  // Scanner = 19,
  // GenerateEWayBill = 20,
  // GenerateEInvoice = 21,
  // ViewJSON = 22,
  // CancelEWayBill = 23,
  // CancelEInvoice = 24,
  // UpdateEWayBill = 25,
  // UpdateEInvoice = 26,
  // SelectionLayout = 27,
  // View = 28,
  // Add = 29,
  // Edit = 30,
}