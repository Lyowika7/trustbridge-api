import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "TrustBridge API",
      version: "2.0.0",
      description:
        "Production-ready trust, vendor verification, fraud reporting, disputes, support tickets, reputation management, and real-time notification infrastructure API."
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://trustbridge-api-h36q.onrender.com"
            : "http://localhost:5000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production Server"
            : "Development Server"
      }
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication and account management"
      },
      {
        name: "Vendors",
        description: "Vendor business profiles and trust system"
      },
      {
        name: "Reviews",
        description: "Vendor review and rating system"
      },
      {
        name: "Reports",
        description: "Fraud/scam reporting system"
      },
      {
        name: "Transactions",
        description: "Vendor transaction records"
      },
      {
        name: "Disputes",
        description: "Customer/vendor disputes"
      },
      {
        name: "Documents",
        description: "Vendor verification documents"
      },
      {
        name: "Support",
        description: "Customer care and support tickets"
      },
      {
        name: "Notifications",
        description: "Real-time notification system"
      },
      {
        name: "Developers",
        description: "API keys and developer platform"
      },
      {
        name: "Billing",
        description: "Subscription and billing system"
      },
      {
        name: "Webhooks",
        description: "Webhook event system"
      },
      {
        name: "Admin",
        description: "Admin moderation and audit logs"
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
      },

      schemas: {
        User: {
          type: "object",

          properties: {
            id: {
              type: "string"
            },

            fullName: {
              type: "string"
            },

            email: {
              type: "string"
            },

            role: {
              type: "string",
              enum: ["CUSTOMER", "VENDOR", "ADMIN"]
            },

            isEmailVerified: {
              type: "boolean"
            },

            createdAt: {
              type: "string",
              format: "date-time"
            }
          }
        },

        Vendor: {
          type: "object",

          properties: {
            id: {
              type: "string"
            },

            businessName: {
              type: "string"
            },

            businessEmail: {
              type: "string"
            },

            phoneNumber: {
              type: "string"
            },

            address: {
              type: "string"
            },

            cacNumber: {
              type: "string"
            },

            nin: {
              type: "string"
            },

            category: {
              type: "string"
            },

            description: {
              type: "string"
            },

            trustScore: {
              type: "number"
            },

            verificationStatus: {
              type: "string"
            },

            ownerId: {
              type: "string"
            }
          }
        },

        Review: {
          type: "object",

          properties: {
            id: {
              type: "string"
            },

            rating: {
              type: "number"
            },

            comment: {
              type: "string"
            },

            vendorId: {
              type: "string"
            }
          }
        },

        Report: {
          type: "object",

          properties: {
            id: {
              type: "string"
            },

            title: {
              type: "string"
            },

            description: {
              type: "string"
            },

            status: {
              type: "string"
            }
          }
        },

        Dispute: {
          type: "object",

          properties: {
            id: {
              type: "string"
            },

            title: {
              type: "string"
            },

            description: {
              type: "string"
            },

            status: {
              type: "string"
            }
          }
        },

        SupportTicket: {
          type: "object",

          properties: {
            id: {
              type: "string"
            },

            subject: {
              type: "string"
            },

            message: {
              type: "string"
            },

            status: {
              type: "string",
              enum: ["OPEN", "IN_PROGRESS", "RESOLVED"]
            }
          }
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ["./src/modules/**/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };