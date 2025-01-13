import React from "react"; // Importa a biblioteca React.
import ReactDOM from "react-dom/client"; // Importa o módulo ReactDOM para renderizar componentes React no DOM.
import App from "./App"; // Importa o componente principal App.
import reportWebVitals from "./reportWebVitals"; // Importa a função reportWebVitals para medir o desempenho da aplicação.

const root = ReactDOM.createRoot(document.getElementById("root")); // Cria um root do ReactDOM na div com id "root".
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
