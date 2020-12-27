import React from 'react';

export interface InclusiveRange {
  min: number;
  max: number;
}

export interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface CornerRadii {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}
