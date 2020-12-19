import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { Midi } from '@tonejs/midi';
import { StyleProps } from '../styles/style';
import { useAppContext } from '../contexts/AppContext';

const UploadButton: React.FC<StyleProps> = ({ className, style }) => {
  const { appDispatch } = useAppContext();

  // Convert uploaded file to MIDI object and send to context
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Capture file
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    // Read to buffer
    const buffer = await file.arrayBuffer();

    // Create MIDI song
    const song = new Midi(buffer);

    // Replace song name with file name (minus extension) if necessary
    song.name = song.name
      ? song.name
      : file.name.split('.').slice(0, -1).join('.');

    // Send song to context
    appDispatch({ type: 'upload', song });

    // Allow same file to be uploaded again
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  return (
    <Tooltip
      className={className}
      style={style}
      title="Select song"
      enterDelay={500}
    >
      <Button color="primary" variant="contained" component="label">
        Upload
        <input
          type="file"
          accept="audio/midi, audio/x-midi"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </Button>
    </Tooltip>
  );
};

export default UploadButton;
