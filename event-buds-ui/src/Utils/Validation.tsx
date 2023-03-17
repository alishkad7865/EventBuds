export const validateEmail = (email: string) => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};
export const validatePassword = (password: string) => {
  return password.length >= 5 && password !== "";
};

export const validateUserName = (userName: string) => {
  return userName.length >= 4 && userName !== "";
};
