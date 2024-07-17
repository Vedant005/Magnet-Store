import { useContext } from "react";
import { Header } from "./Header";
import { AuthContext } from "../contexts/authContext";

export const UserDetails = () => {
  const { authState, userLogout } = useContext(AuthContext);
  return (
    <div className="user-class">
      <Header />
      <h1>
        {authState?.user?.firstName} {authState?.user?.lastName}
      </h1>
      <p>{authState?.user?.email}</p>

      <button onClick={userLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};
