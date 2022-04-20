import { useState, Fragment, useEffect } from "react";
import BizCard from "../components/BizCard/BizCard";
import CardEditUser from "../components/CardEditUser/CardEditUser";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { cloneDeep } from "lodash";
import { toast } from "react-toastify";

const CardsPanelPage = () => {
  const [cardsArr, setCardsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const history = useHistory;

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then((dataFromServer) => {
        setCardsArr(dataFromServer.data);
      })
      .catch((err) => {
        if (err.response) {
          toast.error("no cards to show");
        }
        localStorage.clear();
      });
  }, []);

  useEffect(() => {
    if (cardsArr.length > 0) {
      setLoaded(true);
    }
  }, [cardsArr]);

  const handleDeleteCard = (id) => {
    let newCardsArr = cardsArr.filter((item) => item._id !== id);
    setCardsArr(newCardsArr);

    axios
      .delete(`/cards/${id}`)
      .then((res) => {
        console.log("res", res);
        history.push("/cardspanel");
      })
      .catch((err) => {
        if (err.response) {
          toast.error("can not delete this card");
        }
      });
  };

  const handleEditCard = (id) => {
    let newCard = cardsArr.find((item) => {
      return item._id === id;
    });
    if (newCard) {
      setSelectedCard({ ...newCard });
    }
  };

  const handleUpdateCard = (name, description, phone, address, id, image) => {
    let newCardArr = cloneDeep(cardsArr);
    let newCard = newCardArr.find((item) => {
      return item._id === id;
    });
    newCard.name = name;
    newCard.description = description;
    newCard.phone = phone;
    newCard.address = address;
    newCard.image = image;
    setCardsArr(newCardArr);
    setSelectedCard(null);

    axios
      .put(`cards/${id}`, { name, description, phone, address, image })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <h1>My Cards</h1>
      <h5>Your cards shown below...</h5>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {!loaded && <h1>loading...</h1>}
        {cardsArr.map((item) => {
          return (
            <BizCard
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              phone={item.phone}
              address={item.address}
              image={item.image}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
            ></BizCard>
          );
        })}
      </div>
      {selectedCard !== null && (
        <CardEditUser
          id={selectedCard._id}
          name={selectedCard.name}
          description={selectedCard.description}
          phone={selectedCard.phone}
          address={selectedCard.address}
          onUpdateCard={handleUpdateCard}
        ></CardEditUser>
      )}
    </Fragment>
  );
};

export default CardsPanelPage;
