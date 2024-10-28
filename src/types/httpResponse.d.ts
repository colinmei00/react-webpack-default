declare namespace HttpResponse {
  interface Base<T> {
    data: T;
  }

  /** 接口 成功回调 */
  interface SuccessCallback<T> extends Base<T> {
    code: number;
  }

  /** 接口 失败回调 */
  interface FailCallback<T> extends Base<T> {
    error: number;
    message: string;
  }

  /** 列表数据回调接口 */
  interface ResultCallback<T> extends Omit<Callback<T>, 'data'> {
    data: {
      result: T;
    };
  }
  /** 列表数据回调接口 */
  interface CountCallback<T> extends Omit<Callback<T>, 'data'> {
    data: {
      result: T;
      count: number;
    };
  }

  interface CountData<T> {
    count: number;
    list: T;
  }

  /** list数据回调接口 */
  interface CountListCallback<T> extends Omit<Callback<T>, 'data'> {
    data: {
      count: number;
      list: T;
    };
  }

  /** 自定义接口回调 */
  interface Callback<T> extends Base<T> {
    code: number;
    message: string;
  }

  interface TotalCallback<T> extends Callback<T> {
    total: number;
  }

  /** 工具类接口回调 */
  interface AiUtilsListCallback<T> extends Omit<Callback<T>, 'data'> {
    data: {
      displayToolsInfoList: T;
    };
  }
}
