import "./styles.css";
import api from "../../services/api";
import { useEffect, useState } from "react";

const Card = ({tech}) => {
  // console.log(tech)
  const [techs, setTechs] = useState(
    JSON.parse(localStorage.getItem('@user:Techs')) || '' 
   );
  // useEffect(() => {
  //   console.log(techs)
  // },[techs])

   const [newCard, setNewCard] = useState(techs)
  const [token] = useState(
    JSON.parse(localStorage.getItem("@kenzieHub:token")) || ''
  );
 
// useEffect(() => {
//   console.log(newCard)
// }, [newCard])

const [edit, setEdit] = useState('')
const [status, setStatus] = useState({})

  const removeItem = (elem) => {
    
    const [ filteredItem  ]= techs.filter((item)=> item.id === elem.id)

    api.delete(`/users/techs/${filteredItem.id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  },
    )
    .then((_) => setNewCard(newCard.filter((item) => item.id !== filteredItem.id)))
    .then((_) => setTechs(techs.filter((elem) => elem.id !== filteredItem.id)))
  }
  
  const editItem = (item) => {
    console.log(item)
    setStatus({status: item})
  }
  // console.log(teste)

  return (
    <>
      { newCard ? 
      <>{newCard.map((item, index) => (
        <div key={item.id} className="Card">
          <>{item.title} {item.status}</>
          <input
          placeholder = 'editar status'
          type = 'text'
          value = {edit}
          onChange = {(e) => setEdit(e.target.value)}
          />
          <button onClick = {() => editItem(edit)}  type = 'submit'>Editar</button>
          <button id = 'garbage' key={index} onClick = {() => removeItem(item)} ></button>
        </div>
        ))}
        </>
        :
        <></>
      }
    </>
  );
};

export default Card;
