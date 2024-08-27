// App.tsx
import React from "react";
import {
  DirectionProvider,
  useDirectionsContext,
} from "../../providers/context/DirectionContext";
import DropdownComponent from "../Table/Dropdown/DropDown";
import {data} from "autoprefixer";
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";

const DirectionList = () => {
  const {data, isLoading, isError} = useDirectionsContext();

  if (isLoading) return <div>Loading directions...</div>;
  if (isError) return <div>Error loading directions.</div>;

  return (
    <>
      <Dropdown
        overlay={{
          data,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Click me
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

const DirectionDropDown = () => {
  return (
    <DirectionProvider>
      <DirectionList />
    </DirectionProvider>
  );
};

export default DirectionDropDown;
