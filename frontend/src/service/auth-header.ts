interface AuthHeader {
  Authorization: string;
}

export default function authHeader(): AuthHeader {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user?.user.accessToken) {
    return { Authorization: "Bearer " + String(user.accessToken) };
  } else {
    return { Authorization: "" };
  }
}
