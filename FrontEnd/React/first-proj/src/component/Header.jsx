import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { removeData, updateName } from "../utils/loginSlice";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");

    // const data = useContext(UserContext);

    // here we are subscribing to the store using selector
    const login = useSelector((store)=>store.login);
    const dispatch = useDispatch();

    return (
        <>
            <div className='header'>
                <div className='logo-container'>
                    <img className='logo' src={LOGO_URL} />
                </div>
                <div className='nav-items'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link >Cart</Link></li>
                        <button className="auth-btn" onClick={() => { 
                            if(btnName === "Login"){
                                setBtnName("Logout");
                                dispatch(updateName("Brijesh"));
                            }else{
                                setBtnName("Login");
                                dispatch(removeData());
                            }

                            //dispatch an action;

                        }}>{btnName}</button>
                        <li style={{ fontWeight: "bold" }}>
                            {login.name === "visitor" ? "Anonymous" : login.name}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Header;