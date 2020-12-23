import React from 'react';
import { Button } from '@material-ui/core';
import { Midi } from '@tonejs/midi';
import { useAppContext } from '../../contexts/AppContext';
import StyleProps from '../../interfaces/StyleProps';

interface Props {
  disabled?: boolean;
}

const UploadButton: React.FC<Props & StyleProps> = ({ disabled, ...rest }) => {
  const { appDispatch } = useAppContext();

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
    event.target.value = '';
  };

  return (
    <Button
      color="primary"
      variant="contained"
      component="label"
      disabled={disabled}
      {...rest}
    >
      Upload
      <input
        type="file"
        accept="audio/midi, audio/x-midi"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </Button>
  );
};

export default UploadButton;
