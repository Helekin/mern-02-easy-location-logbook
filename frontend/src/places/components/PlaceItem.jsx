import React, { useState } from "react";
import { useSelector } from "react-redux";

import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import { useDeletePlaceMutation } from "../../slices/placeApiSlice";

import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState("");

  const [deletePlace, { isLoading }] = useDeletePlaceMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await deletePlace(props.id);
      props.refetch();
    } catch (err) {
      setError(err.data?.message || err.error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it can
          not be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        {isLoading && <LoadingSpinner asOverlay />}
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
            {userInfo && userInfo._id === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}

            {userInfo && userInfo._id === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
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
