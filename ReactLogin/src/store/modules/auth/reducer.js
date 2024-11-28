import * as types from "../types"; // Importa todas as constantes de tipos de ação do arquivo types.

const initialState = {
  isLoggeDin: false, // Estado inicial com botaoClicado definido como falso.
  token: false,
  user: {},
  isLoading: false,
};

// Função reducer que manipula o estado baseado nas ações despachadas.
export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const newState = { ...state };
      newState.isLoading = true;

      return newState;
    }

    case types.LOGIN_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }
    default: {
      return state; // Retorna o estado atual para qualquer ação não reconhecida.
    }
  }
}
