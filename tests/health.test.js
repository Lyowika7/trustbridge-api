describe("Health Check", () => {
  it("should return API health status", async () => {
    const res = await fetch("http://localhost:5000/api/health");
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toBe("TrustBridge API is running");
  });
});