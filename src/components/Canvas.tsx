import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  onWheel?: (event: React.WheelEvent<HTMLCanvasElement>) => void;
}

const Canvas: React.FC<Props & StyleProps> = ({
  targetFramerate = DEFAULT_TARGET_FRAMERATE,
  onSetup,
  onDraw,
  onResize,
  onWheel,
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousFrameTimeRef = useRef<number>(null);
  const [frameTime, setFrameTime] = useState<number>(Date.now());
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  // Gets context
  useEffect(() => {
    if (canvasRef.current) {
      console.log('get context');
      // Get context
      setContext(canvasRef.current.getContext('2d'));
    }
  }, []);

  // Starts animation loop
  useEffect(() => {
    // Used for clearing timeout
    let timeoutID: number;

    // Used for canceling animation frame request
    let requestID: number;

    // Request animation frame targetFramerate times per second and update frame time
    const animate = () => {
      timeoutID = setTimeout(() => {
        requestID = requestAnimationFrame(animate);
      }, 1000 / targetFramerate);
      setFrameTime(Date.now());
    };

    // Start animating
    if (context) animate();

    // Cleanup
    return () => {
      if (requestID) cancelAnimationFrame(requestID);
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [context, targetFramerate]);

  useEffect(() => {
    if (previousFrameTimeRef !== null) {
      const previousFrameTime = previousFrameTimeRef.current;
      console.log(frameTime - previousFrameTime);
      previousFrameTimeRef.current = frameTime;
    }
  }, [frameTime]);

  // Setup
  useEffect(() => {
    if (context && onSetup) {
      console.log('setup');
      onSetup(context);
    }
  }, [context, onSetup]);

  useEffect(() => {
    if (context) {
      const { width, height } = context.canvas.getBoundingClientRect();
      console.log(width, height);
    }
  }, [context]);

  // // Returns true if canvas should resize, false otherwise
  // const shouldResize = useCallback(() => {
  //   if (sizeRef.current === null) return true;
  //   const { width, height } = canvas.getBoundingClientRect();

  //   // Determine if canvas size has changed
  //   const sizeHasChanged =
  //     sizeRef.current.width !== width || sizeRef.current.height !== height;

  //   return sizeHasChanged;
  // }, []);

  // // Resizes the canvas associated with the given context
  // const resize = useCallback(
  //   (context: CanvasRenderingContext2D) => {
  //     const { width, height } = context.canvas.getBoundingClientRect();
  //     // Resize canvas
  //     context.canvas.width = width * DEVICE_PIXEL_RATIO;
  //     context.canvas.height = height * DEVICE_PIXEL_RATIO;

  //     // Scale context
  //     context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO);

  //     // Update size ref
  //     sizeRef.current = { width, height };

  //     // Run callback
  //     if (onResize) onResize(sizeRef.current);
  //   },
  //   [onResize],
  // );

  // // Updates canvas
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext('2d');

  //   // Used for cancelling animation requests and timeout
  //   let requestID: number;
  //   let timeoutID: number;

  //   // Check if canvas and context are defined
  //   if (canvas && context) {
  //     // Initial Resize
  //     if (shouldResize(canvas)) resize(context);

  //     // Call setup if defined
  //     console.log('setup');
  //     if (onSetup) onSetup(context);

  //     // Animation loop
  //     const animate = () => {
  //       if (shouldResize(canvas)) resize(context);

  //       // Reanimate based on target framerate
  //       timeoutID = setTimeout(() => {
  //         requestID = requestAnimationFrame(animate);
  //       }, 1000 / targetFramerate);

  //       // Calculate time since last frame in seconds
  //       const now = Date.now();
  //       const deltaTime = (now - lastFrameTimeRef.current) * 1000;

  //       // Call draw if defined
  //       if (onDraw) onDraw(context, deltaTime);

  //       // Update with time for this frame
  //       lastFrameTimeRef.current = Date.now();
  //     };

  //     // Initiate animation loop
  //     animate();
  //   }

  //   return () => {
  //     // Cancel animation request and timeout if necessary
  //     if (requestID) cancelAnimationFrame(requestID);
  //     if (timeoutID) clearTimeout(timeoutID);
  //   };
  // }, [targetFramerate, onSetup, onDraw, onResize, resize, shouldResize]);

  return <canvas ref={canvasRef} onWheel={onWheel} {...rest} />;
};

export default Canvas;
