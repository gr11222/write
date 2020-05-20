import Cookies from "js-cookie";

export function setCookie(name, val) {
  return Cookies.set(name, val);
}
export function getCookie(name) {
  return Cookies.get(name);
}
export function delCookie(name) {
  return Cookies.remove(name);
}
