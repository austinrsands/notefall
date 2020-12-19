import { Box, Button, Tooltip } from '@material-ui/core';
import React from 'react';
import { Midi } from '@tonejs/midi';
import { StyleProps } from '../styles/style';

interface Props {
  onUpload?: (song: Midi) => void;
}

const UploadButton: React.FC<Props & StyleProps> = ({ className, style, onUpload }) => {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // Capture file
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    // Read to buffer
    const buffer = await file.arrayBuffer();

    // Create MIDI song
    const song = new Midi(buffer);

    // Replace song name with file name (minus extension) if necessary
    song.name = song.name ? song.name : file.name.split('.').slice(0, -1).join('.');

    if (onUpload) onUpload(song);

    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  return (
    <Box className={className} style={style}>
      <Tooltip title="Select song" enterDelay={500}>
        <Button color="primary" variant="contained" component="label">
          Upload
          <input
            type="file"
            accept="audio/midi, audio/x-midi"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default UploadButton;
