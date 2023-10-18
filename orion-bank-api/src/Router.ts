import { Router } from "express";
import { AUTENTICACAO } from "./Config/ApiDiConfig";
import { container } from "./Config/Container";

const router = Router();
const autenticacaoController = container.get(AUTENTICACAO.Controller);

router.post("/autenticacao", autenticacaoController.EfetuarAutenticacao)

export {
    router
}