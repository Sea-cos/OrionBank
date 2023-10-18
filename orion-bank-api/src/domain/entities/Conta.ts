

export interface Conta {
    ID: number;
    Codigo: string;
    Agencia: string;
    Conta: string;
    ContaDigito: string;
    ContaPgto: string;
    DocumentoFederal: string;
    NomeCompleto: string;
    Senha: string;
    Email: string;
    DtNasc: Date
    TelefoneCelular: string;
    CEP: string;
    Logradouro: string;
    NumeroResidencial: number;
    DtInclusao: Date;
    Situacao: number;
    DtSituacao: Date;
}

// class Conta {

//     public ID: number;
//     public Codigo: string;
//     public Agencia: string;
//     public Conta: string;
//     public ContaDigito: string;
//     public ContaPgto: string;
//     public DocumentoFederal: string;
//     public NomeCompleto: string;
//     public Senha: string;
//     public Email: string;
//     public DtNasc: Date
//     public TelefoneCelular: string;
//     public CEP: string;
//     public Logradouro: string;
//     public NumeroResidencial: number;
//     public DtInclusao: Date;
//     public Situacao: number;
//     public DtSituacao: Date;

//     constructor(id: number, codigo: string, agencia: string, contaDigito: string, contaPgto: string, documentoFederal: string,
//             nomeCompleto: string, conta: string, senha: string, email: string, dtNasc: Date, telefoneCelular: string, cep: string, 
//             logradouro: string, numeroResidensial: number, dtInclusao: Date, situacao: number, dtSituacao: Date) {
                
//         this.ID = id;
//         this.Codigo = codigo;
//         this.Agencia = agencia;
//         this.Conta = conta;
//         this.ContaDigito = contaDigito;
//         this.ContaPgto = contaPgto;
//         this.DocumentoFederal = documentoFederal;
//         this.NomeCompleto = nomeCompleto;
//         this.Senha = senha;
//         this.Email = email;
//         this.DtNasc = dtNasc;
//         this.TelefoneCelular = telefoneCelular;
//         this.CEP = cep;
//         this.Logradouro = logradouro;
//         this.NumeroResidencial = numeroResidensial;
//         this.DtInclusao = dtInclusao;
//         this.Situacao = situacao;
//         this.DtSituacao = dtSituacao
//     }

// }

// export {
//     Conta
// }