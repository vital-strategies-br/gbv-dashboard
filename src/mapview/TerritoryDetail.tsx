import React from "react";

import { TerritoryDetailProps } from "./types";

function TerritoryDetail({ data }: TerritoryDetailProps) {
    return <p>{data.name}</p>;
}

export default TerritoryDetail;
