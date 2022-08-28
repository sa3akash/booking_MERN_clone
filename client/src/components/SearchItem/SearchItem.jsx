import React from 'react';
import { Link } from 'react-router-dom';
import "./SearchItem.css";

const SearchItem = ({hotel}) => {
  return (
    <div className='searchItemContainer'>
        <div className="searchImg">
            <img src={hotel.photos[0] || 'https://cf.bstatic.com/xdata/images/hotel/max500/109169996.jpg?k=82bee70e09800d9254479024406baebaf45c1482c6627ef44ee35e1df5110dc5&o=)'} alt="hotelImage" />
        </div>
        <div className="searchDesc">
            <Link to={`/hotels/${hotel._id}`}>
            <h1 className="searchTitle">{hotel.title}</h1>
            </Link>
            <span className="searchDistanceBeach">{hotel.distance}</span>
            <div className="SearchFeauture">
                <span className="searchF1">{hotel.name}</span>
                <span className="searchF3">Breakfast included</span>
                <span className="searchF4">Only 1 room left at this price on our site</span>
            </div>
        </div>
        <div className="searchDetail">
            {hotel.rating && (
                <div className="searchDetailTop">
                    <div className="searchScore">
                        <span className='reviesScore'>Review score</span>
                    </div>
                    <button className="searchScoreButton">{hotel.rating}</button>
                </div>
            )}
            
            <div className="searchDetailBottom">
                <h3>BDT {hotel.price}</h3>
                <span>+taxes and charges</span>
                <Link to={`/hotels/${hotel._id}`}>
                <button>See availability</button>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default SearchItem