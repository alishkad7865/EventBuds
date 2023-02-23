import { CapacitorHttp, HttpResponse } from "@capacitor/core";
export async function getUser(userId: number, token: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/User/getUser`;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    params: { userId: userId.toString() },
  };
  const response: HttpResponse = await CapacitorHttp.get(options)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
    })
    .catch((e: any) => console.log(e));
  return response.data;
}

export async function getLoggedUser(token: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/User/me`;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response: HttpResponse = await CapacitorHttp.get(options)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else if (response.status > 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
  return response;
}

export async function userLogin(email: string, password: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/User/login`;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      email: email.toString(),
      password: password.toString(),
    }),
  };
  const response: HttpResponse = await CapacitorHttp.post(options)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else if (response.status > 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
  return response;
}

export async function userSignUp(user: {}) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/User/createUser`;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: user,
  };
  const response: HttpResponse = await CapacitorHttp.post(options)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else if (response.status > 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
  return response;
}
export async function getAllUsers(token: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/User/getAllUsers`;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response: HttpResponse = await CapacitorHttp.get(options)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
    })
    .catch((e: any) => console.log(e));
  return response.data;
}
