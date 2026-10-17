"use client";
import { useMemo, useEffect, useLayoutEffect, useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, animate, MotionValue, useReducedMotion } from 'framer-motion';

type OrbitShape = 'ellipse' | 'circle';

interface OrbitTechProps {
  items?: ReactNode[];
  shape?: OrbitShape;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: 'normal' | 'reverse';
  width?: number | '100%';
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  paused?: boolean;
  centerContent?: ReactNode;
  responsive?: boolean;
}

interface OrbitItemProps {
  item: ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: MotionValue<number>;
  isReduced: boolean;
  accentColor?: string;
}

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx: number, cy: number, r: number): string {
  return generateEllipsePath(cx, cy, r, r);
}

function OrbitItem({ 
  item, 
  index, 
  totalItems, 
  path, 
  itemSize, 
  rotation, 
  progress, 
  isReduced,
  accentColor = 'rgba(255, 255, 255, 0.06)'
}: OrbitItemProps) {
  const itemOffset = (index / totalItems) * 100;
  const offsetDistance = useTransform(progress, (p: number) => {
    if (isReduced) return `${itemOffset}%`;
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  const [isHovered, setIsHovered] = useState(false);

  // Subtle glow animation
  const glowIntensity = useMotionValue(0);
  
  useEffect(() => {
    if (isHovered) {
      animate(glowIntensity, 1, { type: "spring", stiffness: 400, damping: 25 });
    } else {
      animate(glowIntensity, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [isHovered, glowIntensity]);

  const glowOpacity = useTransform(glowIntensity, [0, 1], [0, 0.25]);
  const scale = useTransform(glowIntensity, [0, 1], [1, 1.12]);

  return (
    <motion.div
      className="absolute will-change-transform select-none flex items-center justify-center pointer-events-auto"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
      whileHover={{ 
        scale: 1.08,
        transition: { type: "spring", stiffness: 500, damping: 25 }
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="listitem"
      aria-label={`Orbit item ${index + 1} of ${totalItems}`}
    >
      {/* Ambient glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${accentColor}, transparent 65%)`,
          opacity: glowOpacity,
          scale: 1.5,
        }}
      />
      
      {/* Item container with glass touch */}
      <motion.div 
        className="w-full h-full flex items-center justify-center relative rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          scale,
          transition: 'border-color 0.3s ease',
        }}
        animate={{
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Inner subtle gradient */}
        <div className="absolute inset-[1px] rounded-full opacity-50" 
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent 70%)',
          }}
        />
        
        {item}
      </motion.div>
    </motion.div>
  );
}

export default function OrbitTech({
  items = [],
  shape = 'ellipse',
  radiusX = 300,
  radiusY = 240,
  radius = 240,
  rotation = -12,
  duration = 35,
  itemSize = 100,
  direction = 'normal',
  className = '',
  showPath = true,
  pathColor = 'rgba(63, 63, 70, 0.25)',
  pathWidth = 1.5,
  paused = false,
  centerContent,
  responsive = true,
}: OrbitTechProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const shouldReduceMotion = useReducedMotion();
  const isReduced = !!shouldReduceMotion;
  
  const designSize = 1000;
  const designCenterX = designSize / 2;
  const designCenterY = designSize / 2;

  const path = useMemo(() => {
    if (shape === 'circle') return generateCirclePath(designCenterX, designCenterY, radius);
    return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
  }, [shape, radiusX, radiusY, radius]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const newScale = Math.min(containerWidth / designSize, 1.2);
      setScale(newScale);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused || isReduced) return;
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [progress, duration, direction, paused, isReduced]);

  // Extract accent color from first item's hover color for glow
  const accentColor = useMemo(() => {
    return 'rgba(255, 255, 255, 0.06)';
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto ${className}`}
      style={{
        width: responsive ? '100%' : `${designSize}px`,
        height: responsive ? 'auto' : `${designSize}px`,
        aspectRatio: '1 / 1',
        maxWidth: responsive ? '100%' : `${designSize}px`,
      }}
      role="img"
      aria-label="Orbital visualization with items arranged in a circular pattern"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: designSize,
          height: designSize,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{ 
            transform: `rotate(${rotation}deg)`, 
            transformOrigin: 'center center',
          }}
        >
          {showPath && (
            <motion.svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${designSize} ${designSize}`}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <defs>
                <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: pathColor, stopOpacity: 0.1 }} />
                  <stop offset="50%" style={{ stopColor: pathColor, stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: pathColor, stopOpacity: 0.1 }} />
                </linearGradient>
              </defs>
              <motion.path 
                d={path} 
                fill="none" 
                stroke="url(#orbitGradient)" 
                strokeWidth={pathWidth / scale}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
              {/* Subtle glow along path */}
              <motion.path 
                d={path} 
                fill="none" 
                stroke={pathColor}
                strokeWidth={(pathWidth * 3) / scale}
                strokeLinecap="round"
                opacity={0.1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 2.2, 
                  ease: "easeInOut",
                  delay: 0.35,
                }}
              />
            </motion.svg>
          )}

          <ul className="absolute inset-0 list-none m-0 p-0">
            {items.map((item, index) => (
              <li key={index} className="relative list-none m-0 p-0">
                <OrbitItem
                  item={item}
                  index={index}
                  totalItems={items.length}
                  path={path}
                  itemSize={itemSize}
                  rotation={rotation}
                  progress={progress}
                  isReduced={isReduced}
                  accentColor={accentColor}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div 
            className="pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              ease: [0.23, 1, 0.32, 1]
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {centerContent}
          </motion.div>
        </div>
      )}
    </div>
  );
}