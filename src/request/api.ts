// 管理接口
import service from './index';
import {
  loginForm,
  updateManagerForm,
  getCommodityForm,
  getCommodityByCategoryForm,
  deleteCommodityByIdForm,
  addCouponForm,
  getSaleSpecificationsForm,
  deleteCouponByIdForm,
  getCommodityAnalysisForm,
  getOrdersForm,
  getOrderByIdForm,
  changeUpgradeConditionForm,
  deleteAdviseByIdForm,
  searchCommoditiesForm,
  addManagerForm,
  getCommodityBatchForm,
  addSaleSpecificationForm,
  alterSaleSpecificationsForm,
  deleteSaleSpecificationByIdForm,
  deleteCommodityBatchByIdForm,
  alterCommodityBatchForm,
  addCommodityBatchForm,
  removeExpiredBatchForm,
  removeExpiringBatchForm,
  getClothesForm,
  getUserForm,
  getOrdersIntervalForm,
  getSearchKeyWordsForm,
  publishCommodityForm,
  deleteManagerForm,
  alterCommodityForm,
  getDictForm,
  getAdvisesForm,
  rollbackMysqlForm,
  uploadFileForm,
  getProfitForm,
  getAllowTimeSlotForm,
  getTotalSaleAndTotalSaleNumForm,
  getInventoryTurnoverForm,
  getUserCompositionForm,
  getPresignedUrlForOssUploadForm,
  auditPicLawfulForm,
} from './model';
export const userLoginAPI = (form: loginForm) => {
  return service({
    method: 'POST',
    url: '/login',
    data: form,
  });
};
export const userMessagePreviewinfoAPI = () => {
  return service({
    method: 'GET',
    url: '/user/getMessagePreviewInfo',
  });
};
export const getAllManagerAPI = () => {
  return service({
    method: 'GET',
    url: '/manager/getAllManager',
  });
};
export const updateManagerAPT = (form: updateManagerForm) => {
  return service({
    method: 'PUT',
    url: '/manager/alterManager',
    data: form,
  });
};
export const getCommodityAPI = (form: getCommodityForm) => {
  return service({
    method: 'GET',
    url: '/commodity/getCommodityList',
    params: form,
  });
};
export const getCategoryAPI = () => {
  return service({
    method: 'GET',
    url: '/commodity/getCategory',
  });
};
export const getCommodityByCategoryAPI = (form: getCommodityByCategoryForm) => {
  return service({
    method: 'GET',
    url: '/commodity/getCommodityByCategory',
    params: form,
  });
};
export const deleteCommodityByIdAPI = (form: deleteCommodityByIdForm) => {
  return service({
    method: 'DELETE',
    url: '/commodity/deleteCommodity',
    params: form,
  });
};
export const getVipListAPI = () => {
  return service({
    method: 'GET',
    url: '/dict-vip-level/getVipList',
  });
};
export const addCouponAPI = (form: addCouponForm) => {
  return service({
    method: 'POST',
    url: '/coupon/publishCoupon',
    data: form,
  });
};
export const getSaleSpecificationsAPI = (form: getSaleSpecificationsForm) => {
  return service({
    method: 'GET',
    url: '/sale-specification/getSaleSpecifications',
    params: form,
  });
};
export const getCouponListAPI = () => {
  return service({
    method: 'GET',
    url: '/coupon/managerGetCouponList',
  });
};
export const deleteCouponByIdAPI = (form: deleteCouponByIdForm) => {
  return service({
    method: 'DELETE',
    url: '/coupon/deleteCoupon',
    params: form,
  });
};
export const getCommodityAnalysisAPI = (form: getCommodityAnalysisForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getCommodity',
    params: form,
  });
};
export const getOrdersAPI = (form: getOrdersForm) => {
  return service({
    method: 'GET',
    url: '/orders/getAll',
    params: form,
  });
};
export const getOrderDetailsAPI = (form: getOrderByIdForm) => {
  return service({
    method: 'GET',
    url: '/orders',
    params: form,
  });
};
export const changeUpgradeConditionAPI = (form: changeUpgradeConditionForm) => {
  return service({
    method: 'POST',
    url: '/dict-vip-level/changeUpgradeCondition',
    data: form,
  });
};
export const getAdvisesAPI = (form: getAdvisesForm) => {
  return service({
    method: 'GET',
    url: '/advise/getAdvises',
    params: form,
  });
};
export const deleteAdviseByIdAPI = (form: deleteAdviseByIdForm) => {
  return service({
    method: 'DELETE',
    url: '/advise/deleteById',
    params: form,
  });
};
export const searchCommoditiesAPI = (form: searchCommoditiesForm) => {
  return service({
    method: 'GET',
    url: '/commodity/searchCommodities',
    params: form,
  });
};
export const addManagerAPI = (form: addManagerForm) => {
  return service({
    method: 'POST',
    url: '/manager/addManager',
    data: form,
  });
};
export const getCommodityBatchAPI = (form: getCommodityBatchForm) => {
  return service({
    method: 'GET',
    url: '/commodity-batch/getCommodityBatch',
    params: form,
  });
};
export const addSaleSpecificationAPI = (form: addSaleSpecificationForm) => {
  return service({
    method: 'POST',
    url: '/sale-specification/addSaleSpecification',
    data: form,
  });
};
export const alterSaleSpecificationsAPI = (
  form: alterSaleSpecificationsForm
) => {
  return service({
    method: 'PUT',
    url: '/sale-specification/alterSaleSpecifications',
    data: form,
  });
};
export const deleteSaleSpecificationByIdAPI = (
  form: deleteSaleSpecificationByIdForm
) => {
  return service({
    method: 'DELETE',
    url: '/sale-specification/deleteSaleSpecification',
    params: form,
  });
};
export const alterCommodityBatchAPI = (form: alterCommodityBatchForm) => {
  return service({
    method: 'PUT',
    url: '/commodity-batch/alterCommodityBatch',
    data: form,
  });
};
export const deleteCommodityBatchByIdAPI = (
  form: deleteCommodityBatchByIdForm
) => {
  return service({
    method: 'DELETE',
    url: '/commodity-batch/deleteCommodityBatch',
    params: form,
  });
};
export const addCommodityBatchAPI = (form: addCommodityBatchForm) => {
  return service({
    method: 'POST',
    url: '/commodity-batch/addCommodityBatch',
    data: form,
  });
};
export const getExpiringBatchAPI = () => {
  return service({
    method: 'GET',
    url: '/commodity-batch/getExpiringBatch',
  });
};
export const getExpiredBatchAPI = () => {
  return service({
    method: 'GET',
    url: '/commodity-batch/getExpiredBatch',
  });
};
export const removeExpiredBatchAPI = (form: removeExpiredBatchForm) => {
  return service({
    method: 'DELETE',
    url: '/commodity-batch/removeExpiredBatch',
    params: form,
  });
};
export const removeExpiringBatchAPI = (form: removeExpiringBatchForm) => {
  return service({
    method: 'DELETE',
    url: '/commodity-batch/removeExpiringBatch',
    params: form,
  });
};
export const getClothesAPI = (form: getClothesForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getClothes',
    params: form,
  });
};
export const getUserAPI = (form: getUserForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getUser',
    params: form,
  });
};
export const getAddressInfoAPI = () => {
  return service({
    method: 'GET',
    url: '/analysis/getAddressInfo',
  });
};
export const getConsumptionInfoAPI = () => {
  return service({
    method: 'GET',
    url: '/analysis/getConsumptionInfo',
  });
};
export const getOrdersIntervalAPI = (form: getOrdersIntervalForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getOrdersInterval',
    params: form,
  });
};
export const getSearchKeyWordsAPI = (form: getSearchKeyWordsForm) => {
  return service({
    method: 'GET',
    url: '/commodity/getSearchKeyWords',
    params: form,
  });
};
export const getManagerInfoAPI = () => {
  return service({
    method: 'GET',
    url: '/manager/getManagerInfo',
  });
};
export const publishCommodityAPI = (form: publishCommodityForm) => {
  return service({
    method: 'POST',
    url: '/commodity/publishCommodity',
    data: form,
  });
};
export const deleteManagerAPI = (form: deleteManagerForm) => {
  return service({
    method: 'DELETE',
    url: '/manager/deleteManager',
    params: form,
  });
};
export const alterCommodityAPI = (form: alterCommodityForm) => {
  return service({
    method: 'PUT',
    url: '/commodity/alterCommodity',
    data: form,
  });
};
export const getCommodityInfoAPI = (form: getCommodityBatchForm) => {
  return service({
    method: 'GET',
    url: '/commodity/getCommodityInfo',
    params: form,
  });
};
export const getStockShortAPI = () => {
  return service({
    method: 'GET',
    url: '/commodity-batch/getStockShort',
  });
};
export const getDictAPI = (form: getDictForm) => {
  return service({
    method: 'GET',
    url: '/dict/getDict',
    params: form,
  });
};
export const getMysqlBackupListAPI = () => {
  return service({
    method: 'GET',
    url: '/mysql-backup/getMysqlBackupList',
  });
};
export const rollbackMysqlAPI = (form: rollbackMysqlForm) => {
  return service({
    method: 'POST',
    url: '/mysql-backup/rollbackMysql',
    data: form,
  });
};
export const uploadFileAPI = (form: uploadFileForm) => {
  return service({
    method: 'POST',
    url: '/file/uploadFile',
    data: form,
    params: {
      compressionQuality: 0.7,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteAllAdvisesAPI = () => {
  return service({
    method: 'DELETE',
    url: '/advise/deleteAll',
  });
};
export const getProfitAPI = (form: getProfitForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getProfit',
    params: form,
  });
};
export const getAllowTimeSlotAPI = (form: getAllowTimeSlotForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getAllowTimeSlot',
    params: form,
  });
};
export const getTotalSaleAndTotalSaleNumAPI = (
  form: getTotalSaleAndTotalSaleNumForm
) => {
  return service({
    method: 'GET',
    url: '/analysis/getTotalSaleAndTotalSaleNum',
    params: form,
  });
};
export const getTotalSaleAndTotalSaleNumPerCommodityAPI = (
  form: getTotalSaleAndTotalSaleNumForm
) => {
  return service({
    method: 'GET',
    url: '/analysis/getTotalSaleAndTotalSaleNumPerCommodity',
    params: form,
  });
};
export const getInventoryTurnoverAPI = (form: getInventoryTurnoverForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getInventoryTurnover',
    params: form,
  });
};
export const getUserCompositionAPI = (form: getUserCompositionForm) => {
  return service({
    method: 'GET',
    url: '/analysis/getUserComposition',
    params: form,
  });
};
export const getPresignedUrlForOssUploadAPI = (
  form: getPresignedUrlForOssUploadForm
) => {
  return service({
    method: 'GET',
    url: '/file/get_presigned_url_for_oss_upload',
    params: form,
  });
};
export const auditPicLawfulAPI = (form: auditPicLawfulForm) => {
  return service({
    method: 'GET',
    url: '/file/auditPicLawful',
    params: form,
  });
};
