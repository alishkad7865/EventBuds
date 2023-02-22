import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import axios from "axios";

export async function createTask(task: any, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Task/createTask?task=` + task;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
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

export async function getTasks(eventId: number, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Task/getTasks?event_id=` + eventId;
  return axios
    .get(`${baseUrl}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
}

export async function deleteTask(taskId: number, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Task/deleteTask?task_id=` + taskId;
  return axios
    .delete(`${baseUrl}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
}

export async function updateTask(taskId: number, task: any, token: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Task/updateTask?task_id=${taskId}&task=${task}`;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response: HttpResponse = await CapacitorHttp.patch(options)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else if (response.status > 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
  return response;
}
