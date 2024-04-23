import React from 'react';

interface CancelRoutingProps {
  onClick: () => void;
}

const CancelRouting: React.FC<CancelRoutingProps> = ({ onClick }) => (
  <button onClick={onClick} className='bg-red-500 py-2 px-4 rounded-lg text-white font-bold'>Cancel Routing</button>
);

export default CancelRouting;