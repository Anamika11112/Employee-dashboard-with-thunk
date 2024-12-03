import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleEmployee,
  registerEmployee,
  removeSingleEmployee,
  updateEmployeeEdits,
} from "./addEditSlice";
import { dynamicInputHandler, formatDate } from "../../Helpers/Utilities";
import { validateField, validateForm } from "./empRegValidation";
import Button from "../../Components/Button";
import TextInput from "../../Components/TextInput";
import Loader from "../../Components/Loader";
import "./index.css";

function AddEditModal({
  setAddEditModal,
  setEmployeeTableLoader,
  empEditId,
  setEmpEditId,
}) {
  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.addOrEdit.employee);
  const addOrEditLoader = useSelector(
    (state) => state.addOrEdit.addOrEditLoading
  );
  const [editLoader, setEditLoader] = useState(false);
  const [employeeRegDetails, setEmployeeRegDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  });

  const [employeeRegError, setEmployeeRegError] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (empEditId) {
      dispatch(fetchSingleEmployee(empEditId, setEditLoader));
    }
  }, [empEditId]);

  useEffect(() => {
    if (empEditId && singleUser) {
      setEmployeeRegDetails({
        employeeId: singleUser.employeeId,
        fname: singleUser.fname,
        lname: singleUser.lname,
        email: singleUser.email,
        dob: formatDate(singleUser.dob),
        doj: formatDate(singleUser.doj),
        designation: singleUser.designation,
        experience: singleUser.experience,
        phoneNumber: singleUser.phoneNumber,
      });
    }
  }, [singleUser,empEditId]);

  useEffect(() => {
    return () => {
      setEmpEditId("");
      dispatch(removeSingleEmployee());
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dynamicInputHandler(event, setEmployeeRegDetails);
    validateField(name, value, setEmployeeRegError);
  };

  const handleEmpRegFormSubmit = (event) => {
    event.preventDefault();
    const isFormValid = validateForm(employeeRegDetails, setEmployeeRegError);
    if (isFormValid) {
      if (empEditId) {
        dispatch(
          updateEmployeeEdits(
            employeeRegDetails,
            setEmployeeTableLoader,
            setAddEditModal
          )
        );
      } else {
        dispatch(
          registerEmployee(
            employeeRegDetails,
            setEmployeeTableLoader,
            setAddEditModal
          )
        );
      }
    }
  };

  return editLoader ? (
    <Loader />
  ) : (
    <form className="add_edit_Form" onSubmit={handleEmpRegFormSubmit}>
      <h1>{empEditId ? "Edit Employee" : "Add Employee"}</h1>
      <div className="name_row">
        <TextInput
          label="First Name"
          name="fname"
          value={employeeRegDetails.fname}
          errorMessage={employeeRegError.fname}
          disabled={addOrEditLoader}
          statusIcon="true"
          onChange={handleInputChange}
        />
        <TextInput
          label="Last Name"
          name="lname"
          value={employeeRegDetails.lname}
          errorMessage={employeeRegError.lname}
          disabled={addOrEditLoader}
          statusIcon="true"
          onChange={handleInputChange}
        />
      </div>
      <div className="email_row">
        <TextInput
          label="Email Address"
          name="email"
          value={employeeRegDetails.email}
          errorMessage={employeeRegError.email}
          disabled={addOrEditLoader}
          statusIcon="true"
          onChange={handleInputChange}
        />
        <div className="dates_section">
          <TextInput
            label="Date of Birth"
            type="date"
            name="dob"
            value={employeeRegDetails.dob}
            errorMessage={employeeRegError.dob}
            disabled={addOrEditLoader}
            onChange={handleInputChange}
          />
          <TextInput
            label="Date Of Join"
            type="date"
            name="doj"
            value={employeeRegDetails.doj}
            errorMessage={employeeRegError.doj}
            disabled={addOrEditLoader}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="designation_row">
        <TextInput
          label="Designation"
          name="designation"
          value={employeeRegDetails.designation}
          errorMessage={employeeRegError.designation}
          disabled={addOrEditLoader}
          statusIcon="true"
          onChange={handleInputChange}
        />
        <div className="experience_phone_row">
          <TextInput
            label="Experience (in yrs)"
            name="experience"
            type="number"
            value={employeeRegDetails.experience}
            errorMessage={employeeRegError.experience}
            disabled={addOrEditLoader}
            statusIcon="true"
            onChange={handleInputChange}
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            value={employeeRegDetails.phoneNumber}
            errorMessage={employeeRegError.phoneNumber}
            disabled={addOrEditLoader}
            statusIcon="true"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form_button_group">
        <Button
          loading={addOrEditLoader}
          loaderClassName="small_loader"
          className="secondary_normal_button"
          type="submit"
        >
          {empEditId ? "Edit" : "Add"}
        </Button>
        <Button
          className="secondary_normal_button"
          onClick={() => setAddEditModal(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
export default AddEditModal;

