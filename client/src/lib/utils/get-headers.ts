import Cookies from "js-cookie";

const tokenName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string;

export const getHeaders = () => {
  const token = Cookies.get(tokenName);
  return {
    Authorization: `Bearer ${token}`,
  };
};