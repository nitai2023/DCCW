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
  commodityId: number;
}
export interface addCouponForm {
  discountValue: number;
  minAmount: number;
  startTime: string;
  endTime: string;
  limitPerUser: number;
  stock: number;
}
export interface getSaleSpecificationsForm {
  commodityId: number;
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
