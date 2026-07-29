import { expect, test } from '@playwright/test';
import { Environment } from '../config/env';

const loginEndpoint =
  `${Environment.baseUrl}/functions/v1/auth-service/login`;

test.describe('Login API', () => {
  test('berhasil login dengan kredensial yang valid', async ({ request }) => {
    const response = await request.post(loginEndpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: Environment.email,
        password: Environment.password,
      },
    });

    expect(response.ok(), await response.text()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toBeDefined();
    expect(responseBody).toEqual(expect.any(Object));
  });
});
