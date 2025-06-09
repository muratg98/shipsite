import { headers as getHeaders } from 'next/headers'

export const getValidSubdomain = async () => {
  const headers = await getHeaders();
  const host = headers.get("host");
  return host?.split(".")[0];
};