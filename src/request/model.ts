export interface loginForm {
  username: string;
  password: string;
}
export interface updateManagerForm {
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
