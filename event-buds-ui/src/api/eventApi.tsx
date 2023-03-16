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
export async function GetEvent(token: string, eventId: number) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Event/getEvent?event_id=${eventId}`;

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
export async function GetUserEventInvitations(token: string) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Event/userEventInvitations`;

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

export async function acceptEventInvitations(
  token: string,
  invitationId: number
) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Event/acceptEventInvitations?invitation_id=${invitationId}`;

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
      }
    })
    .catch((e: any) => console.log(e));
  return response;
}
export async function updateEvent(
  token: string,
  event_id: number,
  status: string
) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Event/updateEvent?event_id=${event_id}&status=${status}`;

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

export async function rejectEventInvitations(
  token: string,
  invitationId: number
) {
  let baseUrl = `${process.env.REACT_APP_BASE_URL}/Event/rejectEventInvitations?invitation_id=${invitationId}`;

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
