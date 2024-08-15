import React from "react";

// Icons
import Collapse from "../icons/collapse.svg";
import Expand from "../icons/expand.svg";
// CSS
import "./SectionHeader.css";

export interface SectionHeaderProps {
  // The main title of the section
  title: string;
  // This is the second-level title of the section
  subtitle: string;
  // 'src' for the icon showed in the left side of the section
  iconSrc: string;
  // 'alt' for the icon
  iconAlt: string;
  // Whether the section of this header is open. Changes icons.
  isSectionOpen: boolean;
  // Captures click on the header
  onClick: () => void;
}

function SectionHeader({
  title,
  subtitle,
  iconSrc,
  iconAlt,
  isSectionOpen,
  onClick,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header-content content">
        <img src={iconSrc} alt={iconAlt} className="section-header-icon" data-testid="section-header-item" />
        <div className="section-header-text">
          <h3 data-testid="section-header-item">{title}</h3>
          <span data-testid="section-header-item">{subtitle}</span>
        </div>
        <img
          src={isSectionOpen ? Collapse : Expand}
          alt={`${isSectionOpen ? "Collapse" : "Expand"} section`}
          className="section-header-action-icon"
          onClick={onClick}
        />
      </div>
    </div>
  );
}

export default SectionHeader;
