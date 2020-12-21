import React from 'react';
import { MAX_TRANSPOSE, MIN_TRANSPOSE } from '../constants/transpose';
import { useAppContext } from '../contexts/AppContext';
import StyleProps from '../interfaces/StyleProps';
import Counter from './Counter';

const TransposeCounter: React.FC<StyleProps> = (props) => {
  const { appState, appDispatch } = useAppContext();

  const handleChange = (transpose: number) => {
    appDispatch({ type: 'update-transpose', transpose });
  };

  return (
    <Counter
      value={appState.transpose}
      minValue={MIN_TRANSPOSE}
      maxValue={MAX_TRANSPOSE}
      step={1}
      onChange={handleChange}
      {...props}
    />
  );
};

export default TransposeCounter;
