import { Select } from "antd";
import { useEffect, useState } from "react";
import { useDirectionsContext } from "../../providers";

const { Option } = Select;

export const DirectionSelect = ({ setDirection, value }) => {
  const { fetchAllDirection } = useDirectionsContext();

  return (
    <>
      <Select
        defaultValue="all"
        style={{ width: 200, marginRight: "8px" }}
        value={value}
        onChange={(e) => setDirection(e)}
      >
        <Option value="all">Toutes les Directions</Option>
        {fetchAllDirection.map((direction) => (
          <Option key={direction.id} value={direction.id}>
            {direction.name}
          </Option>
        ))}
      </Select>
    </>
  );
};
