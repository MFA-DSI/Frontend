// SearchBar.tsx
import React, {useState} from "react";
import {AutoComplete, Input, Button, Dropdown, Menu} from "antd";
import type {AutoCompleteProps} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const SearchBar: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  const handleButtonClick = () => {
    console.log("Search button clicked with value:", searchValue);
    // You can implement any additional search logic here
  };

  return (
    <div style={styles.searchWrapper}>
      <AutoComplete
        popupMatchSelectWidth={252}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        style={styles.autoComplete}
      >
        <Input
          placeholder="Rechercher..."
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={styles.input}
        />
      </AutoComplete>
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={handleButtonClick}
        style={styles.button}
      >
        Rechercher
      </Button>
    </div>
  );
};

const styles = {
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d9d9d9",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "0 0px",
    width: "400px",
  },
  autoComplete: {
    flex: 1,
  },
  input: {
    border: "none",
  },
  button: {
    borderRadius: "0",
  },
};

export default SearchBar;
