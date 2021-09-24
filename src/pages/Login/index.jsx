import "./stylesLogin.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory, Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import api from "../../services/api";
import { toast } from "react-toastify";

const Login = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const schema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Mínimo de 8 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNewUser = (data) => {
    api
      .post("/sessions", data)
      .then((response) => {
        const { token } = response.data;

        localStorage.setItem(
          "@user:Techs",
          JSON.stringify(response.data.user.techs)
        );
        localStorage.setItem("@kenzieHub:token", JSON.stringify(token));
        localStorage.setItem("@user:userEmail", JSON.stringify(data.email));
        toast.success("Sucesso ao entrar");

        setAuthenticated(true);
        return history.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Conta inválida");
      });
  };
  if (authenticated) {
    <Redirect to="/dashboard" />;
  }
  return (
    <div className="contentBox">
      <div className="boxImageLogin"></div>
      <div className="contentForm">
        <form onSubmit={handleSubmit(handleNewUser)} className="formInputs">
          <h1>Login</h1>

          <TextField
            type="text"
            id="outlined-basicEmail"
            label="Email"
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            type="password"
            id="outlined-basicPassword"
            label="Senha"
            helperText={errors.password?.message}
            {...register("password")}
          />

          <span>
            Não possui possui conta? <Link to="/">Cadastre-se</Link>
          </span>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
