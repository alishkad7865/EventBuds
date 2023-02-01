import axios from "axios";
import { CapacitorHttp, HttpResponse } from "@capacitor/core";
export async function getUser(userId: number) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/User/getUser`;
  const options = {
    url: baseUrl,
    headers: {},
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

export async function getAllUsers(userId: number) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/User/getAllUsers?userId=` + userId;
  return axios
    .get(`${baseUrl}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
}
