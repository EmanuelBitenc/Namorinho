export interface MensagemProps {
  id: string;
  nome: string;
  para: string;
  mensagem: string;
  assinatura: string;
  corFundo: string;
}

export class Mensagem {
  private readonly _id: string;
  private readonly _nome: string;
  private readonly _para: string;
  private readonly _mensagem: string;
  private readonly _assinatura: string;
  private readonly _corFundo: string;

  constructor(props: MensagemProps) {
    this._id = props.id;
    this._nome = props.nome;
    this._para = props.para;
    this._mensagem = props.mensagem;
    this._assinatura = props.assinatura;
    this._corFundo = props.corFundo;
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get para(): string {
    return this._para;
  }

  get mensagem(): string {
    return this._mensagem;
  }

  get assinatura(): string {
    return this._assinatura;
  }

  get corFundo(): string {
    return this._corFundo;
  }

  toObject(): MensagemProps {
    return {
      id: this._id,
      nome: this._nome,
      para: this._para,
      mensagem: this._mensagem,
      assinatura: this._assinatura,
      corFundo: this._corFundo,
    };
  }
}
