/**
 * @name getToken
 * @returns string
 * @description 获取token
 */
export function getToken() {
  return localStorage.getItem('sessionToken');
}

/**
 * @name setToken
 * @param token
 * @description 设置token
 */
export function setToken(token: string) {
  localStorage.setItem('sessionToken', token);
}

/**
 * @name clearToken
 * @description 删除token
 */
export function clearToken() {
  localStorage.removeItem('sessionToken');
}

/** 清除本地缓存 */
export function clearLocalStorage() {
  localStorage.clear();
}
