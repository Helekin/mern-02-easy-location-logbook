import React from "react";
import { useSelector } from "react-redux";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <React.Fragment>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            {userInfo._id === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}

            {userInfo._id === props.creatorId && (
              <Button danger onClick={() => {}}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
