import { call, put, all, takeLatest } from "redux-saga/effects"; // Importa as funções call, put, all e takeLatest do redux-saga/effects.
import { toast } from "react-toastify"; // Importa o toast do react-toastify para exibir notificações.

import * as actions from "./action"; // Importa todas as ações do arquivo action.
import * as types from "../types"; // Importa todos os tipos de ação do arquivo types.
import { listaAlunos } from "../../../Pages/Alunos/listaAlunos";

// Função generator que lida com a requisição de exemplo.
function* loginRequest({ payload }) {
  try {
    const response = yield call(listaAlunos, "nome", payload);
    yield put(actions.LOGIN_SUCCESS({ ...response.data }));

    toast.success("Vc fez login");
  } catch (e) {
    console.log(e);
    toast.error("Login invalido");
    yield put(actions.LOGIN_FAILURE());
  }
}

// Exporta a saga raiz que escuta a ação BOTAO_CLICADO_REQUEST e chama exampleRequest.
export default all([takeLatest(types.LOGIN_REQUEST, loginRequest)]);
