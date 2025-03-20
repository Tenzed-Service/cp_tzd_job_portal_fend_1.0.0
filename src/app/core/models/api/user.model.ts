export interface SaveUserReqVM {
	userId: number | null,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	locationCoordinateIds?: string,
	status: boolean,
	bpId: number | null,
	street1: string,
	street2: string,
	street3?: string,
	cityId: number,
	pincode: string,
	stateId: number,
	countryId: number,
	dateOfBirth: string,
	countryCode: string,
	phoneNo: string,	
	industryID: number | null,
	legalEnityId: number | null,
	businessTypeId: number | null,
	bpLanguageIds: string,
  }


export interface UserLoginReqVM {
	email:String,
	password:String,
	systemName:String,
	deviceType:number,
	isforcedlogin:boolean
}