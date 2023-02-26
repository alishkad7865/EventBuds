export type Friend = {
  USERID: number;
  USERNAME: string;
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  STATUS: string;
};

export function add_friend_status(user: any, message: string): Friend {
  return {
    USERID: user.USERID,
    USERNAME: user.USERNAME,
    EMAIL: user.EMAIL,
    FIRSTNAME: user.FIRSTNAME,
    LASTNAME: user.LASTNAME,
    STATUS: message,
  };
}
