import React from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import prod from "../../../assets/iphone.png";

interface SearchProps {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setShowSearch }) => {
  return (
    <div className="search-modal">
      <div className="form-field">
        <input type="text" autoFocus placeholder="Search for products" />
        <MdClose onClick={() => setShowSearch(false)} className="close-btn" />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          <div className="search-result-item">
            <div className="img-container">
              <img src={prod} alt="img" />
            </div>
            <div className="prod-details">
              <span className="name">Product name</span>
              <span className="desc">Product Description</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
