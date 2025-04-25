import { Mensagem, MensagemProps } from "../entities/Mensagem";

export interface IMensagemRepository {
  findById(id: string): Promise<Mensagem | null>;
  save(mensagem: Mensagem): Promise<string>;
  listExemplos(): Promise<Mensagem[]>;
}
