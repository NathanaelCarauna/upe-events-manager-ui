import { toast } from "react-toastify";

const ErrorService = {
  handleError: (error) => {
    // Aqui você pode adicionar lógica para tratar diferentes tipos de erros
    // e exibir mensagens apropriadas.
    if (error.response) {
      // Erros de resposta do servidor (código de status fora da faixa 2xx)
      toast.error(
        `Erro: ${error.response.status} - ${
          error.response.data.message || "Erro no servidor"
        }`
      );
    } else if (error.request) {
      // Erros que ocorreram ao fazer a requisição
      toast.error(
        "Erro: Falha ao se comunicar com o servidor. Verifique sua conexão."
      );
    } else {
      // Outros erros
      toast.error(`Erro: ${error.message}`);
    }
  },
};

export default ErrorService;
