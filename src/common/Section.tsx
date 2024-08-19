import React, { ReactNode, useState } from "react";

// Components
import SectionHeader from "./SectionHeader";
// CSS
import "./Section.css";

interface SectionProps {
  id: string,
  // The main title of the section
  title: string;
  // This is the second-level title of the section
  subtitle: string;
  // 'src' for the icon showed in the left side of the section
  iconSrc: string;
  // 'alt' for the icon
  iconAlt: string;
  // Whether the action should start open or not
  defaultOpen?: boolean;
  // The actual content of the section
  children: ReactNode;
}

function Section({ children, id, defaultOpen, ...headerProps }: SectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen || false);

  return (
    <section id={id} className="section">
      <SectionHeader {...headerProps} isSectionOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <div className={`section-content ${isOpen ? "open" : "closed"}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;
