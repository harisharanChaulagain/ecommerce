import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import prod from "../../../assets/iphone.png";
import { useSearchProduct } from "../../../api/GetApi";

interface SearchProps {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setShowSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useSearchProduct(searchTerm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    console.log("Data from API to check:", data);
  }, [data]);

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search for products"
          onChange={handleInputChange}
        />
        <MdClose onClick={() => setShowSearch(false)} className="close-btn" />
      </div>
      <div className="search-result-content">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((product: any) => (
            <div className="search-results">
              <div className="search-result-item">
                <div className="img-container">
                  <img src={prod} alt="img" />
                </div>
                <div className="prod-details">
                  <span className="name">{product.name}</span>
                  <span className="desc">{product.description}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
