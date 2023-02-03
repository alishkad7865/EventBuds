import axios from "axios";
export async function createTask(task: any) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Task/createTask?task=` + task;
  return axios
    .post(`${baseUrl}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
    })
    .catch((e: any) => console.log(e));
}

export async function getTasks(eventId: number) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Task/getTasks?event_id=` + eventId;
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
