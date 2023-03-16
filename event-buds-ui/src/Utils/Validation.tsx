export const validateEmail = (email: string) => {
  return email.match(/^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{1,3}$/);
};
export const validatePassword = (password: string) => {
  return password.length >= 5 && password !== "";
};

export const validateUserName = (userName: string) => {
  return userName.length >= 4 && userName !== "";
};
