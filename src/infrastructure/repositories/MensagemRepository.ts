import { Mensagem, MensagemProps } from "../../domain/entities/Mensagem";
import { IMensagemRepository } from "../../domain/repositories/IMensagemRepository";

// Simulação de banco de dados em memória
const mensagensDb: Record<string, MensagemProps> = {
  exemplo1: {
    id: "exemplo1",
    nome: "João",
    para: "Maria",
    mensagem:
      "Desde o primeiro dia em que te vi, soube que meu coração tinha encontrado seu lar. Cada momento ao seu lado é um presente que guardo com carinho. Te amo mais a cada dia que passa.",
    assinatura: "Seu amor eterno",
    corFundo: "#fce7f3",
  },
  exemplo2: {
    id: "exemplo2",
    nome: "Ana",
    para: "Pedro",
    mensagem:
      "Você trouxe cor para minha vida quando tudo parecia preto e branco. Seu sorriso ilumina meus dias, e seu abraço é meu lugar favorito no mundo. Obrigada por ser exatamente quem você é.",
    assinatura: "Para sempre sua",
    corFundo: "#dbeafe",
  },
};

export class MensagemRepository implements IMensagemRepository {
  async findById(id: string): Promise<Mensagem | null> {
    // Simulando delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mensagemData = mensagensDb[id];

    if (!mensagemData) {
      return null;
    }

    return new Mensagem(mensagemData);
  }

  async save(mensagem: Mensagem): Promise<string> {
    // Simulando delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mensagemData = mensagem.toObject();
    mensagensDb[mensagemData.id] = mensagemData;

    return mensagemData.id;
  }

  async listExemplos(): Promise<Mensagem[]> {
    // Simulando delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    return Object.values(mensagensDb).map((data) => new Mensagem(data));
  }
}
