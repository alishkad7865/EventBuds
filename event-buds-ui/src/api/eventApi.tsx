import axios from "axios";
export async function createEvent(event: any) {
  let baseUrl = "http://140.238.138.230:8000/Event/createEvent?Event=" + event;
  return axios
    .post(`${baseUrl}`, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response: any) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        return response;
      }
    })
    .catch((e: any) => console.log(e));
}

export async function getUserEvent(userId: number) {
  let baseUrl = "http://localhost:8000/Event/getUserEvents?userId=" + userId;
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

export async function getPublicEvents(userId: number) {
  let baseUrl = "http://127.0.0.1:8000/Event/getPublicEvents?userId=" + userId;
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
