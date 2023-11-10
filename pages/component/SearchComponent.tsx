import { Typography } from "antd";
import React from "react";

const SearchComponent = ({ item }) => {
  console.log(item, "item")
  const { Text, Title } = Typography;
  return (
    <div>
      <div>
        <Title>{item?.title}</Title>
      </div>
      <div>
        <Text>{item?.abstract}</Text>
      </div>
    </div>
  );
};

export default SearchComponent;
