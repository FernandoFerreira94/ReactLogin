import React, { useState } from "react"; // Importa a biblioteca React.
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

import * as actions from "../../store/modules/auth/action";
import Loading from "../../Components/loading";

import { Container, DivCentralizada } from "../../styles/GlobalStyles"; // Importa o componente estilizado Container.
import { FormularioLogin } from "./styled";

export default function Login(props) {
  const dispach = useDispatch();

  const prevPath = get(props, "location.state.prevPath", "/");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let formErro = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${email}, ${senha}`);

    if (!isEmail(email)) {
      formErro = true;
      toast.error("Email invalido");
    }

    if (senha.length < 3 || senha.length > 50) {
      formErro = true;
      toast.error("senha invalida");
    }

    if (formErro) return;
    toast.success("Login com sucesso");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispach(actions.LOGIN_REQUEST({ email, senha, prevPath }));
      navigate("/");
    }, 2000);
  };
  return (
    <DivCentralizada>
      <Container>
        <Loading isLoading={loading} texto={"Redirecioando"} />
        <h1>Login</h1>
        <FormularioLogin onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu Email"
            />
          </label>

          <label htmlFor="senha">
            Senha:
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua Senha"
            />
          </label>
          <button type="submit">Login</button>
        </FormularioLogin>
      </Container>
    </DivCentralizada>
  );
}
