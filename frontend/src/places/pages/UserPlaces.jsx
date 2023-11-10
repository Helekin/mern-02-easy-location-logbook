import React from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import PlaceList from "../components/PlaceList";

import { useGetPlacesByUserIdQuery } from "../../slices/placeApiSlice";

const UserPlaces = () => {
  const { userId } = useParams();

  const { data, isLoading } = useGetPlacesByUserIdQuery(userId);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && <PlaceList items={data.places} onDeletePlace={() => {}} />}
    </React.Fragment>
  );
};

export default UserPlaces;
