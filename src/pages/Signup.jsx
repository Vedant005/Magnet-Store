import { useNavigate } from "react-router-dom";
// import { useUser } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { useUser } from "../contexts/userContext";

export default function Signup() {
  const { signup } = useContext(useUser);

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signupHandler = (e) => {
    e.preventDefault();
    if (
      !userDetails?.firstName.trim() ||
      !userDetails?.lastName.trim() ||
      !userDetails?.email.trim() ||
      !userDetails?.password.trim() ||
      !userDetails?.confirmPassword.trim()
    ) {
      <dialog open>
        <p>Enter valid input!</p>
        <form method="dialog">
          <button>CLOSE</button>
        </form>
      </dialog>;
    } else if (userDetails?.password !== userDetails?.confirmPassword) {
      <dialog open>
        <p>Enter valid input!</p>
        <form method="dialog">
          <button>CLOSE</button>
        </form>
      </dialog>;
    } else {
      signup(userDetails);
    }
  };

  return (
    <div>
      <Header />
      <h1>Signup</h1>
      <div className="signup-container">
        <div className="name">
          <div>
            <label for="first-name">First Name</label>
            <input
              id="first-name"
              placeholder="John"
              required
              value={userDetails.firstName}
              onChange={(e) =>
                setUserDetails((user) => ({
                  ...user,
                  firstName: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div>
          <label for="last-name">Last Name</label>
          <input
            id="last-name"
            placeholder="Clinton"
            required
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails((user) => ({
                ...user,
                lastName: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label for="email">Email</label>
          <input
            id="email"
            placeholder="john@gmail.com"
            required
            type="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails((user) => ({
                ...user,
                email: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label for="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type="password"
              placeholder="**********"
              minlength="4"
              maxlength="8"
              required
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((user) => ({
                  ...user,
                  password: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div>
          <label for="confirm-password">Confirm Password</label>
          <div className="password-wrapper">
            <input
              id="confirm-password"
              type="password"
              placeholder="********"
              required
              value={userDetails.confirmPassword}
              onChange={(e) =>
                setUserDetails((user) => ({
                  ...user,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <button type="submit" onClick={signupHandler} className="signup-button">
          Signup
        </button>

        <p onClick={() => navigate("/login")}>Already Have a acoount?</p>
      </div>
    </div>
  );
}
