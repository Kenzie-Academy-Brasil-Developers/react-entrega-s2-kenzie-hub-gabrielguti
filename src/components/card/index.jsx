import "./styles.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
const Card = ({ techs, setTechs }) => {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@kenzieHub:token")) || ""
  );

  useEffect(() => {
    localStorage.setItem("@user:Techs", JSON.stringify(techs));
  }, [techs]);

  const removeItem = (elem) => {
    const [filteredItem] = techs.filter((item) => item.id === elem.id);

    api
      .delete(`/users/techs/${filteredItem.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_) =>
        setTechs(techs.filter((item) => item.id !== filteredItem.id))
      );
  };

  // const editItem = (edit, item) => {
  //   const objectApi = { status: edit };

  //   if (status !== "") {
  //     api
  //       .put(`/users/techs/${item.id}`, objectApi, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         const newData = response.data;
  //         console.log(techs.map((item) => item.id));
  //       });
  //   }
  // };
  return (
    <>
      {techs ? (
        <>
          {techs.map((item, index) => (
            <div key={item.id} className="Card">
              <>
                {item.title} {item.status}
              </>
              <button
                id="garbage"
                key={index}
                onClick={() => removeItem(item)}
              ></button>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Card;
