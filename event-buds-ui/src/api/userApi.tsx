import axios from "axios";
import { CapacitorHttp, HttpResponse } from "@capacitor/core";
export async function getUser(userId: number) {
  let baseUrl = "http://140.238.138.230:8000/User/getUser";
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
  let baseUrl = "http://140.238.138.230:8000/User/getAllUsers?userId=" + userId;
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
