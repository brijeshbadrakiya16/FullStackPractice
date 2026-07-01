import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const {cloudinaryImageId,name,areaName,avgRating,cuisines,costForTwo,deliveryTime} = props.resData;
  return(
    <>
        <div className="res-card">
            <img className='res-logo' alt="res-logo" src={CDN_URL+cloudinaryImageId}/>
            <h3 style={{justifySelf:"center"}}>{name} - {areaName}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} *</h4>
            <h4>{String(costForTwo).toUpperCase()}</h4>
            <h4>{deliveryTime} min</h4>
        </div>
    </>
  );
};
export default RestaurantCard;