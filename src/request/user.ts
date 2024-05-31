import service from ".";

export const getUserInfoAPI = () => {
  return service<UserInfo>({
    method: 'GET',
    url: '/user/getUserInfo',
  });
};


export interface UserInfo {
  userId: string;
  nickname: string;
  gender: string;
  onCampusCertificationCode: string;
  vip: string;
  customerServiceId: string;
  openId: string;
  avatarUrl: string;
  account: string;
  phoneNum: string;
}