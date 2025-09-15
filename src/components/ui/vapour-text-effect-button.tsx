"use client";

import { wrap } from "module";
import React, { useRef, useEffect, useState, createElement, useMemo, useCallback, memo, forwardRef, useImperativeHandle } from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
  
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string | {
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
  triggerVaporize?: boolean;
  onVaporizeComplete?: () => void;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

type TextBoundaries = {
  left: number;
  right: number;
  width: number;
};

declare global {
  interface HTMLCanvasElement {
    textBoundaries?: TextBoundaries;
  }
}

function useScreenSize(): "sm" | "md" | "lg" | "xl" {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) setSize("sm");
      else if (width < 768) setSize("md");
      else if (width < 1024) setSize("lg");
      else setSize("xl");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
function getCurrentScreenSize(): "sm" | "md" | "lg" | "xl" {
  const width = window.innerWidth;
  if (width < 640) return "sm";
  if (width < 768) return "md";
  if (width < 1024) return "lg";
  return "xl";
}
const VaporizeTextCycle = forwardRef(function VaporizeTextCycle({
  texts = ["Next.js", "React"],
  font = {
    fontFamily: "sans-serif",
    fontSize: "50px",
    fontWeight: 400,
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.5,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
  triggerVaporize = false,
  onVaporizeComplete,
}: VaporizeTextCycleProps, ref) {
  const screen = useScreenSize();

  const resolvedFontSize =
    typeof font.fontSize === "string"
      ? font.fontSize
      : font.fontSize?.[screen] ?? "50px";

  const resolvedFont = {
    fontFamily: font.fontFamily ?? "sans-serif",
    fontSize: resolvedFontSize,
    fontWeight: font.fontWeight ?? 400,
  };

  const pendingIndexRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isInView = useIsInView(wrapperRef as React.RefObject<HTMLElement>);
  const lastFontRef = useRef<string | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState<"static" | "vaporizing" | "fadingIn" | "waiting">("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.devicePixelRatio * 1.5 || 1;
    }
    return 1;
  }, []);

  // const wrapperStyle = useMemo(() => ({
  //   width: "100%",
  //   height: "100%",
  //   pointerEvents: "none" as const,
  // }), []);

  const wrapperStyle = useMemo(() => ({
    width: "100%",
    //height: `${totalHeight}px`,
    pointerEvents: "none" as const,
    position: "relative" as const,
    display: "inline-block", // Ensures layout reflows
    
  }), []);

  const canvasStyle = useMemo(() => ({
    width: "100%",
    height: "100%",
    pointerEvents: "none" as const,
    display: "block",
  }), []);

  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 0.5) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  const fontConfig = useMemo(() => {
    const fontSize = parseInt(resolvedFont.fontSize?.replace("px", "") || "50");
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize);
    const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
    return {
      fontSize,
      VAPORIZE_SPREAD,
      MULTIPLIED_VAPORIZE_SPREAD,
      font: `${resolvedFont.fontWeight ?? 400} ${fontSize * globalDpr}px ${resolvedFont.fontFamily}`,
    };
  }, [resolvedFont.fontSize, resolvedFont.fontWeight, resolvedFont.fontFamily, spread, globalDpr]);

  const memoizedUpdateParticles = useCallback((particles: Particle[], vaporizeX: number, deltaTime: number) => {
    return updateParticles(
      particles,
      vaporizeX,
      deltaTime,
      fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
      animationDurations.VAPORIZE_DURATION,
      direction,
      transformedDensity
    );
  }, [fontConfig.MULTIPLIED_VAPORIZE_SPREAD, animationDurations.VAPORIZE_DURATION, direction, transformedDensity]);

  const memoizedRenderParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    renderParticles(ctx, particles, globalDpr);
  }, [globalDpr]);

  useImperativeHandle(ref, () => ({
      nextText: () => {
        
        if (animationState === "static") {
          const nextIndex = (currentTextIndex + 1) % texts.length;
          pendingIndexRef.current = nextIndex;
          vaporizeProgressRef.current = 0;
          setAnimationState("vaporizing");
        }
    },
    prevText: () => {
      if(animationState === "static") {
        setCurrentTextIndex(prev => (prev - 1 + texts.length) % texts.length);
        setAnimationState("vaporizing");
        vaporizeProgressRef.current = 0;
      }
    },
    setTextIndex: (index: number) => {
      setCurrentTextIndex(index % texts.length);
      setAnimationState("vaporizing");
      vaporizeProgressRef.current = 0;
    },
    triggerVaporize: () => {
      setAnimationState("vaporizing");
      vaporizeProgressRef.current = 0;
    }
  }));

  useEffect(() => {
    if (triggerVaporize) {
      setAnimationState("vaporizing");
      vaporizeProgressRef.current = 0;
    }
  }, [triggerVaporize]);


  useEffect(() => {
    renderCanvas({
    framerProps: {
      texts,
      font,
      color,
      alignment,
    },
    canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
    wrapperSize,
    particlesRef,
    globalDpr,
    currentTextIndex,
    transformedDensity,
  });

  let lastTime = performance.now();
  let frameId: number;

  const animate = (currentTime: number) => {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true }) || canvas?.getContext("2d");

    if (!canvas || !ctx || !particlesRef.current.length) {
      frameId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
      switch (animationState) {
        case "static": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
        case "vaporizing": {
          vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000);

          const textBoundaries = canvas.textBoundaries;
          if (!textBoundaries) break;

          const progress = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX = direction === "left-to-right"
            ? textBoundaries.left + textBoundaries.width * progress / 100
            : textBoundaries.right - textBoundaries.width * progress / 100;

          const allVaporized = memoizedUpdateParticles(particlesRef.current, vaporizeX, deltaTime);
          memoizedRenderParticles(ctx, particlesRef.current);

          if (vaporizeProgressRef.current >= 100 && allVaporized) {
           
              if (pendingIndexRef.current !== null) {
                
                setCurrentTextIndex(pendingIndexRef.current);
                pendingIndexRef.current = null;
              }
              setAnimationState("fadingIn");
              fadeOpacityRef.current = 0;
          }
          break;
        }
        case "fadingIn": {
          fadeOpacityRef.current += deltaTime * 1000 / animationDurations.FADE_IN_DURATION;

          ctx.save();
          ctx.scale(globalDpr, globalDpr);
          particlesRef.current.forEach(particle => {
            particle.x = particle.originalX;
            particle.y = particle.originalY;
            const opacity = Math.min(fadeOpacityRef.current, 1) * particle.originalAlpha;
            const color = particle.color.replace(/[\d.]+\)$/, `${opacity})`);
            ctx.fillStyle = color;
            ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
          });
          ctx.restore();

          if (fadeOpacityRef.current >= 1) {
            setAnimationState("static");
            setAnimationState("static");
            if (typeof onVaporizeComplete === "function") {
              onVaporizeComplete();
            }
          }
          break;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [animationState, isInView, direction, globalDpr, memoizedUpdateParticles, memoizedRenderParticles, animationDurations]);

  useEffect(() => {
    renderCanvas({
      framerProps: {
        texts,
        font,
        color,
        alignment,
      },
      canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      wrapperSize,
      particlesRef,
      globalDpr,
      currentTextIndex,
      transformedDensity,
    });

    const currentFont = resolvedFont.fontFamily || "sans-serif";
    return handleFontChange({
      currentFont,
      lastFontRef,
      canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
      wrapperSize,
      particlesRef,
      globalDpr,
      currentTextIndex,
      transformedDensity,
      framerProps: {
        texts,
        font,
        color,
        alignment,
      },
    });
  }, [texts, font, color, alignment, wrapperSize, currentTextIndex, globalDpr, transformedDensity]);

  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWrapperSize({ width, height });
      }
      
      renderCanvas({
        framerProps: {
          texts,
          font,
          color,
          alignment,
        },
        canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
        wrapperSize: { width: container.clientWidth, height: container.clientHeight },
        particlesRef,
        globalDpr,
        currentTextIndex,
        transformedDensity,
      });
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [wrapperRef.current]);

  useEffect(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setWrapperSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
});

const SeoElement = memo(({ tag = Tag.P, texts }: { tag: Tag, texts: string[] }) => {
  const style = useMemo(() => ({
    position: "absolute" as const,
    width: "0",
    height: "0",
    overflow: "hidden",
    userSelect: "none" as const,
    pointerEvents: "none" as const,
  }), []);

  const safeTag = Object.values(Tag).includes(tag) ? tag : "p";
  
  return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

const handleFontChange = ({
  currentFont,
  lastFontRef,
  canvasRef,
  wrapperSize,
  particlesRef,
  globalDpr,
  currentTextIndex,
  transformedDensity,
  framerProps,
}: {
  currentFont: string;
  lastFontRef: React.MutableRefObject<string | null>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperSize: { width: number; height: number };
  particlesRef: React.MutableRefObject<Particle[]>;
  globalDpr: number;
  currentTextIndex: number;
  transformedDensity: number;
  framerProps: VaporizeTextCycleProps;
}) => {
  if (currentFont !== lastFontRef.current) {
    lastFontRef.current = currentFont;
    
    const timeoutId = setTimeout(() => {
      cleanup({ canvasRef, particlesRef });
      renderCanvas({
        framerProps,
        canvasRef,
        wrapperSize,
        particlesRef,
        globalDpr,
        currentTextIndex,
        transformedDensity,
      });
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      cleanup({ canvasRef, particlesRef });
    };
  }
  
  return undefined;
};

const cleanup = ({ canvasRef, particlesRef }: { canvasRef: React.RefObject<HTMLCanvasElement>; particlesRef: React.MutableRefObject<Particle[]> }) => {
  const canvas = canvasRef.current;
  if(!canvas) return;
  const ctx = canvas?.getContext("2d", { willReadFrequently: true }) || canvas?.getContext("2d");
  if(!ctx) return;
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  if (particlesRef.current) {
    particlesRef.current = [];
  }
};

const renderCanvas = ({
  framerProps,
  canvasRef,
  wrapperSize,
  particlesRef,
  globalDpr,
  currentTextIndex,
  transformedDensity,
}: {
  framerProps: VaporizeTextCycleProps;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  wrapperSize: { width: number; height: number };
  particlesRef: React.MutableRefObject<Particle[]>;
  globalDpr: number;
  currentTextIndex: number;
  transformedDensity: number;
}) => {
  const canvas = canvasRef.current;
  if (!canvas || !wrapperSize.width ) return;

  const ctx = canvas.getContext("2d", { willReadFrequently: true }) || canvas.getContext("2d");

  if (!ctx) return;

  const rawFontSize =
    typeof framerProps.font?.fontSize === "string"
      ? framerProps.font.fontSize
      : framerProps.font?.fontSize?.[getCurrentScreenSize()] ?? "50px";
  
  const fontSize = parseInt(rawFontSize.replace("px", "") || "50");   
  const font = `${framerProps.font?.fontWeight ?? 400} ${fontSize * globalDpr}px ${framerProps.font?.fontFamily ?? "sans-serif"}`;
  const color = parseColor(framerProps.color ?? "rgb(153, 153, 153)");
  
  const currentText = framerProps.texts[currentTextIndex] || "Next.js";
  ctx.font = font;

  //calculate wrapped lines
  const maxWidth = wrapperSize.width * 0.7;
  const words = currentText.split(" ");
  let line = "";
  let lines: string[] = [];
  words.forEach((word) => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth && line !== "") {
      lines.push(line.trim());
      line = word + " ";
    } else {
      line = testLine;
    }
  });
  lines.push(line.trim());

  const lineHeight = fontSize * 1.5;
  const textHeight = lines.length * lineHeight;
  const padding = fontSize * 0.8;
  const totalHeight = textHeight + padding * 2;

  canvas.style.width = `${wrapperSize.width}px`;
  canvas.style.height = `${totalHeight}px`;
  canvas.width = Math.floor(wrapperSize.width * globalDpr);
  canvas.height = Math.floor(totalHeight * globalDpr);
  ctx.scale(globalDpr * 0.5, globalDpr * 0.5);



  // Render particles for these lines
  let textX: number;
  //const textY = canvas.height / 2;

  if (framerProps.alignment === "center") {
    textX = wrapperSize.width / 2;
  } else if (framerProps.alignment === "left") {
    textX = 0;
  } else {
    textX = wrapperSize.width;
  }

  let currentY = padding;
  lines.forEach((lineText) => {
    ctx.fillStyle = color;
    ctx.textAlign = framerProps.alignment ?? "center";
    ctx.textBaseline = "top";
    ctx.fillText(lineText, textX, currentY);
    currentY += lineHeight;
  });

  const { particles, textBoundaries } = createParticles(
    ctx,
    canvas,
    currentText,
    textX,
    padding,
    font,
    color,
    framerProps.alignment || "left",
    fontSize
  );

  particlesRef.current = particles;
  canvas.textBoundaries = textBoundaries;
  
};

const createParticles = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  textX: number,
  textY: number,
  font: string,
  color: string,
  alignment: "left" | "center" | "right",
  fontSize: number
) => {
  const particles = [];
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "top";
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;
  
  
  if ('fontKerning' in ctx) {
    (ctx as any).fontKerning = "normal";
  }
  
  if ('textRendering' in ctx) {
    (ctx as any).textRendering = "geometricPrecision";
  }

  const metrics = ctx.measureText(text);
  let textLeft;
  const textWidth = metrics.width;
  
  if (alignment === "center") {
    textLeft = textX - textWidth / 2;
  } else if (alignment === "left") {
    textLeft = textX;
  } else {
    textLeft = textX - textWidth;
  }
  
  const textBoundaries = {
    left: textLeft,
    right: textLeft + textWidth,
    width: textWidth,
  };

  //ctx.fillText(text, textX, textY);
  // Word-wrapping logic for canvas
  const maxWidth = canvas.width * 0.7; // 90% of canvas width
  const lineHeight =  fontSize* 2; 
  const words = text.split(' ');
  let line = '';
  let lines: string[] = [];
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  // Update Y positioning to center vertically
  
  const totalHeight = lines.length * lineHeight;
  // let currentY = textY - totalHeight / 2;
  
  const paddingTop = fontSize * 0.8; // optional small margin
  let currentY = paddingTop;

  // Draw each line and collect particle data
  lines.forEach((lineText) => {
    ctx.fillText(lineText, textX, currentY);
    currentY += lineHeight;
  });

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const currentDPR = canvas.width / parseInt(canvas.style.width);
  const baseSampleRate = Math.max(1, Math.round(currentDPR / 3));
  const sampleRate = Math.max(1, Math.round(baseSampleRate));
  //const sampleRate = 2;
  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3];
      
      if (alpha > 0) {
        const originalAlpha = alpha / 255 * (sampleRate / currentDPR);
        const particle = {
          x,
          y,
          originalX: x,
          originalY: y,
          color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`,
          opacity: originalAlpha,
          originalAlpha,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        };
        
        particles.push(particle);
      }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  return { particles, textBoundaries };
};

const updateParticles = (
  particles: Particle[],
  vaporizeX: number,
  deltaTime: number,
  MULTIPLIED_VAPORIZE_SPREAD: number,
  VAPORIZE_DURATION: number,
  direction: string,
  density: number
) => {
  let allParticlesVaporized = true;
  
  particles.forEach(particle => {
    const shouldVaporize = direction === "left-to-right" 
      ? particle.originalX <= vaporizeX 
      : particle.originalX >= vaporizeX;
    
    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        particle.shouldFadeQuickly = Math.random() > density;
      }
      
      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
        
        const dampingFactor = Math.max(0.95, 1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD));
        
        const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3;
        const spreadX = (Math.random() - 0.5) * randomSpread;
        const spreadY = (Math.random() - 0.5) * randomSpread;
        
        particle.velocityX = (particle.velocityX + spreadX + dx * 0.002) * dampingFactor;
        particle.velocityY = (particle.velocityY + spreadY + dy * 0.002) * dampingFactor;
        
        const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2;
        const currentVelocity = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);
        
        if (currentVelocity > maxVelocity) {
          const scale = maxVelocity / currentVelocity;
          particle.velocityX *= scale;
          particle.velocityY *= scale;
        }
        
        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;
        
        const baseFadeRate = 0.25;
        const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION);
        
        particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);
      }
      
      if (particle.opacity > 0.01) {
        allParticlesVaporized = false;
      }
    } else {
      allParticlesVaporized = false;
    }
  });
  
  return allParticlesVaporized;
};

const renderParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], globalDpr: number) => {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  
  particles.forEach(particle => {
    if (particle.opacity > 0) {
      const color = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fillStyle = color;
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
    }
  });
  
  ctx.restore();
};

const calculateVaporizeSpread = (fontSize: number) => {
  const size = typeof fontSize === "string" ? parseInt(fontSize) : fontSize;
  
  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 }
  ];
  
  if (size <= points[0].size) return points[0].spread;
  if (size >= points[points.length - 1].size) return points[points.length - 1].spread;
  
  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < size) i++;
  
  const p1 = points[i];
  const p2 = points[i + 1];
  
  return p1.spread + (size - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
};

const parseColor = (color: string) => {
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  
  if (rgbaMatch) {
    const [_, r, g, b, a] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
  
  console.warn("Could not parse color:", color);
  return "rgba(0, 0, 0, 1)";
};

function transformValue(input: number, inputRange: number[], outputRange: number[], clamp = false): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  
  const progress = (input - inputMin) / (inputMax - inputMin);
  let result = outputMin + progress * (outputMax - outputMin);
  
  if (clamp) {
    if (outputMax > outputMin) {
      result = Math.min(Math.max(result, outputMin), outputMax);
    } else {
      result = Math.min(Math.max(result, outputMax), outputMin);
    }
  }
  
  return result;
}

function useIsInView(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '50px' }
    );
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isInView;
}

export default VaporizeTextCycle;