import { Router } from "express";
const router = Router();
import TodoController from "../../../controllers/TodoController";

router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getOne);
router.post("/", TodoController.create);
router.put("/:id", TodoController.update);
router.delete("/", TodoController.delete);


export default router;
