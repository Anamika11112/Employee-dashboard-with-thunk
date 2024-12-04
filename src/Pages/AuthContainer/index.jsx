import React from "react";
import Button from "../../Components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Registration from "../Registration";
import Login from "../Login";
import "./index.css";
function AuthContainer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  const handleButtonClick = () => {
    if (isLoginPage) {
      navigate('/registration');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="auth_background">
      <div className="auth_main_container">
        <div className="auth_container_left">
          <h1>INFORMATION</h1>
          <div className="auth_left_contentpara">
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              A diam sollicitudin tempor id eu nisl nunc. Ac tincidunt vitae
              semper quis lectus nulla at volutpat.
            </p>
          </div>
          <Button className="primary_white_button" onClick={handleButtonClick}>
            {isLoginPage ? "Register Here" : "Have an Account?"}
          </Button>
        </div>
        <div className="auth_container_right">
        {isLoginPage ? <Login/> :<Registration/> }
        </div>
      </div>
    </div>
  );
}
export default AuthContainer;