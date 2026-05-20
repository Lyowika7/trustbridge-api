import { swaggerSpec, swaggerUi } from "../docs/swaggerDocs.js";

const swaggerSetup = (app) => {
  app.get("/api/docs.json", (req, res) => {
    res.status(200).json(swaggerSpec);
  });

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
};

export default swaggerSetup;