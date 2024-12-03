import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../Dashboard/dashboardSlice";
import Button from "../../Components/Button";
import "./index.css";

function DeleteModal({
  setDeleteModal,
  empTodelete,
  employeeIdToDelete,
  setEmployeeTableLoader,
}) {
  const dispatch = useDispatch();
  const [deleteLoader, setDeleteLoader] = useState(false);
  useEffect(() => {
    console.log(deleteLoader);
  }, [deleteLoader]);

  const handleDeleteConfirm = () => {
    dispatch(
      deleteEmployee(
        employeeIdToDelete,
        setDeleteLoader,
        setDeleteModal,
        setEmployeeTableLoader
      )
    );
  };
  return (
    <div className="confirm_delete">
      <h1>Confirm Deletion</h1>
      <p>Are you sure want to delete employee {empTodelete}</p>
      <div className="deleteButtongroup">
        <Button
          className="tertiary_button"
          loading={deleteLoader}
          loaderClassName="small_loader"
          onClick={handleDeleteConfirm}
        >
          Confirm
        </Button>
        <Button
          className="tertiary_button"
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteModal;
