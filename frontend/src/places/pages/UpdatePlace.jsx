import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import {
  useUpdatePlaceMutation,
  useGetPlaceByIdQuery,
} from "../../slices/placeApiSlice";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../utils/validators";
import { useForm } from "../../hooks/form-hook";

import "./PlaceForm.css";

const UpdatePlace = () => {
  const [error, setError] = useState("");

  const { placeId } = useParams();

  const navigate = useNavigate();

  const { data, isLoading: loadingPlace } = useGetPlaceByIdQuery(placeId);
  const [updatePlace, { isLoading }] = useUpdatePlaceMutation();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await updatePlace({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        placeId: placeId,
      }).unwrap();

      navigate("/");
    } catch (err) {
      setError(err.data?.message || err.error);
    }
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  if (loadingPlace) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={data.place.title}
          initialValid={true}
        />
        <Input
          id="description"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
          initialValue={data.place.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePlace;
