import { Router } from "express";
import { AutenticacaoController } from "./API/Controllers/AutenticacaoController";

const router = Router();
const autenticacaoController = new AutenticacaoController();

router.post("/autenticacao", autenticacaoController.EfetuarAutenticacao)

export {
    router
}