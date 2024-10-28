/** 状态码 */
const enum StatusCode {
  /** 请求成功 */
  SUCCESS = 0,
  /**  账号不可用 */
  UN_AUTHORIZED = 401,
  /**  账号违规被禁用 */
  DISABLED = 1037,
  /**  登录已过期 */
  TOKEN_EXPIRED = 1000,
  /**  未绑定手机号会返回token作为手机绑定入参 */
  UNDBOUND_PHONE = 1030,
  /**  需要换绑 */
  REBIND = 1031,
  /**  提现超出月限额 */
  MONTHLY_LIMIT = 2006,
  /**  首次提现限制 */
  FIRST_WHITHDRAW_LIMIT = 2011,
  /** 账号注册失败 */
  REGISTER_FAIL = 1038,
  /** 账号注销中 */
  ACCOUNT_CANCELLATION = 1039,
}

/** 需要返回data的状态码，用于toast提示 */
export const dataCodeOptions = [
  StatusCode.UNDBOUND_PHONE,
  StatusCode.REBIND,
  StatusCode.MONTHLY_LIMIT,
  StatusCode.FIRST_WHITHDRAW_LIMIT,
];

/** 需要强制退出登录的状态码 */
export const logOutStatusCodeMap = {
  [StatusCode.UN_AUTHORIZED]: '用户未授权',
  [StatusCode.ACCOUNT_CANCELLATION]:
    '账号注销中，无法使用，请前往妙推APP了解详情~',
  [StatusCode.REGISTER_FAIL]: '注册失败，账号风险等级较高，有疑问可联系客服~',
};

export const logOutStatusCode = [
  StatusCode.UN_AUTHORIZED,
  StatusCode.ACCOUNT_CANCELLATION,
  StatusCode.REGISTER_FAIL,
];

export default StatusCode;
