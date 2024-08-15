import React from "react";

import useMousePosition from "../hooks/useMousePosition";
import { TooltipProps } from "./types";

import "./Tooltip.css";

function asPercentageString(float: Nullable<number>) {
    if (!float) return "";
    return (float * 100).toFixed(2) + "%"
}

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
            <div className="tooltip-data">Taxa de subnotificação: <strong>{asPercentageString(data.subnotification_rate) || "n.d."}</strong></div>
            <div className="tooltip-data">Categoria: <strong>{data.category || "n.d."}</strong></div>
        </div>
    )
}

export default Tooltip;