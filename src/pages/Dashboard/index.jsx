import { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import Card from "../../components/card";
import api from "../../services/api";
import './styles.css'
const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [tech, setTech] = useState([]);
  const { register, handleSubmit } = useForm();
  const [token] = useState(
    JSON.parse(localStorage.getItem("@kenzieHub:token")) || ''
  );
  const [userEmail] = useState(
    JSON.parse(localStorage.getItem('@user:userEmail'))
  )
  
  const getOut = () => {
    localStorage.removeItem('@kenzieHub:token')
    setAuthenticated(false)
  }

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
        
      },
      )
      .catch((err) => toast.error('Tarefa criada incorretamente'));
  };

  if (!authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="containerDashboard">
      <div className="headerUser"><span>{userEmail}</span> <button onClick = {getOut}>Sair</button></div>
      <div className="searchCamp">
        <h1>Adicione tecnologias que aprendeu e/ou está aprendendo</h1>
        <form onSubmit={handleSubmit(getTech)} className="inputsSideBySide">
          <input
            type="text"
            placeholder="Título da tecnologia"
            {...register("title")}
          />
          <input type="text" placeholder="Nível" {...register("status")} />
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <div className="techAdded">
        <h2>Tecnologias:</h2>
        <div className="techCards"> <Card tech = {tech}/></div>
      </div>
    </div>
  );
};

export default Dashboard;
