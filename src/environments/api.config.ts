import { environment } from "./environment";

export const apiConfig = {
    user:{
        login: environment.apiURL+'User/login',
        logout: environment.apiURL+'User/logout',
    },
    tZDStoreUser:{
        get_common_request: environment.apiURL+'TZDStoreUser/get_common_request',
    },
    master:{
        get_active_countrystatecity_list: environment.apiURL+'Master/get_active_countrystatecity_list',
    },
    productMaster:{
        get_unitofmeasurementlist: environment.apiURL+'ProductMaster/get_unitofmeasurementlist',
        get_active_product_group: environment.apiURL+'ProductMaster/get_active_product_group',
        get_active_productcategory_list: environment.apiURL+'ProductMaster/get_active_productcategory_list',
        get_productmaster: environment.apiURL+'ProductMaster/get_productmaster/',
        delete_productmaster: environment.apiURL+'ProductMaster/delete_productmaster/',
    },
    tzdProductMaster:{
        get_tzdall_active_ddl_list: environment.apiURL+'TZDProductMaster/get_tzdall_active_ddl_list',
        get_tzd_seller_productmasterlist: environment.apiURL+'TZDProductMaster/get_tzd_seller_productmasterlist',
        save_tzd_seller_product_master: environment.apiURL+'TZDProductMaster/save_tzd_seller_product_master',
    },
    roleManagement:{
        get_profile_roleauthorizationlist: environment.apiURL+'RoleManagement/get_profile_roleauthorizationlist',
    },
    priceManagement:{
        get_hsnsacmasterddl: environment.apiURL+'PriceManagement/get_hsnsacmasterddl',
    },
    tzdStoreSeller:{
        get_tzd_seller_salesinvoicelist: environment.apiURL+'TZDStoreSeller/get_tzd_seller_salesinvoicelist',
    },
    tzdJob:{
        save_tzd_job_worker_registration: environment.apiURL+'TZDJob/save_tzd_job_worker_registration',
        save_tzd_job_company_registration: environment.apiURL+'TZDJob/save_tzd_job_company_registration',
        save_tzd_job: environment.apiURL+'TZDJob/save_tzd_job',
        get_tzd_job: environment.apiURL+'TZDJob/get_tzd_job/',
        get_job_list: environment.apiURL+'TZDJob/get_job_list',
        delete_tzd_job: environment.apiURL+'TZDJob/delete_tzd_job/',
        get_tzd_worker_job_list: environment.apiURL+'TZDJob/get_tzd_worker_job_list',
        save_tzd_job_apply: environment.apiURL+'TZDJob/save_tzd_job_apply',
        get_tzd_company_job_apply_worker_list: environment.apiURL+'TZDJob/get_tzd_company_job_apply_worker_list',
        save_tzd_company_worker_job_status: environment.apiURL+'TZDJob/save_tzd_company_worker_job_status',
    },
}