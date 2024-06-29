export interface loginForm {
  loginType: number;
  username: string;
  password: string;
}
export interface updateManagerForm {
  accountId: string;
  nickname: string;
  avatarUrl: string;
  password: string;
  phoneNum: string;
}
export interface getCommodityForm {
  from: number;
  size: number;
  mod: number;
}
export interface getCommodityByCategoryForm {
  from: number;
  size: number;
  category: string;
}
export interface deleteCommodityByIdForm {
  commodityId: string;
}
export interface addCouponForm {
  discountValue: number;
  minAmount: number;
  startTime: string;
  endTime: string;
  limitPerUser: number | null;
  stock: number | null;
}
export interface getSaleSpecificationsForm {
  commodityId: string;
}
export interface deleteCouponByIdForm {
  couponId: string;
}
export interface getCommodityAnalysisForm {
  graphicType: string;
  span: string;
}
export interface getOrdersForm {
  pageSize: string;
  pageNumber: string;
}
export interface getOrderByIdForm {
  orderId: string;
}
export interface changeUpgradeConditionForm {
  vipLevelCode: string;
  spendMin: number;
  spendMax: number;
}
export interface deleteAdviseByIdForm {
  adviseId: string;
}
export interface searchCommoditiesForm {
  from: number;
  size: number;
  searchKeyWord: string;
}
export interface addManagerForm {
  nickname: string;
  avatarUrl: string;
  password: string;
  phoneNum: string;
}
export interface getCommodityBatchForm {
  commodityId: string;
}
export interface addSaleSpecificationForm {
  commodityId: string;
  originalPrice: number;
  price: number;
  unit: string;
  remark: string;
  saleOrRent: boolean;
  isDefault: boolean;
  purchaseLimit: number;
}
export interface alterSaleSpecificationsForm {
  ssId: string;
  originalPrice: number;
  price: number;
  unit: string;
  remark: string;
  saleOrRent: boolean;
  isDefault: boolean;
  purchaseLimit: number;
}
export interface deleteSaleSpecificationByIdForm {
  ssId: string;
}
export interface alterCommodityBatchForm {
  commodityBatchId: string;
  position: string;
  produceTime: string;
  expiredTime: string;
  changeStock: number;
}
export interface addCommodityBatchForm {
  commodityId: string;
  position: string;
  produceTime: string;
  expiredTime: string;
  stock: number;
}
export interface deleteCommodityBatchByIdForm {
  commodityBatchId: string;
}
export interface removeExpiredBatchForm {
  batchId: string;
}
export interface removeExpiringBatchForm {
  batchId: string;
}
export interface getClothesForm {
  graphicType: string;
  span: string;
}
export interface getUserForm {
  span: string;
}
export interface getOrdersIntervalForm {
  span: string;
  granularity: string;
}
export interface getSearchKeyWordsForm {
  searchKeyword: string;
}
export interface publishCommodityForm {
  commodityName: string;
  secondCategoryCode: string;
  title: string;
  pictureUrls: string;
  brand: string;
  taste: string;
  weight: number;
  minimumThreshold: number;
}
export interface deleteManagerForm {
  deleteManager: string;
  replaceManager: string;
}
export interface alterCommodityForm {
  commodityId: string;
  commodityName: string;
  secondCategoryCode: string;
  title: string;
  pictureUrls: string;
  brand: string;
  taste: string;
  weight: number;
  minimumThreshold: number;
}
export interface getDictForm {
  dictKey: string;
}
export interface getAdvisesForm {
  adviseStatusCode?: string;
}
export interface rollbackMysqlForm {
  date: string;
}
export interface uploadFileForm {
  file: File;
}
