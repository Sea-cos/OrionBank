import { IAutenticacaoService } from "../../Application/Interfaces/IAutenticacaoService";
import { Request, Response } from "express";
import { AutenticacaoDto } from "../../Application/DTOs/AutenticacaoDto";
import { injected } from "brandi";
import { AUTENTICACAO } from "../../Config/ApiDiConfig";

export class AutenticacaoController {   

    constructor(
        private _autenticacaoServices: IAutenticacaoService
    ){ }

    /* Rota: /autenticacao */
    EfetuarAutenticacao(request: Request, response: Response) {
        try {

            console.log(request.body)

            const {
                login,
                senha
            } = request.body;

            const teste = { Login: login, Senha: senha } as AutenticacaoDto

            const conta = this._autenticacaoServices.EfetuaLogin(teste);
            
            return response.status(200).send(conta);

        } catch(e) {
            console.log(e)
            return response.status(400).send(e)
        }
    }
}

injected(AutenticacaoController, AUTENTICACAO.IService);