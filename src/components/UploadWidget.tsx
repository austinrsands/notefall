import { Box, makeStyles } from '@material-ui/core';
import { Midi } from '@tonejs/midi';
import clsx from 'clsx';
import React, { useState } from 'react';
import { StyleProps } from '../styles/style';
import UploadButton from './UploadButton';
import UploadLabel from './UploadLabel';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginLeft: '1.5rem',
  },
});

const UploadWidget: React.FC<StyleProps> = ({ className, style }) => {
  const classes = useStyles();
  const [text, setText] = useState<string>('no MIDI file uploaded');

  const handleUpload = (song: Midi) => {
    setText(song.name);
  };

  return (
    <Box className={clsx(classes.root, className)} style={style}>
      <UploadButton onUpload={handleUpload} />
      <UploadLabel className={classes.label} text={text} />
    </Box>
  );
};

export default UploadWidget;
