import React, { createContext, useContext, useReducer } from 'react';
import {
  GameState,
  GameAction,
  gameStateReducer,
  DEFAULT_GAME_STATE,
} from './reducer';

interface GameData {
  gameState: GameState;
  gameDispatch: React.Dispatch<GameAction>;
}
const GameContext = createContext<GameData | undefined>(undefined);

export const GameContextProvider: React.FC = ({ children }) => {
  const [gameState, gameDispatch] = useReducer(
    gameStateReducer,
    DEFAULT_GAME_STATE,
  );

  const data: GameData = {
    gameState,
    gameDispatch,
  };

  return <GameContext.Provider value={data}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameData => {
  const context = useContext(GameContext);
  if (context === undefined) throw new Error('Game Context is undefined.');
  return context;
};
