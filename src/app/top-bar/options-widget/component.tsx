import React, { useState } from 'react';
import { Box, BoxProps } from '@material-ui/core';
import OptionsButton from '../options-button/component';
import OptionsMenu from '../../options-menu/component';

const OptionsWidget: React.FC<BoxProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(true);
  };

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
