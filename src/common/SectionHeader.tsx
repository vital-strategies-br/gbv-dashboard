import React from "react";
import "./SectionHeader.css";

type SectionHeaderProps = {
  // The main title of the section
  title: string;
  // This is the second-level title of the section
  subtitle: string;
  // 'src' for the icon showed in the left side of the section
  iconSrc: string;
  // 'alt' for the icon
  iconAlt: string;
};

function SectionHeader({
  title,
  subtitle,
  iconSrc,
  iconAlt,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header-content content">
        <img src={iconSrc} alt={iconAlt} data-testid="section-header-item" />
        <div className="section-header-text">
          <h3   data-testid="section-header-item">{title}</h3>
          <span data-testid="section-header-item">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

export default SectionHeader;
