import React, { useEffect, useState } from 'react';
import { StyledButton } from '../ui-components/ButtonStyles';

export default function Footer(props) {
  const { data } = props;
  const [roverName, setRoverName] = useState(null);
  const [refreshRequired, setRefreshRequired] = useState(true);

  return (
    <footer>
      <div className="bgGradient"></div>
      <div>
        <h1>APOD PROJECT</h1>
        {roverName ? <h2>{roverName}</h2> : <h2>{data?.title}</h2>}
        {/* <StyledButton>Button</StyledButton> */}
      </div>
    </footer>
  );
}
