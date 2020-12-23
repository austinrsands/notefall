import React, { useCallback, useEffect, useRef, useState } from 'react';
import Size from '../interfaces/Size';

const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1;

// Number of times to draw per frame
const DEFAULT_TARGET_FRAMERATE = 60;

interface Props {
  targetFramerate?: number;
  onSetup?: (context: CanvasRenderingContext2D) => void;
  onDraw?: (context: CanvasRenderingContext2D, deltaTime: number) => void;
  onResize?: (size: Size) => void;
  onWheel?: (event: React.WheelEvent<HTMLCanvasElement>) => void;
}

const Canvas: React.FC<
  Props &
    React.DetailedHTMLProps<
      React.CanvasHTMLAttributes<HTMLCanvasElement>,
      HTMLCanvasElement
    >
> = ({
  targetFramerate = DEFAULT_TARGET_FRAMERATE,
  onSetup,
  onDraw,
  onResize,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const size = useRef<Size | null>(null);
  const [frameTime, setFrameTime] = useState<number>(Date.now());
  const previousFrameTime = useRef<number | null>(null);

  // Gets context
  useEffect(() => {
    if (canvasRef.current) setContext(canvasRef.current.getContext('2d'));
  }, []);

  // Starts animation loop
  useEffect(() => {
    // Used for clearing timeout
    let timeoutID: number;

    // Used for canceling animation frame request
    let requestID: number;

    // Request animation frame with frequency based on target framerate
    const animate = () => {
      timeoutID = setTimeout(() => {
        requestID = requestAnimationFrame(animate);
      }, 1000 / targetFramerate);
      setFrameTime(Date.now());
    };

    // Start animating
    if (context) animate();

    // Perform cleanup
    return () => {
      if (requestID) cancelAnimationFrame(requestID);
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [context, targetFramerate]);

  // Setup
  useEffect(() => {
    if (context && onSetup) onSetup(context);
  }, [context, onSetup]);

  // Determines whether canvas needs to resize
  const canvasNeedsToResize = useCallback(() => {
    if (context === null) return false;
    if (size.current === null) return true;
    const { width, height } = context.canvas.getBoundingClientRect();

    // Determine if canvas size has changed
    const sizeHasChanged =
      size.current.width !== width || size.current.height !== height;

    return sizeHasChanged;
  }, [context]);

  // Resizes the canvas
  const resizeCanvas = useCallback(() => {
    if (context) {
      const { width, height } = context.canvas.getBoundingClientRect();
      // Resize canvas
      context.canvas.width = width * DEVICE_PIXEL_RATIO;
      context.canvas.height = height * DEVICE_PIXEL_RATIO;

      // Scale context
      context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);

      // Update size ref
      size.current = { width, height };

      // Run callback
      if (onResize) onResize(size.current);
    }
  }, [context, onResize]);

  // Draw
  useEffect(() => {
    if (previousFrameTime.current && context) {
      // Determine time between frames
      const deltaTime = (frameTime - previousFrameTime.current) / 1000;

      // Resize canvas if necessary
      if (canvasNeedsToResize()) resizeCanvas();

      // Call draw prop
      if (onDraw) onDraw(context, deltaTime);
    }
    previousFrameTime.current = frameTime;
  }, [context, canvasNeedsToResize, resizeCanvas, onDraw, frameTime]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
