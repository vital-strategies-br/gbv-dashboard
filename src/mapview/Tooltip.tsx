import React from "react";

import useMousePosition from "../hooks/useMousePosition";
import { TooltipProps } from "./types";
import { formatPercentage } from "./utils";
// CSS
import "./Tooltip.css";

function Tooltip({ data }: TooltipProps) {
  const mousePosition = useMousePosition();

  if (!mousePosition) return null;

  return (
    <div
      className="tooltip-box"
      style={{
        top: mousePosition.y + 20,
        left: mousePosition.x + 20,
      }}
    >
      <h4 className="tooltip-title">{data.name}</h4>
      <div className="tooltip-data">
        Taxa de subnotificação:{" "}
        <strong>{formatPercentage(data.subnotification_rate)}</strong>
      </div>
      <div className="tooltip-data">
        Categoria: <strong>{data.category || "n.d."}</strong>
      </div>
    </div>
  );
}

export default Tooltip;
