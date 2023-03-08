export type AssignedToUser = {
  USERID: number;
  USERNAME: string;
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
};

export var defaultAssignedToUser = {
  USERID: 0,
  USERNAME: "",
  EMAIL: "",
  FIRSTNAME: "",
  LASTNAME: "",
};

export function getAssignedUser(data: any): AssignedToUser {
  return {
    USERID: data.USERID,
    USERNAME: data.USERNAME,
    EMAIL: data.EMAIL,
    FIRSTNAME: data.FIRSTNAME,
    LASTNAME: data.LASTNAME,
  };
}

export function getFirstAndLastName(data: any): string {
  return data.FIRSTNAME + " " + data.LASTNAME;
}

export function getParsedFirstAndLastName(data: any): string {
  let parsedData = JSON.parse(data);
  return parsedData.FIRSTNAME + " " + parsedData.LASTNAME;
}
