import Cookies from "js-cookie";

export const getHeaders = () => {
  const token = Cookies.get(process.env.SUPABASE_COOKIE_NAME!);
  return {
    Authorization: `Bearer ${token}`,
  };
};