import { CapacitorHttp, HttpResponse } from "@capacitor/core";
export async function CreateEvent(event: any, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/createEvent?Event=` + event;
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
      } else {
        return response;
      }
    })
    .catch((e: any) => console.log(e));
  return response;
}

export async function GetUserEvents(token: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Event/getUserEvents`;

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

export async function GetPublicEvents(token: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Event/getPublicEvents`;

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

export async function GetEventInvitations(eventId: number, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/eventInvitations?event_id=` +
    eventId;

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
  return response;
}

export async function GetEventHelpers(eventId: number, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/eventHelpers?event_id=` + eventId;

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

export async function GetEventGuests(eventId: number, token: string) {
  let baseUrl =
    `${process.env.REACT_APP_BASE_URL}/Event/eventGuests?event_id=` + eventId;

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
