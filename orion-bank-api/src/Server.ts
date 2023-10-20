import Express from "express";
import dotenv from "dotenv";
import { router } from "./Router";
import swaggerUi from "swagger-ui-express";

const swaggerFile = require("../swagger_output.json");

const app = Express();
dotenv.config();

app.use(Express.json())
app.use(router);
app.use("/swagger/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});