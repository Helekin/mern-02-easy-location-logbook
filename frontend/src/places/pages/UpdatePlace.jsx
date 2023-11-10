import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
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

  const [updatePlace, { isLoading }] = useUpdatePlaceMutation();

  return <div>UpdatePlace</div>;
};

export default UpdatePlace;
