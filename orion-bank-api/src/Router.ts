import { Router } from "express";
import { ValidacaoToken } from "./Middleware/ValidacaoToken";
import { AutenticacaoController } from "./API/Controllers/AutenticacaoController";
import { AbrirContaController } from "./API/Controllers/AbrirContaController";
import { AlterarSenhaController } from "./API/Controllers/AlterarSenhaController";

const router = Router();
const autenticacaoController = new AutenticacaoController();
const abrirContaController = new AbrirContaController();
const alterarSenhaController = new AlterarSenhaController()

router.post("/autenticacao", 
    autenticacaoController.EfetuarAutenticacao
)

router.post("/abrirConta/solicitacao", 
    abrirContaController.SolicitarAberturaDeConta
)

router.post("/abrirConta/aprovarSolicitacao",
    ValidacaoToken,
    abrirContaController.EfetuarAberturaDeConta
)

router.get("/abrirConta/obterRegistrosSolicitacao",
    ValidacaoToken,
    abrirContaController.ObterRegistrosSolicitacaoAberturaConta
)

router.post("/abrirConta/reprovarSolicitadao/:codigo",
    ValidacaoToken,
    abrirContaController.ReprovarAberturaDeConta
)

router.post("/alterarSenha",
    ValidacaoToken,
    alterarSenhaController.AlterarSenha
)

export {
    router
}