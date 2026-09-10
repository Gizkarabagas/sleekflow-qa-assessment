const randomInvalidEmail = `invalid.qa.${Date.now()}@example.com`;

export const credentials = {
  validUser: {
    email: process.env.SLEEKFLOW_EMAIL ?? '',
    password: process.env.SLEEKFLOW_PASSWORD ?? '',
  },

  invalidUser: {
    email: randomInvalidEmail,
    password: 'WrongPassword123!',
  },
};
