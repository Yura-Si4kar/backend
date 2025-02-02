const startSession = (user) => {
  localStorage.setItem("email", user.email);
  localStorage.setItem("accessToken", user.accessToken);
}

const endSession = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('accessToken');
}

module.exports = {
    startSession,
    endSession
}