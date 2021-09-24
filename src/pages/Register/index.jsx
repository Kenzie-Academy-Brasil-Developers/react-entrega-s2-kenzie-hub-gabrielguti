import "./stylesRegister.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory, Redirect } from "react-router-dom";
import { TextField } from "@material-ui/core";
import api from "../../services/api";
import { toast } from "react-toastify";

const Register = ({ authenticated }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(8, "Mínimo de 8 caracteres"),
    name: yup.string().required("Nome obrigatório"),
    bio: yup.string().required("Bio é obrigatório"),
    contact: yup.string().required().min(9, "Número com 9 digitos"),
    course_module: yup.string().required("Módulo do cruso é obrigatório"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas devem ser iguais"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleNewUser = ({
    email,
    name,
    password,
    bio,
    contact,
    course_module,
  }) => {
    const user = { email, name, password, bio, contact, course_module };

    api
      .post("/users", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta");
        return history.push("/login");
      })
      .catch((err) => {
        toast.error("Tente outro email");
      });
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="contentBox">
      <div className="boxImage"></div>
      <div className="contentForm">
        <form onSubmit={handleSubmit(handleNewUser)} className="formInputs">
          <h1>KenzieHub</h1>

          <TextField
            type="text"
            id="outlined-basicName"
            label="Nome"
            color="secondary"
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            type="text"
            id="outlined-basicEmail"
            label="Email"
            color="secondary"
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            type="text"
            id="outlined-basicBio"
            label="Bio"
            color="secondary"
            helperText={errors.bio?.message}
            {...register("bio")}
          />
          <TextField
            type="number"
            id="outlined-basicContact"
            label="Contact"
            color="secondary"
            helperText={errors.contact?.message}
            {...register("contact")}
          />
          <TextField
            type="text"
            id="outlined-basicModule"
            label="Módulo do Curso"
            color="secondary"
            helperText={errors.course_module?.message}
            {...register("course_module")}
          />
          <TextField
            type="password"
            id="outlined-basicPassword"
            label="Senha"
            color="secondary"
            helperText={errors.password?.message}
            {...register("password")}
          />
          <TextField
            type="password"
            id="outlined-basicPassConfirm"
            label="Confirme sua senha"
            color="secondary"
            helperText={errors.passwordConfirm?.message}
            {...register("passwordConfirm")}
          />
          <span>
            Já possui conta? <Link to="/login">Login</Link>
          </span>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
