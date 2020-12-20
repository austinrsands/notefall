import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import StyleProps from '../interfaces/StyleProps';
import OptionsButton from './OptionsButton';
import OptionsMenu from './OptionsMenu';

const OptionsWidget: React.FC<StyleProps> = (props) => {
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
    <Box {...props}>
      <OptionsButton onClick={handleClick} />
      <OptionsMenu onClose={handleClose} open={isMenuOpen} />
    </Box>
  );
};

export default OptionsWidget;
