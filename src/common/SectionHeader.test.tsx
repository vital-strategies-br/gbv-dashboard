import React from "react";
import { render, screen } from "@testing-library/react";
import SectionHeader from "./SectionHeader";

test("renders title, subtitle, and icon in the correct order", () => {
  const title = "This is a title";
  const subtitle = "and this is a subtitle";
  const iconSrc = "../icons/demographic.svg";
  const iconAlt = "finally, the icon alt";

  render(
    <SectionHeader
      title={title}
      subtitle={subtitle}
      iconSrc={iconSrc}
      iconAlt={iconAlt}
      isSectionOpen={true}
      onClick={() => alert()}
    />
  );

  const titleElement = screen.getByText(title);
  const subtitleElement = screen.getByText(subtitle);
  const iconElement = screen.getByAltText(iconAlt); // Assuming the icon has an alt text

  expect(titleElement).toBeInTheDocument();
  expect(subtitleElement).toBeInTheDocument();
  expect(iconElement).toBeInTheDocument();

  // Check the order of appearance
  const elements = screen.getAllByTestId('section-header-item');

  expect(elements[0]).toBe(iconElement);
  expect(elements[1]).toBe(titleElement);
  expect(elements[2]).toBe(subtitleElement);
});
