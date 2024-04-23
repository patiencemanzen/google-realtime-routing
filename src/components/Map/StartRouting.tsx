import React from 'react';

interface StartRoutingProps {
  onClick: () => void;
}

const StartRouting: React.FC<StartRoutingProps> = ({ onClick }) => (
  <button onClick={onClick} className='bg-blue-500 py-2 px-4 rounded-lg text-white font-bold'>Start Routing</button>
);

export default StartRouting;