export enum UserType {
  AGENCY = 'Agency',
  EMPLOYER = 'Employer',
  EMPLOYEE = 'Employee',
}

export enum GridViewType {
  TABLE = 'TABLE',
  CARD = 'CARD',
}

export enum StatusType {
  Pending = 'Pending',
  Approved = 'Approved',
  InfoRequested = 'Info Requested',
  Rejected = 'Rejected',
  Available = 'Available',
  PartiallyAssigned = 'Partially Assigned',
  FullyAssigned = 'Fully Assigned',
  PendingConfirmation = 'Pending Confirmation',
  Assigned = 'Assigned',
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Archived = 'Archived',
  Busy = 'Busy',
}

export enum ProfileTabs {
  personaDetails = 'personal-details',
  changePassword = 'change-password',
}

export enum ModelActions {
  Close = 'Close',
  Submit = 'Submit',
}


export enum CommonEnum{
  UILOGIN='UILOGIN',
  PERMISSIONS='permissions',
  AUTHTOKEN='authToken',
  USERDATA='userData',
  ROUTESTATE='routeState',
  CURRENTUSER = 'currentUser',
  USERS = 'users'
}

export enum LoginFlowEnum{
LOGIN = 'login',
OTP = 'otp',
FORGOTPASSWORD = 'forgotPassword',
FIRSTTIMELOGIN = 'firstTimeLogin',
}
export enum TableColumnsDataTypeEnum {
None = 0,
String = 1,
Boolean = 2,
Int = 3,
Decimal = 4,
DateTime = 5,
Date = 6,
Time = 7
}
export enum AdvancedFilterOperatorEnum {
None = 0, // No operation
Is = 1, // Equals
IsNot = 2, // Not Equal
IsEmpty = 3, // Is Null or Empty
IsNotEmpty = 4, // Is Not Null or Not Empty
Equals = 5, // Equals
NotEqual = 6, // Not Equal
GreaterThan = 7, // Greater Than
GreaterThanOrEqual = 8, // Greater Than or Equal To
LessThan = 9, // Less Than
LessThanOrEqual = 10, // Less Than or Equal To
Between = 11 // Between (requires Value and Value2)
}
export enum TableFilterTypeEnum {
None = 0, // No type
TextBox = 1, // Type text in filter
Dropdown = 2, // Select option from dropdown
Range = 3 // Range Filter
}
export enum AdvancedFilterRelationEnum {
None = 0,
And = 1, // Logical AND
Or = 2 // Logical OR
}
export enum AdvancedFilterSortDirectionEnum {
None = 0,
Ascending = 1,
Descending = 2
}
export enum TextType{
NORMAL_TEXT = 1,
HTML_TEXT = 2,
}