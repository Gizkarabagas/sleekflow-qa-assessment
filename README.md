# SleekFlow QA Assessment

Playwright tests for the SleekFlow signup and login flows.

## Setup

```bash
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env`, then add the credentials used by the login test:

```env
SLEEKFLOW_EMAIL=your-test-email
SLEEKFLOW_PASSWORD=your-test-password
```

## Running the tests

```bash
npm test
npm run test:chromium
npm run test:headed
```

Open the latest HTML report with:

```bash
npm run report
```

## Test coverage

- Successful login
- Invalid login credentials
- Signup up to email verification
- Invalid signup email
- Missing signup consent
- Weak signup password

## Notes

The tests run with one worker because they exercise SleekFlow's public authentication flow. Sending several login or signup requests at the same time can trigger Auth0 Bot Detection and display a CAPTCHA.

CAPTCHA is not automated or bypassed. When it appears, the affected test fails with a clear message and Playwright keeps the trace, screenshot, and video for investigation.
