import { useEffect , useState } from "react";
import Shimmer from "./Shimmer";
import axios from "axios";

const RestaurantMenu = () => {

    const [resInfo,setResInfo] = useState(null);

    const fetchMenu = async () => {
        // lat = 12.9351929 & lng = 77.62448069999999
        const data = await axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=10582&submitAction=ENTER`);
        // const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&submitAction=ENTER`);
        console.log(data);
        const json = await data.json();
        console.log(json);
        // setResInfo(json.data);
    }

    useEffect(()=>{
        fetchMenu();
    },[]);

    return resInfo=== null ? <Shimmer/> : (
        <div className="menu">
            <h1>Name of the Restaurant</h1>
            <h2>Menu</h2>
            <ul>
                <li>Biryani</li>
                <li>Burgers</li>
                <li>Diet Coke</li>
            </ul>
        </div>
    );
};

export default RestaurantMenu;