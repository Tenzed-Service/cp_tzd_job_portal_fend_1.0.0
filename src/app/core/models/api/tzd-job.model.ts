import { GetTableListResponseVM } from "../common/common.model";

export interface GetTZDJobListReqVM extends GetTableListResponseVM {
	formTabTypeId: number | null,
	searchValue: string | null,
	searchField: string | null,
}



export interface SaveTZDJobListReqVM {
	jobId: number,
	jobTitle: string,
	description: string,
	nameOfOwner: string,
	email: string,
	dialCode: string,
	contactNo: string,
	amount: number,
	jobType: number,
	jobStartTime: string | Date,
	jobEndTime: string | Date,
	experience: number,
	comment: string,
	amountType: number,
	latitude: string,
	longitude: string,
	dueDate: string | Date,
	status: true,
	jobLocations: JobLocations[],
	jobSkillIds: string,
	jobLanguageIds: string
  }

  export interface JobLocations {
	address: string,
	cityId: number,
	stateId: number,
	countryId: number,
	zipCode: string
  }