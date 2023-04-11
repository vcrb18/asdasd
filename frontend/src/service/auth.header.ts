interface AuthHeader {
  "x-access-token": string | null;
}

export type AxiosHeaders = Record<string, string | null>;

export default function authHeader(): AxiosHeaders {
  const userStr = localStorage.getItem("user");
  console.log("ESTAMOS ADENTRO DE authHEADER");
  console.log("userStr");
  console.log(userStr);

  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user?.user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return { "x-access-token": null };
  }
}
