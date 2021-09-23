import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import Card from "../../components/card";
import api from "../../services/api";

const Dashboard = ({ authenticated }) => {
  const [tech, setTech] = useState([]);
  const [key, setKey] = useState(false);
  const { register, handleSubmit } = useForm();
  const [token] = useState(
    JSON.parse(localStorage.getItem("@kenzieHub:token")) || ""
  );

  useEffect(() => {
    console.log(tech.id);
  }, [tech]);

  const getTech = (data) => {
    if (data.title === "" || data.status === "") {
      return toast.warning("Complete os campos para criar uma tarefa");
    }

    api
      .post("/users/techs", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTech([...tech, response.data]);
        return setKey(true);
      })
      .catch((err) => console.log(err));
  };
  console.log(tech.id);

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="containerDashboard">
      <div className="headerUser"></div>
      <div className="searchCamp">
        <h1>Adicione tecnologias que aprendeu e/ou está aprendendo</h1>
        <form onSubmit={handleSubmit(getTech)} className="inputsSideBySide">
          <input
            type="text"
            lable="Título da tecnologia"
            {...register("title")}
          />
          <input type="text" label="Nível" {...register("status")} />
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <div className="techAdded">
        <h2>Tecnologias:</h2>
        <div className="techCards">{key ? <Card card={tech} /> : <></>}</div>
      </div>
    </div>
  );
};

export default Dashboard;
