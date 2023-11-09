import React from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";

import { useGetUserQuery } from "../../slices/userApiSlice";

const Users = () => {
  const { data: users, isLoading, error } = useGetUserQuery();

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => {}} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && <UsersList items={users} />}
    </React.Fragment>
  );
};

export default Users;
