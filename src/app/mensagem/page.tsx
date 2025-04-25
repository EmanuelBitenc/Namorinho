"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormState } from "../../interfaces/controllers/MensagemController";
import { MensagemFactory } from "../../interfaces/factories/MensagemFactory";

export default function CriarMensagem() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    nome: "",
    para: "",
    mensagem: "",
    assinatura: "",
    corFundo: "#fce7f3", // Rosa claro padrão
    mostrarFormaPagamento: false,
    pagamentoCompleto: false,
    mensagemId: "",
  });
  const [controller, setController] = useState<any>(null);

  useEffect(() => {
    // Inicializa o controller apenas no cliente
    setController(MensagemFactory.createMensagemController());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, mostrarFormaPagamento: true }));
  };

  const simularPagamento = async () => {
    if (!controller) return;

    // Indicar que o pagamento está sendo processado
    setFormState((prev) => ({ ...prev, processandoPagamento: true }));

    try {
      // Simular processamento do pagamento
      const pagamentoAprovado = await controller.simularPagamento();

      if (pagamentoAprovado) {
        // Criar a mensagem no "banco de dados"
        const mensagemId = await controller.criarMensagem({
          nome: formState.nome,
          para: formState.para,
          mensagem: formState.mensagem,
          assinatura: formState.assinatura,
          corFundo: formState.corFundo,
        });

        setFormState((prev) => ({
          ...prev,
          pagamentoCompleto: true,
          processandoPagamento: false,
          mensagemId,
        }));
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      setFormState((prev) => ({
        ...prev,
        processandoPagamento: false,
      }));
    }
  };

  const preVisualizar = () => {
    router.push(`/ver/${formState.mensagemId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 dark:from-purple-900 dark:to-pink-900 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 transition-colors mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Voltar para início
        </Link>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            {formState.pagamentoCompleto
              ? "Sua mensagem está pronta!"
              : formState.mostrarFormaPagamento
              ? "Finalize seu pagamento"
              : "Crie sua mensagem de amor"}
          </h1>

          {!formState.mostrarFormaPagamento && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Seu nome
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formState.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="para"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Para quem é a mensagem
                    </label>
                    <input
                      type="text"
                      id="para"
                      name="para"
                      value={formState.para}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="assinatura"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Como quer assinar a mensagem
                    </label>
                    <input
                      type="text"
                      id="assinatura"
                      name="assinatura"
                      value={formState.assinatura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Seu amor, Admirador Secreto, etc"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="corFundo"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Cor de fundo da mensagem
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="corFundo"
                        name="corFundo"
                        value={formState.corFundo}
                        onChange={handleChange}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Escolha uma cor que combine com o sentimento
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="mensagem"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Sua mensagem de amor
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formState.mensagem}
                    onChange={handleChange}
                    rows={10}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                    placeholder="Escreva aqui as palavras que expressam o que sente..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Continuar para pagamento
                </button>
              </div>
            </form>
          )}

          {formState.mostrarFormaPagamento && !formState.pagamentoCompleto && (
            <div className="space-y-6">
              <div className="bg-pink-50 dark:bg-pink-900/30 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Resumo da mensagem
                </h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">De:</span> {formState.nome}
                  </p>
                  <p>
                    <span className="font-medium">Para:</span> {formState.para}
                  </p>
                  <p>
                    <span className="font-medium">Assinatura:</span>{" "}
                    {formState.assinatura}
                  </p>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Forma de pagamento
                </h2>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                      Valor total
                    </h3>
                    <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                      R$ 5,00
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Esta é uma simulação. Em um ambiente de produção, aqui
                      teríamos a integração com um gateway de pagamento real.
                    </p>
                    <button
                      onClick={simularPagamento}
                      disabled={formState.processandoPagamento}
                      className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {formState.processandoPagamento ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processando...
                        </span>
                      ) : (
                        "Finalizar Pagamento"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      mostrarFormaPagamento: false,
                    }))
                  }
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 font-medium"
                >
                  Voltar e editar mensagem
                </button>
              </div>
            </div>
          )}

          {formState.pagamentoCompleto && (
            <div className="space-y-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  Pagamento confirmado!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Sua mensagem de amor está pronta para ser compartilhada
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 mb-4">
                  ID da sua mensagem:
                </p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 font-mono text-pink-600 dark:text-pink-400">
                  {formState.mensagemId}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Compartilhe este link com seu amor:
                </p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 font-mono text-sm text-gray-800 dark:text-gray-200 mt-2 break-all">
                  {typeof window !== "undefined" &&
                    `${window.location.origin}/ver/${formState.mensagemId}`}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={preVisualizar}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Ver minha mensagem
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
