import { CapacitorHttp, HttpResponse } from "@capacitor/core";

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

export async function deleteTask(taskId: number, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Task/deleteTask?task_id=` + taskId;
  const options = {
    url: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response: HttpResponse = await CapacitorHttp.delete(options)
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
    })
    .catch((e: any) => console.log(e));
  return response.data;
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
        return response;
      } else if (response.status > 300) {
        return response.data;
      }
    })
    .catch((e: any) => console.log(e));
  return response;
}
