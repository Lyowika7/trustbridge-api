const testEmail = `testuser_${Date.now()}@example.com`;
let verificationToken;
let accessToken;

describe("Auth Flow", () => {
  it("should register a new user", async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: "Test User",
        email: testEmail,
        password: "password123"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.verificationToken).toBeDefined();

    verificationToken = body.data.verificationToken;
  });

  it("should verify user email", async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: verificationToken
      })
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
  });

  it("should login verified user", async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: testEmail,
        password: "password123"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.accessToken).toBeDefined();

    accessToken = body.data.accessToken;
  });

  it("should get current user profile", async () => {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.email).toBe(testEmail);
  });
});