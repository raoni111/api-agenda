import { Router } from "express";
import photoController from "../controllers/photoController";
import loginRequiredMiddleware from "../middleware/loginRequiredMiddleware";

const route = new Router();

route.post('/users/aluno/photo/:id', loginRequiredMiddleware.loginRequired, photoController.create);

export default route;
