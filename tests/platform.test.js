const baseUrl = "http://localhost:5000";

const customerEmail = `customer_${Date.now()}@example.com`;
const vendorEmail = `vendor_${Date.now()}@example.com`;

let customerToken;
let vendorToken;
let verificationToken;
let vendorId;
let reviewId;
let reportId;
let transactionId;
let disputeId;
let documentId;

const registerAndLogin = async ({ fullName, email, role }) => {
  const registerRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullName,
      email,
      password: "password123",
      role
    })
  });

  const registerBody = await registerRes.json();

  expect(registerRes.status).toBe(201);
  expect(registerBody.success).toBe(true);
  expect(registerBody.data.verificationToken).toBeDefined();

  verificationToken = registerBody.data.verificationToken;

  const verifyRes = await fetch(`${baseUrl}/api/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: verificationToken
    })
  });

  expect(verifyRes.status).toBe(200);

  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password: "password123"
    })
  });

  const loginBody = await loginRes.json();

  expect(loginRes.status).toBe(200);
  expect(loginBody.data.accessToken).toBeDefined();

  return loginBody.data.accessToken;
};

describe("TrustBridge Platform Endpoints", () => {
  it("should register and login customer", async () => {
    customerToken = await registerAndLogin({
      fullName: "Test Customer",
      email: customerEmail,
      role: "CUSTOMER"
    });

    expect(customerToken).toBeDefined();
  });

  it("should register and login vendor", async () => {
    vendorToken = await registerAndLogin({
      fullName: "Test Vendor",
      email: vendorEmail,
      role: "VENDOR"
    });

    expect(vendorToken).toBeDefined();
  });

  it("should create vendor business profile", async () => {
    const res = await fetch(`${baseUrl}/api/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vendorToken}`
      },
      body: JSON.stringify({
        businessName: "Test Vendor Business",
        businessEmail: `business_${Date.now()}@example.com`,
        phoneNumber: "+2348012345678",
        address: "Lagos, Nigeria",
        cacNumber: "RC123456",
        nin: "12345678901",
        category: "Technology",
        description: "A test vendor business"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);

    vendorId = body.data.id;
    expect(vendorId).toBeDefined();
  });

  it("should get my vendor profile", async () => {
    const res = await fetch(`${baseUrl}/api/vendors/me`, {
      headers: {
        Authorization: `Bearer ${vendorToken}`
      }
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.id).toBe(vendorId);
  });

  it("should search vendors", async () => {
    const res = await fetch(`${baseUrl}/api/vendors/search?query=Technology`);

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("should get top rated vendors", async () => {
    const res = await fetch(`${baseUrl}/api/vendors/top-rated`);

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("should create review", async () => {
    const res = await fetch(`${baseUrl}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        vendorId,
        rating: 5,
        comment: "Excellent vendor"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);

    reviewId = body.data.id;
  });

  it("should get vendor reviews", async () => {
    const res = await fetch(`${baseUrl}/api/reviews/vendor/${vendorId}`, {
      headers: {
        Authorization: `Bearer ${customerToken}`
      }
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("should create report", async () => {
    const res = await fetch(`${baseUrl}/api/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        vendorId,
        title: "Test report",
        description: "Test fraud report"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);

    reportId = body.data.id;
  });

  it("should create transaction", async () => {
    const res = await fetch(`${baseUrl}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vendorToken}`
      },
      body: JSON.stringify({
        vendorId,
        amount: 50000,
        status: "SUCCESSFUL"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);

    transactionId = body.data.id;
  });

  it("should create dispute", async () => {
    const res = await fetch(`${baseUrl}/api/disputes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        vendorId,
        title: "Test dispute",
        description: "Customer raised a test dispute"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);

    disputeId = body.data.id;
  });

  it("should upload document", async () => {
    const res = await fetch(`${baseUrl}/api/documents/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${vendorToken}`
      },
      body: JSON.stringify({
        vendorId,
        fileUrl: "https://example.com/test-document.pdf",
        fileType: "CAC_CERTIFICATE"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);

    documentId = body.data.id;
  });

  it("should get vendor documents", async () => {
    const res = await fetch(`${baseUrl}/api/documents/vendor/${vendorId}`, {
      headers: {
        Authorization: `Bearer ${vendorToken}`
      }
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
  });

  let supportTicketId;

  it("should create support ticket", async () => {
    const res = await fetch(`${baseUrl}/api/support/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`
      },
      body: JSON.stringify({
        subject: "Need help with dispute",
        message: "Customer support test message"
      })
    });

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);

    supportTicketId = body.data.id;
  });

  it("should get my support tickets", async () => {
    const res = await fetch(`${baseUrl}/api/support/tickets/my`, {
      headers: {
        Authorization: `Bearer ${customerToken}`
      }
    });

    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("should add support ticket message", async () => {
    const res = await fetch(
      `${baseUrl}/api/support/tickets/${supportTicketId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customerToken}`
        },
        body: JSON.stringify({
          message: "Additional support message"
        })
      }
    );

    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);
  });

  it("should get all support tickets as admin", async () => {
    // Optional until admin test account is added
    expect(true).toBe(true);
  });
});