import "./BizCard.css";
import defaultImage from "../../images/defaultImage.jpg";

const BizCard = (props) => {
  const handleDeleteClick = () => {
    props.onDeleteCard(props.id);
  };

  const handleEditClick = () => {
    props.onEditCard(props.id);
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={props.image ? props.image : defaultImage}
          className="card-img-top"
          alt="User Image"
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <h6 className="card-subtitle mb-2 font-bolder">{props.phone}</h6>
          <h6 className="card-subtitle mb-2">{props.address}</h6>
        </div>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-info btns"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btns"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BizCard;
