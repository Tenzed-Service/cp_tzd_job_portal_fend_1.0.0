import { GetTableListResponseVM } from "../common/common.model";

export interface GetTZDJobListReqVM extends GetTableListResponseVM {
	formTabTypeId: number | null,
	jobApplyStatus?: number
}

export interface SaveTZDJobApplyReqVM {
	jobApplyId: number | null,
	jobId: number,
	jobApplyStatus: number,
	comments: string,
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
	zipCode: string,
	jobLocationId?: number,
    cityName?: string,
    stateName?: string,
    countryName?: string,
  }

  export interface JobSkills{
	skillIMasterId: number,
    skillName: string,
  }

  export interface Languages{
	bpLanguageId: number,
	bpLanguageName: string
  }

  export interface GetJobDetailsResVM {
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
	latitude: string | number,
	longitude: string | number,
	dueDate: string | Date,
	status: true,
	jobLocations?: JobLocations[],
	jobLocation?: JobLocations[],
	jobSkillIds: string,
	jobLanguageIds: string,
    jobTypeId: 2,    
    jobSkills: JobSkills[],
    languages: Languages[],
}