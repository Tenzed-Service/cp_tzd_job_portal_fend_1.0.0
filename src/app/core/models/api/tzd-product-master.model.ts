import { GetTableListResponseVM } from "../common/common.model"

export interface GetTZDActiveDDLListResVM {
    legalEntity?: LegalEntity[] | null,
    industry?: Industry[] | null,
    tag?: Tag[] | null,
    socialNetwork?: SocialNetwork[] | null,
    taxCategory?: TaxCategory[] | null,
    title?: Title[] | null,
    bpGroup?: BpGroup[] | null,
    leadSource?: LeadSource[] | null,
    leadStatus?: LeadStatus[] | null,
    leadType?: LeadType[] | null,
    department?: Department[] | null,
    designation?: Designation[] | null,
    paymentTerm?: PaymentTerm[] | null,
    businessType?: BusinessType[] | null,
    bpRating?: BpRating[] | null,
    bpLanguage?: BpLanguage[] | null,
    skill?: Skill[] | null,
    amountType?: AmountType[] | null
}

export interface LegalEntity {
    legalEntityId: number,
    legalEntityName: string,
    status: boolean
}

export interface Industry {
    industryId: number,
    industryName: string,
    status: boolean
}

export interface Tag  {
    tagId: number,
    tag: string,
    status: boolean,
    colorCode: string
}

export interface SocialNetwork {
    socialNetworkId: number,
    socialNetworkName: string,
    isRequired: boolean,
    status: boolean
}

export interface TaxCategory {
    taxCategoryId: number,
    taxCategory: string,
    isRequired: boolean,
    status: boolean
}

export interface Title {
    titleId: number,
    titleName: string,
    status: boolean
}

export interface BpGroup{}

export interface LeadSource {
    leadSourceId: number,
    leadSourceName: string,
    status: boolean
}

export interface LeadStatus {
    leadStatusId: number,
    leadStatusName: string,
    status: boolean
}

export interface LeadType{}

export interface Department {
    departmentID: number,
    departmentName: string,
    status: boolean
}

export interface Designation {
    designationID: number,
    designationName: string ,
    status: boolean
} 

export interface PaymentTerm {
    paymentTermId: number,
    name: string
}

export interface BusinessType {
    businessTypeId: number,
    businessTypeName: string,
    status: boolean
}

export interface BpRating {
    bpRatingId: number,
    bpRating: string,
    status: boolean
}

export interface BpLanguage {
    bpLanguageId: number,
    bpLanguageName: string,
    status: boolean
}

export interface AmountType {
    amountTypeId:number,
    amountTypeName:string,
    status: boolean
}

export interface Skill {
    skillIMasterId:number,
    skillName:string,
    status: boolean
}

export interface GetTZDProductMasterListReqVM extends GetTableListResponseVM {
	numberRangeTypeIds: string | null,
	productGroupIds: string | null,
	categoryIds: string | null,
}

export interface GetTZDSellerProductMasterListResVM {
    productId: number,
    recordCount: number,
    rowNumber: number,
    ProductCode: string,
    ProductName: string,
    ProductType: string,
    Category: string,
    ProductGroupName: string,
    HSNCode: string,
    UOM: string,
    SellingPrice: string,
    MovingPrice: number,
    StandardPrice: number,
    Tags: string,
    ColorCodes: string,
    MaxInventoryQty: number,
    MinInventoryQty: number,
    Owner: string,
    FileName: string,
    Portal_FileStorageSize: number,
    ThumbnailFileName: string,
    DocTypeId: number,
    Status: boolean,
    CreatedBy: string,
    CreatedDate: string | Date,
    CreatedTime: string,
    UpdatedBy: string,
    UpdatedDate: string | Date,
    UpdatedTime: string,
    COLOR: string,
    WEIGHT: string,
    SIZE: string
}

export interface SaveProductReqVM {
    productId: number | null,
    name: string,
    numberRangeSeriesId: number | null,
    categoryId: number,
    productGroupId: number,
    numberRangeTypeId: number | null,
    ownerId: number | null,
    uomId: number,
    hsnsacId: number,
    sellingPrice: number,
    movingPrice: number,
    standardPrice: number,
    maxInventoryQty: number,
    minInventoryQty: number,
    status: boolean,
    attribute: ProductAttribute[],
    tags: ProductTags[],
    customField: ProductCustomField[],
    companies: ProductCompanies[],
    productCommment: ProductProductComment[]
  }

export interface ProductAttribute {
        productAttributeTypeId: number,
        productAttributeValueId: number,
        value: string
      }

export interface ProductTags {
        tagName: string,
        colorCode: string
      }

export interface ProductCustomField {
        customFieldId: number,
        customFieldName: string,
        customFieldValue: string,
        fieldDataType: string,
        fieldTypeId: number
      }

export interface ProductCompanies {
        lineNum: number,
        companyId: number,
        status: true
      }

export interface ProductProductComment {
        productCharCommentId: number,
        userId: number,
        comment: string,
        createdBy: number,
        createdOn: Date | string,
        updatedBy: number,
        updatedOn: Date | string
      }