import { useEffect, useRef } from 'react';
import './SpaceBackground.css';

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const baseSpeedRef = useRef(0.4);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStar = () => {
      const starTypes = [
        { color: '#FFFFFF', size: 1, twinkle: 0.7, trail: 0.2 },    // White stars
        { color: '#FFE66D', size: 2, twinkle: 0.5, trail: 0.8 },     // Warm yellow
        { color: '#4ECDC4', size: 1.5, twinkle: 0.6, trail: 0.4 },   // Turquoise
        { color: '#FF6B6B', size: 1.8, twinkle: 0.8, trail: 0.6 },   // Coral
        { color: '#FF8364', size: 1.2, twinkle: 0.4, trail: 0.3 }    // Peach
      ];

      const type = starTypes[Math.floor(Math.random() * starTypes.length)];
      const angle = Math.random() * Math.PI * 2;
      const radiusBias = Math.pow(Math.random(), 0.5);
      const radius = (canvas.width / 2) * (0.3 + radiusBias * 0.7);
      
      return {
        x: canvas.width/2 + radius * Math.cos(angle),
        y: canvas.height/2 + radius * Math.sin(angle),
        z: Math.random() * 2000,
        twinklePhase: Math.random() * Math.PI * 2,
        ...type
      };
    };

    const moveStars = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouseX = mouseRef.current.x - centerX;
      const mouseY = mouseRef.current.y - centerY;
      
      const speed = baseSpeedRef.current * (1 + Math.sqrt(mouseX ** 2 + mouseY ** 2) / 1000);

      starsRef.current.forEach(star => {
        star.z -= speed * 2;
        if (star.z <= 1) {
          Object.assign(star, createStar(), { z: 2000 });
        }
      });
    };

    const drawStars = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        const x = (star.x - canvas.width/2) * (400 / star.z) + canvas.width/2;
        const y = (star.y - canvas.height/2) * (400 / star.z) + canvas.height/2;
        const scale = 400 / star.z;

        star.twinklePhase += 0.05;
        const twinkleIntensity = Math.sin(star.twinklePhase) * star.twinkle;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3 * scale);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size * (1 + twinkleIntensity * 0.3) * scale, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      moveStars();
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    starsRef.current = Array(900).fill().map(createStar);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="space-background" />;
}