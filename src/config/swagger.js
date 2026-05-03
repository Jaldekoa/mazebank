import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mazebank",
      version: "1.0.0",
      description: "Documentación interactiva de la API de Mazebank",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "Bearer",
          BearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./src/routes/*.js", "./src/routes/api/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi, swaggerSpec };
