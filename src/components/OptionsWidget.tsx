import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { StyleProps } from '../styles/style';
import OptionsButton from './OptionsButton';
import OptionsMenu from './OptionsMenu';

const OptionsWidget: React.FC<StyleProps> = ({ className, style }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Opens options menu
  const handleClick = () => {
    setIsMenuOpen(true);
  };

  // Closes options menu
  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <Box className={className} style={style}>
      <OptionsButton onClick={handleClick} />
      <OptionsMenu onClose={handleClose} open={isMenuOpen} />
    </Box>
  );
};

export default OptionsWidget;
