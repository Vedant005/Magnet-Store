import { useUser } from "../contexts/UserContext";
import { Header } from "./Header";

export const UserDetails =()=>{
    const {authState,userLogout}= useUser();


    return(
        <div className="user-class">
          <Header/>
            <h1>{authState?.user?.firstName} {authState?.user?.lastName}</h1>
             <p>{authState?.user?.email}</p>

             <button onClick={userLogout} className="logout-btn">
               Logout
             </button>
        </div>
    )

    }