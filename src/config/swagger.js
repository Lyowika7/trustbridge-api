import swaggerJsdoc from "swagger-jsdoc";

import swaggerDocs from "../docs/swaggerDocs.js";

const swaggerOptions = {
  definition: swaggerDocs,
  apis: []
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;