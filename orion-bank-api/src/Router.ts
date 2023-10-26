import { Router } from "express";
import { ValidacaoToken } from "./Middleware/ValidacaoToken";
import { AutenticacaoController } from "./API/Controllers/AutenticacaoController";
import { AbrirContaController } from "./API/Controllers/AbrirContaController";

const router = Router();
const autenticacaoController = new AutenticacaoController();
const abrirContaController = new AbrirContaController();

router.post("/autenticacao", autenticacaoController.EfetuarAutenticacao)

router.post("/abrirConta/solicitacao", 
    abrirContaController.SolicitarAberturaDeConta
)

router.post("/abrirConta/efetuarAbertura",
    abrirContaController.EfetuarAberturaDeConta)

router.get("/abrirConta/obterRegistrosSolicitacao",
    ValidacaoToken,
    abrirContaController.ObterRegistrosSolicitacaoAberturaConta
)

export {
    router
}