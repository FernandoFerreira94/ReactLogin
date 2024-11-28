import React, { useState } from "react"; // Importa a biblioteca React.
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//styled
import { Container, DivCentralizada } from "../../styles/GlobalStyles"; // Importa o componente estilizado Container.
import { Formulario } from "./styled";
import isEmail from "validator/lib/isEmail";
import Loading from "../../Components/loading";

export default function Register() {
  const authData = useSelector((state) => console.log(state.auth));

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let formErros = false;

    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error("Nome tem que ter entre 3 e 255 caracter");
    }

    if (!isEmail(email)) {
      formErros = true;
      toast.error("email invalido");
    }

    if (senha.length < 6 || senha.length > 50) {
      formErros = true;
      toast.error("Senha tem que ter entre 6 e 50 caracter");
    }

    if (formErros) return;

    toast.success("Cadastro com sucesso");

    setIsLoading(true);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <DivCentralizada>
      <Container>
        <Loading isLoading={isLoading} texto={"Rediecionando"} />
        <h1>Crie sua conta</h1>
        <Formulario onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome:{" "}
            <input
              placeholder="Digite seu Nome"
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>

          <label htmlFor="email">
            Email:{" "}
            <input
              placeholder="Digite seu Email"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="senha">
            Senha:{" "}
            <input
              placeholder="Digite sua senha"
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

          <button type="submit">Criar conta</button>
        </Formulario>
      </Container>
    </DivCentralizada>
  );
}
