import React from 'react';

interface StartRoutingProps {
  onClick: () => void;
}

const StartRouting: React.FC<StartRoutingProps> = ({ onClick }) => (
  <button onClick={onClick}>Start</button>
);

export default StartRouting;