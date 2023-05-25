interface AuthHeader {
  "x-access-token": string | null;
}

export type AxiosHeaders = Record<string, string | null>;

export default function authHeader(): AxiosHeaders {
  const userStr = localStorage.getItem("user");

  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user?.user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return { "x-access-token": null };
  }
}
