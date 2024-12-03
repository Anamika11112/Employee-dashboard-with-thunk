import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "./dashboardSlice";
import DashboardMainData from "./DashboardMainData/index.jsx";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal/index.jsx";
import AddEditModal from "../AddEditModal";
import DeleteModal from "../DeleteModal";
import Loader from "../../Components/Loader/index.jsx";
import "./index.css";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employeeTableLoader, setEmployeeTableLoader] = useState(false);
  const [addEditModal, setAddEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState("");
  const [empTodelete, setEmpToDelete] = useState("");
  const [empEditId, setEmpEditId] = useState("");
  useEffect(() => {
    dispatch(fetchEmployees(setEmployeeTableLoader));
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="dashboard_container">
      <header className="dashboard_header">
        <div className="dashboard_header_content">
          <h5>Employee Dashboard</h5>
          <div className="dashboard_header_button_group">
            <Button
              className="secondary_button"
              onClick={() => setAddEditModal(true)}
            >
              Add Employee
            </Button>
            <Button className="tertiary_button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <h4 className="dashboard_main_heading">
          Welcome to Employee Dashboard
        </h4>
      </header>
      {deleteModal && (
        <Modal
          modalClassName="deleteModal"
          overlayClassName="deleteModalOverlay"
          onClick={() => setDeleteModal(false)}
        >
          <DeleteModal
            setDeleteModal={setDeleteModal}
            setEmployeeTableLoader={setEmployeeTableLoader}
            empTodelete={empTodelete}
            employeeIdToDelete={employeeIdToDelete}
          />
        </Modal>
      )}

      {addEditModal && (
        <Modal
          modalClassName="addEditModal"
          overlayClassName="addEditModalOverlay"
          onClick={() => setAddEditModal(false)}
        >
          <AddEditModal
            setAddEditModal={setAddEditModal}
            setEmployeeTableLoader={setEmployeeTableLoader}
            empEditId={empEditId}
            setEmpEditId={setEmpEditId}
         
          />
        </Modal>
      )}
      {employeeTableLoader ? (
        <Loader />
      ) : (
        <DashboardMainData
          setAddEditModal={setAddEditModal}
          setDeleteModal={setDeleteModal}
          setEmpToDelete={setEmpToDelete}
          setEmployeeIdToDelete={setEmployeeIdToDelete}
          setEmpEditId= {setEmpEditId}
        />
      )}

      <Toaster />
    </div>
  );
}

export default Dashboard;
