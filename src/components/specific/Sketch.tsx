import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useAppContext } from '../../contexts/AppContext';
import drawBackground from '../../drawing/background';
import drawKeyboard from '../../drawing/keyboard';
import Size from '../../interfaces/Size';
import Canvas, { CanvasProps } from '../generic/Canvas';
import Keyboard from '../../interfaces/Keyboard';
import generateKeyboard from '../../generators/keyboardGenerator';
import { NOTE_BLOCK_SCROLL_AMOUNT_TO_KEYBOARD_HEIGHT_RATIO } from '../../constants/noteBlocks';
import GameState from '../../enums/GameState';
import NoteGroup from '../../interfaces/NoteGroup';
import generateNoteGroup from '../../generators/noteGroupGenerator';
import drawNoteBlocks, {
  notesThatShouldBePlayedArePlayed,
} from '../../drawing/noteBlocks';
import GameMode from '../../enums/GameMode';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

const Sketch: React.FC<CanvasProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { appState, appDispatch } = useAppContext();
  const [size, setSize] = useState<Size | undefined>();

  const keyboard: Keyboard | null = useMemo(() => {
    if (size)
      return generateKeyboard(size, appState.keyboardType, appState.transpose);
    return null;
  }, [appState.keyboardType, appState.transpose, size]);

  const noteGroup: NoteGroup | null = useMemo(() => {
    if (appState.song && keyboard)
      return generateNoteGroup(appState.song, keyboard);
    return null;
  }, [appState.song, keyboard]);

  const handleResize = useCallback((canvasSize: Size) => {
    setSize(canvasSize);
  }, []);

  // Moves note blocks
  const updateProgress = useCallback(
    (deltaTime: number) => {
      if (noteGroup && keyboard) {
        // Determine how much to move noteblocks
        const amount =
          noteGroup.unitNoteBlockHeight * appState.tempoScale * deltaTime;

        // Get valid range of movement
        const { range } = noteGroup;

        // Move notes
        if (
          appState.gameMode === GameMode.Continuous ||
          notesThatShouldBePlayedArePlayed(
            noteGroup.noteBlocks,
            appState.notes,
            appState.progress,
            keyboard,
          )
        )
          appDispatch({ type: 'move', amount, range });
      }
    },
    [
      noteGroup,
      keyboard,
      appState.tempoScale,
      appState.gameMode,
      appState.notes,
      appState.progress,
      appDispatch,
    ],
  );

  // Gets called every frame
  const handleDraw = useCallback(
    (context: CanvasRenderingContext2D, deltaTime: number) => {
      // Draw background
      if (size) drawBackground(context, size);

      // Move note blocks
      if (appState.gameState === GameState.Playing) updateProgress(deltaTime);

      // Draw note blocks
      if (noteGroup && keyboard)
        drawNoteBlocks(
          context,
          noteGroup.noteBlocks,
          appState.notes,
          appState.progress,
          keyboard,
        );

      // Draw keyboard
      if (keyboard) drawKeyboard(context, keyboard.keys, appState.notes);
    },
    [
      appState.gameState,
      appState.notes,
      appState.progress,
      keyboard,
      noteGroup,
      size,
      updateProgress,
    ],
  );

  // Moves note blocks on scroll
  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLCanvasElement>) => {
      if (keyboard && noteGroup) {
        // Determine amount to increment progess
        const amount =
          Math.sign(event.deltaY) *
          keyboard.size.height *
          NOTE_BLOCK_SCROLL_AMOUNT_TO_KEYBOARD_HEIGHT_RATIO;

        // Get valid range of movement
        const { range } = noteGroup;

        appDispatch({ type: 'scroll', amount, range });
      }
    },
    [appDispatch, keyboard, noteGroup],
  );

  return (
    <Canvas
      className={clsx(classes.root, className)}
      onDraw={handleDraw}
      onResize={handleResize}
      onWheel={handleWheel}
      {...rest}
    />
  );
};

export default Sketch;
