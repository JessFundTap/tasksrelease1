import React from 'react';
import logoImage from '../assets/fundtap_logo_navy_green_(4).png';

export const Logo: React.FC = () => {
  return (
    <img
      src={logoImage}
      alt="FundTap"
      className="h-8"
    />
  );
};