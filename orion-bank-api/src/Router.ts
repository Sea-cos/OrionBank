import { Router } from "express";
import { AutenticacaoController } from "./API/Controllers/AutenticacaoController";
import { AbrirContaController } from "./API/Controllers/AbrirContaController";

const router = Router();
const autenticacaoController = new AutenticacaoController();
const abrirContaController = new AbrirContaController();

router.post("/autenticacao", autenticacaoController.EfetuarAutenticacao)

router.post("/abrirConta/solicitacao", abrirContaController.SolicitarAberturaDeConta)

export {
    router
}