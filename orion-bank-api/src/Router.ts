import { Router } from "express";
import { ValidacaoToken } from "./Middleware/ValidacaoToken";
import { AutenticacaoController } from "./API/Controllers/AutenticacaoController";
import { AbrirContaController } from "./API/Controllers/AbrirContaController";
import { ChavePixController } from "./API/Controllers/ChavePixController";
import { AlterarSenhaController } from "./API/Controllers/AlterarSenhaController";

const router = Router();
const autenticacaoController = new AutenticacaoController();
const abrirContaController = new AbrirContaController();
const chavePixController = new ChavePixController()
const alterarSenhaController = new AlterarSenhaController()

router.post("/autenticacao", 
    autenticacaoController.EfetuarAutenticacao
)

router.post("/autenticacao/alterarSenha",
    ValidacaoToken,
    alterarSenhaController.AlterarSenha
)

router.get("/autenticacao/recuperarSenha/:documentoFederal",
    autenticacaoController.RecuperarSenha
)

//#region Abrir Conta

router.get("/conta/buscarCodigo/:codigo",
    ValidacaoToken,
    abrirContaController.BuscarContaPorCodigo
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