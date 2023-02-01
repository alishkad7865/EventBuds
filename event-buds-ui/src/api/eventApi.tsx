import axios from "axios";
export async function createEvent(event: any) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/createEvent?Event=` + event;
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
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/getUserEvents?userId=` + userId;
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
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/getPublicEvents?userId=` + userId;
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

export async function getEventInvitations(eventId: number) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/eventInvitations?event_id=` +
    eventId;
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

export async function getEventHelpers(eventId: number) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/eventHelpers?event_id=` + eventId;
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

export async function getEventGuests(eventId: number) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/eventGuests?event_id=` + eventId;
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
