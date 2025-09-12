import React from 'react';
import { VintageRetroCourt } from './vintage-retro-court';

interface ProfilePictureCompositionProps {
  concept?: 'vintage-retro-court';
  size?: number;
}

export const ProfilePictureComposition: React.FC<ProfilePictureCompositionProps> = ({ 
  concept = 'vintage-retro-court',
  size = 400 
}) => {
  return <VintageRetroCourt size={size} />;
};
