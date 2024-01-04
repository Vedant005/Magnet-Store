import { useUser } from "../contexts/UserContext";

export const UserDetails =()=>{
    const {authState,userLogout}= useUser();


    return(
        <div className="user-class">

            <h1>{authState?.users?.firstName} {authState?.users?.lastName}</h1>
             <p>{authState?.users?.email}</p>

             <button onClick={userLogout} className="logout-btn">
            Logout
             </button>
        </div>
    )

    }