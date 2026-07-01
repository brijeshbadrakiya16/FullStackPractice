import RestaurantCard from './RestaurantCard';
import { resList } from '../utils/mockData';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';

const Body = () => {

  const [lastFetchedData, setLastFetchedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [listData, setListData] = useState([]);
  const [lat, setLat] = useState(12.9351929);
  const [lng, setLng] = useState(77.62448069999999);

  const fetchData = async () => {
    // lat = 12.9351929 & lng = 77.62448069999999
    const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`);
    const json = await data.json();
    const simpleData = [];
    json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map((x) => {
      simpleData.push({
        id: x.info.id,
        cloudinaryImageId: x.info.cloudinaryImageId,
        name: x.info.name,
        areaName: x.info.areaName,
        avgRating: x.info.avgRating,
        cuisines: x.info.cuisines,
        costForTwo: x.info.costForTwo,
        deliveryTime: x.info.sla.deliveryTime
      });
    });
    setListData(simpleData);
    setLastFetchedData(simpleData);
    // console.log(simpleData);

    // await updateData(json.csrfToken);
    // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
  };

  // because continously getting just 202 which shows that your request is on still under processing, this can not be done 
  // const updateData = async (csrf) => {
  //   const payload = {
  //     "filter": {},
  //     "lat": lat,
  //     "lng": lng,
  //     "page_type": "DESKTOP_WEB_LISTING",
  //     "_csrf":csrf
  //   };
  //   let data = await fetch('https://www.swiggy.com/dapi/restaurants/list/update', {
  //     method: "POST",
  //     body: JSON.stringify(payload),
  //     keepalive: true,
  //   });
  //   console.log(data);
  //   // data = await data.json();
  //   // console.log(data);
  // }

  // https://www.swiggy.com/dapi/restaurants/list/update - POST
  // PayLoad below
  // const json = {
  //   "lat": lat,
  //   "lng": lng,
  //   "page_type": "DESKTOP_WEB_LISTING",
  // }

  // menu api
  // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&submitAction=ENTER


  useEffect(() => {
    fetchData();
    console.log("USE EFFECT")
  }, [lat, lng]);

  return (
    <>
      <div className='Body'>
        <div className='search'>
          <input type='text' value={searchText} className='searchField' onChange={(e) => { setSearchText(e.target.value) }} />
          <button className='search-btn' onClick={() => {
            searchText.length == 0 ? setListData(lastFetchedData) : setListData(lastFetchedData.filter(x => String(x.name).toLowerCase().includes(searchText.toLowerCase())));
          }}>Search</button>
        </div>
        <div className="filter">
          <div className="filter1">
            <button className="filter-btn" onClick={() => setListData(lastFetchedData)}>ALL</button>
            <button className="filter-btn" onClick={() => setListData(listData.filter(x => x.avgRating >= 4))}>Top rated Restaurants</button>
          </div>
          <div className="filter2">
            <button className="filter-btn" onClick={() => setListData([...listData].sort((x, y) => Number(y.costForTwo.slice(1, 4)) - Number(x.costForTwo.slice(1, 4))))}>Sort By Price High</button>
            <button className="filter-btn" onClick={() => setListData([...listData].sort((x, y) => Number(x.costForTwo.slice(1, 4)) - Number(y.costForTwo.slice(1, 4))))}>Sort By Price Low</button>
            <button className="filter-btn" onClick={() => setListData([...listData].sort((x, y) => x.deliveryTime - y.deliveryTime))}>Sort By Fastest Delivery</button>
          </div>
        </div>
        <div className="filter">
          <div className="filter1">
            <button className="filter-btn2" onClick={() => {
              navigator.geolocation.getCurrentPosition((position) => {
                setListData([]);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
              }, () => {
                alert("Unable to fetch Location.");
                setListData([]);
                setLat(22.978677164087557);
                setLng(72.61086000405456);
              })
            }}>YourLocation</button>
            <button className="filter-btn2" onClick={() => {
              setListData([]);
              setLat(23.0226822410283);
              setLng(72.54123047711981);
            }}>Nehrunagar</button>
          </div>
          <div className="filter2">
            <button className="filter-btn2" onClick={() => {
              setListData([]);
              setLat(21.170240);
              setLng(72.831062);
            }}>Surat</button>
            <button className="filter-btn2" onClick={() => {
              setListData([]);
              setLat(19.076090);
              setLng(72.877426);
            }}>Mumbai</button>
            <button className="filter-btn2" onClick={() => {
              setListData([]);
              setLat(12.9629);
              setLng(77.5775);
            }}>Bengaluru</button>
            <button className="filter-btn2" onClick={() => {
              setListData([]);
              setLat(28.7041);
              setLng(77.1025);
            }}>Delhi</button>
          </div>
        </div>
        {listData.length === 0 || lastFetchedData.length == 0 ? (
          <Shimmer />
        ) : (
          <div className='res-container'>
            {
              listData.map((x) => {
                return <RestaurantCard
                  key={x.id}
                  resData={x}
                />
              })
            }
          </div>
        )}
      </div>
    </>
  );
};

export default Body;