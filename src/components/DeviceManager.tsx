import React, { useCallback, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import WebMidi, {
  InputEventNoteoff,
  InputEventNoteon,
  InputEventSysex,
  WebMidiEventConnected,
  WebMidiEventDisconnected,
} from 'webmidi';
import { useAppContext } from '../contexts/AppContext';

const DeviceManager: React.FC = () => {
  const { appDispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  // Pops up device connection message
  const showConnectionSnackbar = useCallback(
    (inputName: string) => {
      enqueueSnackbar(`${inputName} connected`, {
        variant: 'success',
        preventDuplicate: true,
      });
    },
    [enqueueSnackbar],
  );

  // Pops up device disconnection message
  const showDisconnectionSnackbar = useCallback(
    (inputName: string) => {
      enqueueSnackbar(`${inputName} disconnected`, {
        variant: 'default',
        preventDuplicate: true,
      });
    },
    [enqueueSnackbar],
  );

  const handleConnection = useCallback(
    (event: WebMidiEventConnected) => {
      console.log('connection', event);
      showConnectionSnackbar(event.port.name);
    },
    [showConnectionSnackbar],
  );

  const handleDisconnection = useCallback(
    (event: WebMidiEventDisconnected) => {
      console.log('disconnection', event);
      showDisconnectionSnackbar(event.port.name);
    },
    [showDisconnectionSnackbar],
  );

  // Play note
  const handleNoteOn = useCallback(
    (event: InputEventNoteon) => {
      console.log('on', event);
      appDispatch({ type: 'play-note', note: event.note.number });
    },
    [appDispatch],
  );

  // Rest note
  const handleNoteOff = useCallback(
    (event: InputEventNoteoff) => {
      console.log('off', event);
      appDispatch({ type: 'rest-note', note: event.note.number });
    },
    [appDispatch],
  );

  const handleSysexMessage = (event: InputEventSysex) => {
    console.log('sysex', event);
  };

  // Sets up input devices
  useEffect(() => {
    WebMidi.enable((error) => {
      // Add note-on, note-off, and sysex listeners to inputs
      WebMidi.inputs.forEach((input) => {
        input.addListener('noteon', 'all', handleNoteOn);
        input.addListener('noteoff', 'all', handleNoteOff);
        input.addListener('sysex', 'all', handleSysexMessage);
      });

      // Add connection/disconnection listeners
      WebMidi.addListener('connected', handleConnection);
      WebMidi.addListener('disconnected', handleDisconnection);

      console.log('error', error);
    }, true);
  }, [handleConnection, handleDisconnection, handleNoteOff, handleNoteOn]);

  return <h1>Test</h1>;
};

export default DeviceManager;
