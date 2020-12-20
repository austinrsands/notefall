import React, { useEffect, useRef } from 'react';
import { StyleProps } from '../styles/props';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;
const DEFAULT_TARGET_FRAMERATE = 60;

interface Size {
  width: number;
  height: number;
}

interface Props {
  targetFramerate?: number;
  setup?: (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => void;
  draw?: (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => void;
}

const Canvas: React.FC<Props & StyleProps> = ({
  className,
  style,
  targetFramerate = DEFAULT_TARGET_FRAMERATE,
  setup,
  draw,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sizeRef = useRef<Size>({ width: 0, height: 0 });

  // Updates canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

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
      if (setup) setup(context, sizeRef.current.width, sizeRef.current.height);

      // Animation loop
      const animate = () => {
        // Resize canvas
        resizeCanvas();

        // Reanimate based on target framerate
        setTimeout(() => {
          requestAnimationFrame(animate);
        }, 1000 / targetFramerate);

        // Call draw if defined
        if (draw) draw(context, sizeRef.current.width, sizeRef.current.height);
      };

      // Initiate animation loop
      animate();
    }
  }, [setup, draw, targetFramerate]);

  return <canvas className={className} style={style} ref={canvasRef} />;
};

export default Canvas;
