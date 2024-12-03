import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../../../Components/TextInput";
import Button from "../../../Components/Button";
import { formatDate } from "../../../Helpers/Utilities";
import toast from "react-hot-toast";
import "./index.css";
function DashboardMainData({
  setAddEditModal,
  setDeleteModal,
  setEmpToDelete,
  setEmployeeIdToDelete,
  setEmpEditId,
}) {
  const employeeList = useSelector((state) => state.dashboard.employeeList);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    setFilteredEmployees(employeeList);
  }, [employeeList]);

  const handleEmpDelete = (empNameToDelete, empId) => {
    setDeleteModal(true);
    setEmpToDelete(empNameToDelete);
    setEmployeeIdToDelete(empId);
  };
  const handleEmpEdit = (empId) => {
    setAddEditModal(true);
    setEmpEditId(empId);
  };
  const searchInputHandler = (event) => {
    if (event.target.value === "") setFilteredEmployees(employeeList);
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const filtered = employeeList.filter((employee) => {
      const fullName = `${employee.fname} ${employee.lname}`.toLowerCase();
      const designation = employee.designation.toLowerCase();
      const email = employee.email.toLowerCase();
      return (
        fullName.includes(query) ||
        designation.includes(query) ||
        email.includes(query)
      );
    });
    if (filtered.length <= 0) {
      toast.error("No Search results");
    }
    setFilteredEmployees(filtered);
  };
  return (
    <div className="dashboard">
      <div className="emp_search_row">
        <TextInput
          name="searchQuery"
          placeholder="Search for employee name email or designation"
          onChange={(event) => searchInputHandler(event)}
        />
        <Button className="tertiary_button" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <table className="employee_table">
        <thead className="dashboard_table_header">
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Date Of Join</th>
            <th>Email Address</th>
            <th>Date Of Birth</th>
            <th>Phone Number</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{`${employee.fname} ${employee.lname}`}</td>
              <td>{employee.designation}</td>
              <td>{formatDate(employee.doj)}</td>
              <td>{employee.email}</td>
              <td>{formatDate(employee.dob)}</td>
              <td>{employee.phoneNumber}</td>
              <td
                onClick={() => handleEmpEdit(employee.employeeId)}
                className="action_controls"
              >
                <p>Edit</p>
              </td>
              <td
                onClick={() =>
                  handleEmpDelete(
                    `${employee.fname} ${employee.lname}`,
                    employee.employeeId
                  )
                }
                className="action_controls"
              >
                <p>Delete</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DashboardMainData;