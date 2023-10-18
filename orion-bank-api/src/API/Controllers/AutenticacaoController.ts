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

            const teste = request.body as AutenticacaoDto;

            const conta = this._autenticacaoServices.EfetuaLogin(teste);
            
            return response.status(200).send(conta);

        } catch(ex) {
            return response.status(200).send({ message: ex });
        }
    }
}

injected(AutenticacaoController, AUTENTICACAO.IService);