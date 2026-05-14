const testEmail = `testuser_${Date.now()}@example.com`;

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
    expect(body.data.user.email).toBe(testEmail);
  });

  it("should resend verification email", async () => {
    const res = await fetch("http://localhost:5000/api/auth/resend-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: testEmail
      })
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
  });

  it("should block login before email verification", async () => {
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

    expect(res.status).toBe(500);
    expect(body.success).toBe(false);
  });
});