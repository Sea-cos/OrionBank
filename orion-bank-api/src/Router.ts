import { Router } from "express";
import { ValidacaoToken } from "./Middleware/ValidacaoToken";
import { AutenticacaoController } from "./API/Controllers/AutenticacaoController";
import { AbrirContaController } from "./API/Controllers/AbrirContaController";
import { ChavePixController } from "./API/Controllers/ChavePixController";
import { AlterarSenhaController } from "./API/Controllers/AlterarSenhaController";
import { SaldoController } from "./API/Controllers/SaldoController";
import { MovimentoController } from "./API/Controllers/MovimentoController";
import { GerarPDF } from "./Application/PDF/GerarPDF";
import { ExtratoController } from "./API/Controllers/ExtratoController";

const router = Router();
const autenticacaoController = new AutenticacaoController();
const abrirContaController = new AbrirContaController();
const chavePixController = new ChavePixController()
const alterarSenhaController = new AlterarSenhaController()
const saldoController = new SaldoController()
const movimentoController = new MovimentoController()
const extratoController = new ExtratoController()

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

router.get("/extrato/importar/:codigoConta",
    ValidacaoToken,
    extratoController.ImportarExtrato
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

//#region Saldo

router.get("/saldo/:codigo",
    ValidacaoToken,
    saldoController.ObterSaldo
)

//#endregion

//#region Movimento

router.post("/movimento/transacaoPixViaChave",
    ValidacaoToken,
    movimentoController.RealizarTransacaoPixViaChave
)

router.get("/movimento/ultimasTransacoes/:codigoConta",
    ValidacaoToken,
    movimentoController.ObterUltimasTransacoes
)

//#endregion

export {
    router
}