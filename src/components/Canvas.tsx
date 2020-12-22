import React, { useEffect, useRef } from 'react';
import Size from '../interfaces/Size';
import StyleProps from '../interfaces/StyleProps';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
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

  // Updates canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    // Used for cancelling animation requests and timeout
    let requestID: number;
    let timeoutID: number;

    // Check if canvas and context are defined
    if (canvas && context) {
      // Resizes canvas if necessary
      const resizeCanvas = () => {
        const { width, height } = canvas.getBoundingClientRect();
        if (
          sizeRef.current?.width !== width ||
          sizeRef.current?.height !== height
        ) {
          // Resize canvas
          canvas.width = width * DEVICE_PIXEL_RATIO;
          canvas.height = height * DEVICE_PIXEL_RATIO;

          // Scale context
          context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);

          // Update size ref
          sizeRef.current = { width, height };

          // Call resize prop
          if (onResize) onResize(sizeRef.current);
        }
      };

      // Initial Resize
      resizeCanvas();

      // Call setup if defined
      if (onSetup) onSetup(context);

      // Animation loop
      const animate = () => {
        // Resize canvas
        resizeCanvas();

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
  }, [targetFramerate, onSetup, onDraw, onResize]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
