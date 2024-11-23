import { Router } from "express";
import { ValidationError } from "express-validation";
import todoRoutes from "./todos";
const routeSetup = (app) => {
  const router = Router();

  router.use("/todos", todoRoutes);
  
  app.use("/api/v1", router);

  app.use("/", router);
  
  // Request Validation Exception Handler
  app.use(function (err, req, res, next) {
    console.log("ERROR ", err);
    if (err instanceof ValidationError)
      return res.status(err.statusCode).json(err);
    return res.status(500).json(err);
  });

};

export default routeSetup;
