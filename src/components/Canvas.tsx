import React, { useEffect, useRef } from 'react';
import Scale from '../interfaces/Scale';
import StyleProps from '../interfaces/StyleProps';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
const DEFAULT_TARGET_FRAMERATE = 60;

interface Props {
  targetFramerate?: number;
  setup?: (context: CanvasRenderingContext2D) => void;
  draw?: (context: CanvasRenderingContext2D) => void;
}

const Canvas: React.FC<Props & StyleProps> = ({
  targetFramerate = DEFAULT_TARGET_FRAMERATE,
  setup,
  draw,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef<Scale>({ width: 0, height: 0 });

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
          canvas.width = width * DEVICE_PIXEL_RATIO;
          canvas.height = height * DEVICE_PIXEL_RATIO;
          context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);
          sizeRef.current = { width, height };
        }
      };

      // Initial Resize
      resizeCanvas();

      // Call setup if defined
      if (setup) setup(context);

      // Animation loop
      const animate = () => {
        // Resize canvas
        resizeCanvas();

        // Reanimate based on target framerate
        timeoutID = setTimeout(() => {
          requestID = requestAnimationFrame(animate);
        }, 1000 / targetFramerate);

        // Call draw if defined
        if (draw) draw(context);
      };

      // Initiate animation loop
      animate();
    }

    return () => {
      // Cancel animation request and timeout if necessary
      if (requestID) cancelAnimationFrame(requestID);
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [setup, draw, targetFramerate]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
