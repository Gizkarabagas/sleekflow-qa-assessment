export function generateSignupUser() {
  const timestamp = Date.now();

  return {
    email: `qa.sleekflow+${timestamp}@gmail.com`,
    password: 'Qwerty123@',
  };
}
