import { useEffect, useRef } from 'react';
import './SpaceBackground.css';

const STAR_TYPES = [
  { color: '#FFFFFF', size: 1, twinkle: 0.7 },
  { color: '#FFE66D', size: 2, twinkle: 0.5 },
  { color: '#4ECDC4', size: 1.5, twinkle: 0.6 },
  { color: '#FF6B6B', size: 1.8, twinkle: 0.8 },
  { color: '#FF8364', size: 1.2, twinkle: 0.4 },
];

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // A small touch viewport stays in phone mode in either orientation.
    const phoneViewport = window.matchMedia('(pointer: coarse) and (max-width: 600px), (pointer: coarse) and (max-height: 600px)');
    let animationFrameId = null;
    let previousTime = null;
    let regionVisible = false;
    const mouse = { x: 0, y: 0 };

    // Bake each color once, instead of allocating 900 gradients on every frame.
    const sprites = STAR_TYPES.map(type => {
      const sprite = document.createElement('canvas');
      sprite.width = sprite.height = 32;
      const paint = sprite.getContext('2d');
      const gradient = paint.createRadialGradient(16, 16, 0, 16, 16, 48);
      gradient.addColorStop(0, type.color);
      gradient.addColorStop(1, 'transparent');
      paint.fillStyle = gradient;
      paint.beginPath();
      paint.arc(16, 16, 16, 0, Math.PI * 2);
      paint.fill();
      return sprite;
    });

    const createStar = () => {
      const type = Math.floor(Math.random() * STAR_TYPES.length);
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.sqrt(Math.random()) * 0.7;
      return {
        // Relative coordinates preserve the pattern when the viewport changes.
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: Math.random() * 2000,
        phase: Math.random() * Math.PI * 2,
        type,
      };
    };
    // Retain the same stars across resizing; only the active count changes.
    const stars = Array.from({ length: 900 }, createStar);

    const draw = elapsedSeconds => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const speed = 48 * (1 + Math.hypot(mouse.x - centerX, mouse.y - centerY) / 1000);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const smallStars = STAR_TYPES.map(() => new Path2D());

      const starCount = phoneViewport.matches ? 300 : 900;
      for (let index = 0; index < starCount; index++) {
        const star = stars[index];
        // Match the original 60 Hz motion at any display refresh rate.
        star.z -= speed * elapsedSeconds;
        star.phase += 3 * elapsedSeconds;
        if (star.z <= 1) Object.assign(star, createStar(), { z: 2000 });
        const scale = 400 / star.z;
        const x = star.x * centerX * scale + centerX;
        const y = star.y * centerX * scale + centerY;
        const type = STAR_TYPES[star.type];
        const radius = type.size * (1 + Math.sin(star.phase) * type.twinkle * 0.3) * scale;
        if (x + radius < 0 || x - radius > canvas.width || y + radius < 0 || y - radius > canvas.height) continue;
        // At subpixel sizes a glow is indistinguishable from a point. Batch these
        // by color, keeping every star without hundreds of tiny image draws.
        if (radius < 0.6) {
          smallStars[star.type].rect(x - radius, y - radius, radius * 2, radius * 2);
          continue;
        }
        ctx.drawImage(sprites[star.type], x - radius, y - radius, radius * 2, radius * 2);
      }
      ctx.globalAlpha = 0.6;
      smallStars.forEach((points, index) => {
        ctx.fillStyle = STAR_TYPES[index].color;
        ctx.fill(points);
      });
      ctx.globalAlpha = 1;
    };

    const animate = time => {
      const elapsed = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.1);
      previousTime = time;
      draw(elapsed);
      animationFrameId = requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
      previousTime = null;
      if (!document.hidden && regionVisible && !reducedMotion.matches) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      // CSS viewport sizing stays stable while mobile browser toolbars move.
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      draw(0);
      syncAnimation();
    };

    const refreshDensity = () => draw(0);
    const handleMouseMove = event => { mouse.x = event.clientX; mouse.y = event.clientY; };
    // Other sections have opaque backgrounds, so avoid rendering underneath them.
    const regions = document.querySelectorAll('.hero, .certifications-section');
    const visibleRegions = new Set();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleRegions.add(entry.target);
        else visibleRegions.delete(entry.target);
      }
      const visible = visibleRegions.size > 0;
      if (visible !== regionVisible) {
        regionVisible = visible;
        syncAnimation();
      }
    });
    regions.forEach(region => observer.observe(region));
    resize();
    draw(0);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', syncAnimation);
    reducedMotion.addEventListener('change', syncAnimation);
    phoneViewport.addEventListener('change', refreshDensity);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', syncAnimation);
      reducedMotion.removeEventListener('change', syncAnimation);
      phoneViewport.removeEventListener('change', refreshDensity);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="space-background" aria-hidden="true" />;
}
