import React from 'react';
import styled from 'styled-components';

// This styled-component defines all the visual properties of the box.
const BoxContainer = styled.div`
  width: 100%;
  height: 94vh;
  background-color: #ffffff; /* Sets the background to white */
  border-radius: 15px; /* Rounds the corners */
  
  /* Adds a subtle shadow to give it some depth.
    - 0px horizontal offset
    - 4px vertical offset
    - 12px blur radius
    - A very light black color (rgba(0, 0, 0, 0.05)) for the shadow
  */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto; /* Add this line to enable vertical scrolling when content overflows */
  
  /* Optional: Add some padding so content doesn't touch the edges */
  padding: 20px;
  box-sizing: border-box; /* Ensures padding is included in the total width/height */
  margin: 3vh 2vh 2vh 0vh;
  outline: 2px solid black
`;

/**
 * A simple container component that renders a white box with a
 * specified size, border-radius, and a subtle shadow.
 * It accepts children to render any content inside it.
 */
const MainAdminContainer = ({ children }) => {
  return (
    <BoxContainer>
      {children}
    </BoxContainer>
  );
};

export default MainAdminContainer;