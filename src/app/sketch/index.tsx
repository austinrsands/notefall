import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { drawBackground } from './background/drawing';
import { drawKeyboard } from './keyboard/drawing';
import { generateKeyboard } from './keyboard/generators';
import { Keyboard } from './keyboard/structures';
import { NOTE_BLOCK_SCROLL_AMOUNT_TO_KEYBOARD_HEIGHT_RATIO } from './note-blocks/constants';
import { drawNoteBlocks } from './note-blocks/drawing';
import { generateNoteGroup } from './note-blocks/generators';
import { notesThatShouldBePlayedArePlayed } from './note-blocks/helpers';
import { NoteGroup } from './note-blocks/structures';
import { Size } from '../../util/structures';
import Canvas, { CanvasProps } from '../../generic/canvas';
import { useGameContext } from '../game-context';
import { GameMode } from '../game-context/structures';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

const Sketch: React.FC<CanvasProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { gameState, gameDispatch } = useGameContext();
  const [size, setSize] = useState<Size | undefined>();

  const keyboard: Keyboard | null = useMemo(() => {
    if (size)
      return generateKeyboard(
        size,
        gameState.keyboardType,
        gameState.transpose,
      );
    return null;
  }, [gameState.keyboardType, gameState.transpose, size]);

  const noteGroup: NoteGroup | null = useMemo(() => {
    if (gameState.song && keyboard)
      return generateNoteGroup(gameState.song, keyboard);
    return null;
  }, [gameState.song, keyboard]);

  const handleResize = useCallback((canvasSize: Size) => {
    setSize(canvasSize);
  }, []);

  // Moves note blocks
  const updateProgress = useCallback(
    (deltaTime: number) => {
      if (noteGroup && keyboard) {
        // Determine how much to move noteblocks
        const amount =
          noteGroup.unitNoteBlockHeight * gameState.tempoScale * deltaTime;

        // Get valid range of movement
        const { range } = noteGroup;

        // Move notes
        if (
          gameState.mode === GameMode.Continuous ||
          notesThatShouldBePlayedArePlayed(
            noteGroup.noteBlocks,
            gameState.notes,
            gameState.progress,
            keyboard,
          )
        )
          gameDispatch({ type: 'move', amount, range });
      }
    },
    [
      noteGroup,
      keyboard,
      gameState.tempoScale,
      gameState.mode,
      gameState.notes,
      gameState.progress,
      gameDispatch,
    ],
  );

  // Gets called every frame
  const handleDraw = useCallback(
    (context: CanvasRenderingContext2D, deltaTime: number) => {
      // Draw background
      if (size) drawBackground(context, size);

      // Move note blocks
      if (gameState.isPlaying) updateProgress(deltaTime);

      // Draw note blocks
      if (noteGroup && keyboard)
        drawNoteBlocks(
          context,
          noteGroup.noteBlocks,
          gameState.notes,
          gameState.progress,
          keyboard,
        );

      // Draw keyboard
      if (keyboard) drawKeyboard(context, keyboard.keys, gameState.notes);
    },
    [
      gameState.isPlaying,
      gameState.notes,
      gameState.progress,
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

        gameDispatch({ type: 'scroll', amount, range });
      }
    },
    [gameDispatch, keyboard, noteGroup],
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
