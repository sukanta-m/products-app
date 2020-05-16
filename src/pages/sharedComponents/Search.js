import React, {useState} from "react";
import { Input } from "antd";

const Search = ({
  onChange
}) => {
  const [searchTxt, setSearchTxt] = useState();
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTxt(value);
    onChange(value.trim());
  };

  return (
    <Input
      placeholder="Search by Name, Phone, Email, Order id"
      onChange={handleChange}
      value={searchTxt}
    />
  )
};

export default Search;