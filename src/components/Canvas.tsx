import React, { useCallback, useEffect, useRef } from 'react';
import Size from '../interfaces/Size';
import StyleProps from '../interfaces/StyleProps';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

// Number of times to draw per frame
const DEFAULT_TARGET_FRAMERATE = 60;

interface Props {
  targetFramerate?: number;
  onSetup?: (context: CanvasRenderingContext2D) => void;
  onDraw?: (context: CanvasRenderingContext2D) => void;
  onResize?: (size: Size) => void;
}

const Canvas: React.FC<Props & StyleProps> = ({
  targetFramerate = DEFAULT_TARGET_FRAMERATE,
  onSetup,
  onDraw,
  onResize,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef<Size | null>(null);

  // Returns true if canvas should resize, false otherwise
  const shouldResize = useCallback((canvas) => {
    if (sizeRef.current === null) return true;
    const { width, height } = canvas.getBoundingClientRect();

    // Determine if canvas size has changed
    const sizeHasChanged =
      sizeRef.current.width !== width || sizeRef.current.height !== height;

    return sizeHasChanged;
  }, []);

  // Resizes the canvas associated with the given context
  const resize = useCallback(
    (context: CanvasRenderingContext2D) => {
      const { width, height } = context.canvas.getBoundingClientRect();
      // Resize canvas
      context.canvas.width = width * DEVICE_PIXEL_RATIO;
      context.canvas.height = height * DEVICE_PIXEL_RATIO;

      // Scale context
      context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);

      // Update size ref
      sizeRef.current = { width, height };

      // Run callback
      if (onResize) onResize(sizeRef.current);
    },
    [onResize],
  );

  // Updates canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    // Used for cancelling animation requests and timeout
    let requestID: number;
    let timeoutID: number;

    // Check if canvas and context are defined
    if (canvas && context) {
      // Initial Resize
      if (shouldResize(canvas)) resize(context);

      // Call setup if defined
      if (onSetup) onSetup(context);

      // Animation loop
      const animate = () => {
        if (shouldResize(canvas)) resize(context);

        // Reanimate based on target framerate
        timeoutID = setTimeout(() => {
          requestID = requestAnimationFrame(animate);
        }, 1000 / targetFramerate);

        // Call draw if defined
        if (onDraw) onDraw(context);
      };

      // Initiate animation loop
      animate();
    }

    return () => {
      // Cancel animation request and timeout if necessary
      if (requestID) cancelAnimationFrame(requestID);
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [targetFramerate, onSetup, onDraw, onResize, resize, shouldResize]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
