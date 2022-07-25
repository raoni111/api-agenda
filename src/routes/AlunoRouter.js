import { Router } from "express";
import AlunosController from "../controllers/AlunosController";
import loginRequiredMiddleware from "../middleware/loginRequiredMiddleware";
import Aluno from "../models/Aluno";

const router = new Router();


router.post('/users/alunos', loginRequiredMiddleware.loginRequired, AlunosController.create);

router.get('/users/alunos', loginRequiredMiddleware.loginRequired, AlunosController.index);
router.get('/users/alunos/:id', loginRequiredMiddleware.loginRequired, AlunosController.show);

router.put('/users/alunos/:id', loginRequiredMiddleware.loginRequired, AlunosController.update);

router.delete('/users/alunos/:id', loginRequiredMiddleware.loginRequired, AlunosController.delete);

export default router;
