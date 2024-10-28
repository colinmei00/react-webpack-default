/**
 * api地址定义列表；
 */
export interface UrlList {
  [name: string]: string | ((id: string) => string);
}

/**
 * 固定字符串型的api列表；
 */
export interface UrlString extends UrlList {
  [name: string]: string;
}

/**
 * 通过函数返回api地址的api列表；
 */
export interface UrlFunction extends UrlList {
  [name: string]: (id: string) => string;
}

/**
 * 通用数据响应体
 */
export interface CommonResponse {
  /**
   * 响应内容；
   */
  data: unknown;
  /**
   * 报错信息；
   */
  message: string;
  /**
   * 响应码/错误码；
   */
  code: number;
}

/**
 * 列表查询的通用参数；
 */
export interface ListQuery {
  /**
   * 当前页；
   */
  page?: number;
  /**
   * 每页数量；
   */
  pageSize?: number;
}

/**
 * 详情类响应体结构（即数据为对象，不是列表）；
 */
export interface DetailResponse<T> extends CommonResponse {
  data: T;
}

/**
 * 详情响应体结构（数据为数组）；
 */
export interface ListResponseNoResults<T> extends CommonResponse {
  data: T[];
}

/**
 * 常规分页列表结构响应体；(常规分页)
 */
export interface DefaultList<T> extends CommonResponse {
  data: {
    /**
     * 列表信息
     */
    results: T[];
    /**
     * 结果总数
     */
    total: number;
  };
}

/**
 * 列表结构响应体；(游标分页)
 */
export interface CursorList<T> extends CommonResponse {
  data: {
    /**
     * 列表信息
     */
    results: T[];
    /**
     * 游标ID
     */
    sid: string;
    /**
     * 数据总数
     */
    total: number;
  };
}

/**
 * 游标分页请求结构
 */
export interface CursorQuery {
  sid?: string;
  pageSize?: number;
}

/**
 * 菜单列表结构
 */
export interface MenuList<T> extends CommonResponse {
  data: {
    /**
     * 列表信息
     */
    results: T[];
    /**
     * 是否接入分销
     */
    moduleSwitch: {
      isAgent: boolean;
    };
    /**
     * 是否开启上传模板
     */
    addTopicSwitch: string;
    /**
     * 结果总数
     */
    total: number;
  };
}

/**
 * 达人结算分页列表结构响应体；
 */
export interface CommonList<T> extends CommonResponse {
  data: {
    /**
     * 列表信息
     */
    list: T[];
    /**
     * 结果总数
     */
    count: number;
  };
}
