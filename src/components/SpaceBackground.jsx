import { useEffect, useRef } from 'react';
import './SpaceBackground.css';

export default function SpaceBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const baseSpeedRef = useRef(0.4); // Reduced by 60% from original 1.0

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
        { color: '#FFFFFF', size: 1, twinkle: 0.7, trail: 0.2 }, // 20% white, small
        { color: '#FFD700', size: 2, twinkle: 0.5, trail: 0.8 }, // 15% gold, medium with long trail
        { color: '#00FFFF', size: 1.5, twinkle: 0.6, trail: 0.4 }, // 15% cyan, medium-small
        { color: '#FF69B4', size: 1.8, twinkle: 0.8, trail: 0.6 }, // 15% pink, medium-large
        { color: '#4169E1', size: 1.2, twinkle: 0.4, trail: 0.3 }, // 15% royal blue, small-medium
        { color: '#9B59B6', size: 1.6, twinkle: 0.7, trail: 0.5 }, // 10% purple
        { color: '#2ECC71', size: 1.3, twinkle: 0.6, trail: 0.4 }, // 10% green
      ];

      const randomType = Math.random();
      const type = randomType < 0.20 ? starTypes[0] : // 20% white
                   randomType < 0.35 ? starTypes[1] : // 15% gold
                   randomType < 0.50 ? starTypes[2] : // 15% cyan
                   randomType < 0.65 ? starTypes[3] : // 15% pink
                   randomType < 0.80 ? starTypes[4] : // 15% royal blue
                   randomType < 0.90 ? starTypes[5] : // 10% purple
                   starTypes[6]; // 10% green

      // Create stars with bias towards the periphery
      const angle = Math.random() * Math.PI * 2;
      const radiusBias = Math.pow(Math.random(), 0.5); // Square root to bias towards outer edges
      const radius = (canvas.width / 2) * (0.3 + radiusBias * 0.7); // Minimum 30% from center
      
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
      
      // Adjust speed based on mouse position (40% of original speed)
      const speed = baseSpeedRef.current * (1 + Math.sqrt(mouseX ** 2 + mouseY ** 2) / 1000);

      starsRef.current.forEach(star => {
        star.z -= speed * 2;
        
        if (star.z <= 1) {
          Object.assign(star, createStar(), { z: 2000 });
        }
      });
    };

    const drawStars = () => {
      // Create dark space gradient background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      bgGradient.addColorStop(0, '#0a0a0a');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw black hole effect
      const blackHoleGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 150
      );
      blackHoleGradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
      blackHoleGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.3)');
      blackHoleGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = blackHoleGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fill();

      // Draw stars with enhanced effects
      starsRef.current.forEach(star => {
        const x = (star.x - centerX) * (400 / star.z) + centerX;
        const y = (star.y - centerY) * (400 / star.z) + centerY;
        const scale = 400 / star.z;

        // Update twinkle phase
        star.twinklePhase += 0.05;
        const twinkleIntensity = Math.sin(star.twinklePhase) * star.twinkle;

        ctx.beginPath();
        
        // Enhanced glowing effect with twinkle
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3 * scale);
        const colorAlpha = 0.7 + twinkleIntensity * 0.3;
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.1, `${star.color}${Math.floor(colorAlpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${star.color}40`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(x, y, star.size * (1 + twinkleIntensity * 0.3) * scale, 0, Math.PI * 2);
        ctx.fill();

        // Add trails for stars
        if (star.z < 1500) {
          const trailLength = star.trail * 50 * scale;
          const dx = x - canvas.width/2;
          const dy = y - canvas.height/2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const dirX = dx / distance;
          const dirY = dy / distance;
          
          const gradient = ctx.createLinearGradient(
            x, y,
            x - dirX * star.trail * 50,
            y - dirY * star.trail * 50
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = star.size * scale * 0.5;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - dirX * star.trail * 50,
            y - dirY * star.trail * 50
          );
          ctx.stroke();
        }
        
        // Add cross light effect for brighter stars
        if (star.size > 1.5 && star.z < 1000) {
          ctx.strokeStyle = `${star.color}40`;
          ctx.lineWidth = scale * 0.5;
          ctx.beginPath();
          ctx.moveTo(x - star.size * 2 * scale, y);
          ctx.lineTo(x + star.size * 2 * scale, y);
          ctx.moveTo(x, y - star.size * 2 * scale);
          ctx.lineTo(x, y + star.size * 2 * scale);
          ctx.stroke();
        }
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

    // Initialize
    resizeCanvas();
    starsRef.current = Array(900).fill().map(createStar); // Increased from 600 to 900 (50% more)
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