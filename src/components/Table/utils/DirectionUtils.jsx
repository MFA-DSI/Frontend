import React, { useEffect } from "react";
import { useDirectionsContext } from "../../../providers";

export const DirectionName = () => {
  const { fetchActualDirectionName } = useDirectionsContext();
  const name = fetchActualDirectionName?.data?.name || "Chargement...";

  useEffect(() => {}, [name]);

  return (
    <div style={{ paddingTop: "5px" }}>
      <h2>La direction : {name}</h2>
    </div>
  );
};
