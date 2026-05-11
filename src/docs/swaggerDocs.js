const swaggerDocs = {
  openapi: "3.0.0",

  info: {
    title: "TrustBridge API",
    version: "1.0.0",
    description:
      "Vendor verification, trust score, fraud reporting, reputation, and developer API platform"
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      },
      apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-api-key"
      }
    }
  },

  paths: {
    // AUTH
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: { type: "string", example: "Leniency Yowika" },
                  email: { type: "string", example: "leniency@example.com" },
                  password: { type: "string", example: "password123" }
                }
              }
            }
          }
        },
        responses: { 201: { description: "User registered successfully" } }
      }
    },

    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "leniency@example.com" },
                  password: { type: "string", example: "password123" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Login successful" } }
      }
    },

    "/api/auth/verify-email": {
      post: {
        tags: ["Auth"],
        summary: "Verify email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: { type: "string", example: "verification-token-here" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Email verified successfully" } }
      }
    },

    "/api/auth/resend-verification": {
      post: {
        tags: ["Auth"],
        summary: "Resend email verification token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "leniency@example.com" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Verification token generated" } }
      }
    },

    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current logged-in user",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Current user fetched" } }
      }
    },

    // ADMIN
    "/api/admin/dashboard": {
      get: {
        tags: ["Admin"],
        summary: "Admin dashboard",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Admin dashboard data" } }
      }
    },

    "/api/admin/audit-logs": {
      get: {
        tags: ["Admin"],
        summary: "Get audit logs",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Audit logs fetched" } }
      }
    },

    // DEVELOPERS / API KEYS
    "/api/developers/api-keys": {
      post: {
        tags: ["Developers"],
        summary: "Create API key",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "My first API key" }
                }
              }
            }
          }
        },
        responses: { 201: { description: "API key created" } }
      },

      get: {
        tags: ["Developers"],
        summary: "Get API keys",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "API keys fetched" } }
      }
    },

    "/api/developers/api-keys/{id}": {
      delete: {
        tags: ["Developers"],
        summary: "Delete API key",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: { 200: { description: "API key deleted" } }
      }
    },

    // BILLING
    "/api/billing/subscriptions": {
      post: {
        tags: ["Billing"],
        summary: "Create subscription",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  plan: {
                    type: "string",
                    example: "STARTER",
                    enum: ["FREE", "STARTER", "BUSINESS", "ENTERPRISE"]
                  }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Subscription created" } }
      }
    },

    "/api/billing/subscriptions/current": {
      get: {
        tags: ["Billing"],
        summary: "Get current subscription",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Subscription fetched" } }
      }
    },

    // VENDORS
    "/api/vendors": {
      post: {
        tags: ["Vendors"],
        summary: "Create vendor",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  businessName: { type: "string", example: "TechNova Ltd" },
                  businessEmail: { type: "string", example: "info@technova.com" },
                  phoneNumber: { type: "string", example: "+2348012345678" },
                  address: { type: "string", example: "Lagos, Nigeria" },
                  cacNumber: { type: "string", example: "RC123456" }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Vendor created" } }
      },

      get: {
        tags: ["Vendors"],
        summary: "Get all vendors",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Vendors fetched" } }
      }
    },

    "/api/vendors/{id}": {
      get: {
        tags: ["Vendors"],
        summary: "Get vendor by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Vendor fetched" } }
      },

      patch: {
        tags: ["Vendors"],
        summary: "Update vendor",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  businessName: { type: "string", example: "LeadTech Ltd" },
                  address: { type: "string", example: "Port Harcourt, Nigeria" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Vendor updated" } }
      },

      delete: {
        tags: ["Vendors"],
        summary: "Delete vendor",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Vendor deleted" } }
      }
    },

    "/api/vendors/{id}/trust-score": {
      get: {
        tags: ["Trust Score"],
        summary: "Calculate vendor trust score",
        security: [{ apiKeyAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Trust score calculated" } }
      }
    },

    // REPORTS
    "/api/reports": {
      post: {
        tags: ["Reports"],
        summary: "Create fraud/scam report",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  vendorId: { type: "string" },
                  title: { type: "string", example: "Fake Product Delivery" },
                  description: {
                    type: "string",
                    example: "Vendor failed to deliver after payment"
                  }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Report created" } }
      },

      get: {
        tags: ["Reports"],
        summary: "Get all reports",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Reports fetched" } }
      }
    },

    "/api/reports/{id}": {
      get: {
        tags: ["Reports"],
        summary: "Get report by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Report fetched" } }
      },

      delete: {
        tags: ["Reports"],
        summary: "Delete report",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Report deleted" } }
      }
    },

    "/api/reports/{id}/status": {
      patch: {
        tags: ["Reports"],
        summary: "Update report status",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "RESOLVED",
                    enum: ["OPEN", "INVESTIGATING", "RESOLVED", "DISMISSED"]
                  }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Report status updated" } }
      }
    },

    // REVIEWS
    "/api/reviews": {
      post: {
        tags: ["Reviews"],
        summary: "Create review",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  vendorId: { type: "string" },
                  rating: { type: "number", example: 5 },
                  comment: {
                    type: "string",
                    example: "Vendor delivered successfully"
                  }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Review created" } }
      }
    },

    "/api/reviews/vendor/{vendorId}": {
      get: {
        tags: ["Reviews"],
        summary: "Get vendor reviews",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "vendorId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Reviews fetched" } }
      }
    },

    "/api/reviews/{id}": {
      patch: {
        tags: ["Reviews"],
        summary: "Update review",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  rating: { type: "number", example: 4 },
                  comment: { type: "string", example: "Updated review" }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Review updated" } }
      },

      delete: {
        tags: ["Reviews"],
        summary: "Delete review",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Review deleted" } }
      }
    },

    // TRANSACTIONS
    "/api/transactions": {
      post: {
        tags: ["Transactions"],
        summary: "Create transaction",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  vendorId: { type: "string" },
                  amount: { type: "number", example: 50000 },
                  status: {
                    type: "string",
                    example: "SUCCESSFUL",
                    enum: ["PENDING", "SUCCESSFUL", "FAILED", "REFUNDED"]
                  }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Transaction created" } }
      }
    },

    "/api/transactions/vendor/{vendorId}": {
      get: {
        tags: ["Transactions"],
        summary: "Get vendor transactions",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "vendorId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Transactions fetched" } }
      }
    },

    "/api/transactions/{id}": {
      get: {
        tags: ["Transactions"],
        summary: "Get transaction by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Transaction fetched" } }
      }
    },

    "/api/transactions/{id}/status": {
      patch: {
        tags: ["Transactions"],
        summary: "Update transaction status",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "SUCCESSFUL",
                    enum: ["PENDING", "SUCCESSFUL", "FAILED", "REFUNDED"]
                  }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Transaction status updated" } }
      }
    },

    // DISPUTES
    "/api/disputes": {
      post: {
        tags: ["Disputes"],
        summary: "Create dispute",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  vendorId: { type: "string" },
                  title: { type: "string", example: "Payment issue" },
                  description: { type: "string", example: "Customer paid but delivery was delayed" }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Dispute created" } }
      },

      get: {
        tags: ["Disputes"],
        summary: "Get all disputes",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Disputes fetched" } }
      }
    },

    "/api/disputes/{id}": {
      get: {
        tags: ["Disputes"],
        summary: "Get dispute by ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Dispute fetched" } }
      },

      delete: {
        tags: ["Disputes"],
        summary: "Delete dispute",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Dispute deleted" } }
      }
    },

    "/api/disputes/{id}/status": {
      patch: {
        tags: ["Disputes"],
        summary: "Update dispute status",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "RESOLVED",
                    enum: ["OPEN", "REVIEWING", "RESOLVED", "REJECTED"]
                  }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Dispute status updated" } }
      }
    },

    // DOCUMENTS
    "/api/documents/upload": {
      post: {
        tags: ["Documents"],
        summary: "Upload vendor document",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  vendorId: { type: "string" },
                  fileUrl: {
                    type: "string",
                    example: "https://example.com/cac-document.pdf"
                  },
                  fileType: { type: "string", example: "CAC_CERTIFICATE" }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Document uploaded" } }
      }
    },

    "/api/documents/vendor/{vendorId}": {
      get: {
        tags: ["Documents"],
        summary: "Get vendor documents",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "vendorId", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Documents fetched" } }
      }
    },

    "/api/documents/{id}/verify": {
      patch: {
        tags: ["Documents"],
        summary: "Verify document",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  verificationStatus: {
                    type: "string",
                    example: "VERIFIED",
                    enum: ["PENDING", "VERIFIED", "REJECTED"]
                  }
                }
              }
            }
          }
        },
        responses: { 200: { description: "Document verified" } }
      }
    },

    "/api/documents/{id}": {
      delete: {
        tags: ["Documents"],
        summary: "Delete document",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Document deleted" } }
      }
    },

    // NOTIFICATIONS
    "/api/notifications": {
      post: {
        tags: ["Notifications"],
        summary: "Create notification",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string" },
                  title: { type: "string", example: "Vendor verification update" },
                  message: { type: "string", example: "Your vendor document has been reviewed." }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Notification created" } }
      },

      get: {
        tags: ["Notifications"],
        summary: "Get my notifications",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Notifications fetched" } }
      }
    },

    "/api/notifications/read-all": {
      patch: {
        tags: ["Notifications"],
        summary: "Mark all notifications as read",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "All notifications marked as read" } }
      }
    },

    "/api/notifications/{id}/read": {
      patch: {
        tags: ["Notifications"],
        summary: "Mark notification as read",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Notification marked as read" } }
      }
    },

    "/api/notifications/{id}": {
      delete: {
        tags: ["Notifications"],
        summary: "Delete notification",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Notification deleted" } }
      }
    },

    // WEBHOOKS
    "/api/webhooks": {
      post: {
        tags: ["Webhooks"],
        summary: "Create webhook",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    example: "https://webhook.site/example"
                  },
                  event: {
                    type: "string",
                    example: "trust_score.updated"
                  }
                }
              }
            }
          }
        },
        responses: { 201: { description: "Webhook created" } }
      },

      get: {
        tags: ["Webhooks"],
        summary: "Get webhooks",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Webhooks fetched" } }
      }
    },

    "/api/webhooks/{id}": {
      delete: {
        tags: ["Webhooks"],
        summary: "Delete webhook",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Webhook deleted" } }
      }
    },

    // HEALTH
    "/api/health": {
      get: {
        tags: ["System"],
        summary: "Health check",
        responses: { 200: { description: "TrustBridge API is running" } }
      }
    }
  }
};

export default swaggerDocs;