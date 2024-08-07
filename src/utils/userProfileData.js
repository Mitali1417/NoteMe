export const userProfile = () => {
  const signupData = JSON.parse(localStorage.getItem("signupData"));
  if (signupData && signupData.username) {
    return signupData.username;
  }
  return;
};
