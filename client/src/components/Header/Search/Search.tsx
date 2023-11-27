import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useSearchProduct } from "../../../api/GetApi";
import { useNavigate } from "react-router";

interface SearchProps {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setShowSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useSearchProduct(searchTerm);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
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
          data.map((product: any, index: number) => (
            <div
              className="search-result-item"
              key={index}
              onClick={() => {
                navigate(`/product/${product._id}`);
                window.scrollTo(0, 0);
                setShowSearch(false);
              }}
            >
              <div className="img-container">
                <img
                  src={`../../../../public/product/${
                    product.image.split("/")[2]
                  }`}
                  alt="img"
                />
              </div>
              <div className="prod-details">
                <span className="name">{product.name}</span>
                <span className="desc">{product.description}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
