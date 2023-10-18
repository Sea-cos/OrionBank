import { Container } from "brandi";
import { AUTENTICACAO } from "./ApiDiConfig";
import { AutenticacaoService } from "../Application/Services/AutenticacaoService";
import { AutenticacaoController } from "../API/Controllers/AutenticacaoController";
import { AutenticacaoRepository } from "../Data/Repositories/LoginRepository"; 

const container = new Container();

container
    .bind(AUTENTICACAO.IService)
    .toInstance(AutenticacaoService)
    .inTransientScope();

container
    .bind(AUTENTICACAO.IRepository)
    .toInstance(AutenticacaoRepository)
    .inTransientScope();

container
    .bind(AUTENTICACAO.Controller)
    .toInstance(AutenticacaoController)
    .inTransientScope();
    

export {
    container
}