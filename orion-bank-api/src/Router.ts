import { Router } from "express";
import { ValidacaoToken } from "./Middleware/ValidacaoToken";
import { AutenticacaoController } from "./API/Controllers/AutenticacaoController";
import { AbrirContaController } from "./API/Controllers/AbrirContaController";
import { AlterarSenhaController } from "./API/Controllers/AlterarSenhaController";
import { ChavePixController } from "./API/Controllers/ChavePixController";

const router = Router();
const autenticacaoController = new AutenticacaoController();
const abrirContaController = new AbrirContaController();
const alterarSenhaController = new AlterarSenhaController()
const chavePixController = new ChavePixController()

router.post("/autenticacao", 
    autenticacaoController.EfetuarAutenticacao
)

//#region Abrir Conta

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

//#endregion

//#region Chave Pix

router.post("/chavePix/criar",
    ValidacaoToken,
    chavePixController.CriarChave
)

router.get("/chavePix/obterPorCodigoConta",
    ValidacaoToken,
    chavePixController.ObterChavesPixPorCodigoConta       
)

router.post("/chavePix/inativarChave",
    ValidacaoToken,
    chavePixController.InativarChavePix
)

//#endregion

export {
    router
}