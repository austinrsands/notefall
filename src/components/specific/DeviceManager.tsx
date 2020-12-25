import React, { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import WebMidi, {
  InputEventNoteoff,
  InputEventNoteon,
  WebMidiEventConnected,
  WebMidiEventDisconnected,
} from 'webmidi';
import { useAppContext } from '../../contexts/AppContext';
import SimpleBackdrop from './SimpleBackdrop';

const DeviceManager: React.FC = () => {
  const { appDispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isBlocked, setIsBlocked] = useState(false);

  // Alert user that device has been connected
  const showConnectionSnackbar = useCallback(
    (inputName: string) => {
      enqueueSnackbar(`${inputName} connected`, {
        variant: 'success',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 2000,
      });
    },
    [enqueueSnackbar],
  );

  // Alert user that device has been disconnected
  const showDisconnectionSnackbar = useCallback(
    (inputName: string) => {
      enqueueSnackbar(`${inputName} disconnected`, {
        variant: 'warning',
        preventDuplicate: true,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 2000,
      });
    },
    [enqueueSnackbar],
  );

  // Play note
  const handleNoteOn = useCallback(
    (event: InputEventNoteon) => {
      appDispatch({ type: 'play-note', note: event.note.number });
    },
    [appDispatch],
  );

  // Rest note
  const handleNoteOff = useCallback(
    (event: InputEventNoteoff) => {
      appDispatch({ type: 'rest-note', note: event.note.number });
    },
    [appDispatch],
  );

  // Sets up input device
  const handleConnection = useCallback(
    (event: WebMidiEventConnected) => {
      if (event.port.type === 'input') {
        const input = event.port;
        input.addListener('noteon', 'all', handleNoteOn);
        input.addListener('noteoff', 'all', handleNoteOff);
        showConnectionSnackbar(event.port.name);
      }
    },
    [handleNoteOff, handleNoteOn, showConnectionSnackbar],
  );

  // Disconnects input device
  const handleDisconnection = useCallback(
    (event: WebMidiEventDisconnected) => {
      if (event.port.type === 'input') {
        showDisconnectionSnackbar(event.port.name);
      }
    },
    [showDisconnectionSnackbar],
  );

  // Sets up input devices
  useEffect(() => {
    WebMidi.enable((error?: Error) => {
      // Check if MIDI access is blocked
      if (error) {
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
        WebMidi.addListener('connected', handleConnection);
        WebMidi.addListener('disconnected', handleDisconnection);
      }
    }, true);
  }, [handleConnection, handleDisconnection]);

  return isBlocked ? (
    <SimpleBackdrop
      open
      title="MIDI access blocked"
      subtitle="enable full control of MIDI devices to use a keyboard"
    />
  ) : null;
};

export default DeviceManager;
