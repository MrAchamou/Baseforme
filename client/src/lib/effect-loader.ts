import type { Effect } from '@/types/effects';

export class EffectLoader {
  private loadedScripts: Map<string, string> = new Map();
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrame: number | null = null;
  private currentText: string = '';
  private currentImage: HTMLImageElement | null = null;

  constructor() {}

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  async loadEffect(effect: Effect, text: string = 'Test', image?: HTMLImageElement | null): Promise<void> {
    this.currentText = text;
    this.currentImage = image || null;
    if (!effect.script) {
      throw new Error('Effect script URL not available');
    }

    if (!this.loadedScripts.has(effect.id)) {
      try {
        // Handle demo effects
        if (effect.script.startsWith('demo://')) {
          const effectId = effect.script.replace('demo://', '');
          this.loadedScripts.set(effect.id, this.getMockScript(effectId));
          return;
        }

        // Handle real GitHub effects
        console.info(`Loading effect script from: ${effect.script}`);
        const response = await fetch(effect.script);
        if (!response.ok) {
          throw new Error(`Failed to load effect script: ${response.status} ${response.statusText}`);
        }

        let script = await response.text();

        // Wrap the GitHub script to work with our context system
        script = this.wrapGitHubScript(script, effect.id);
        this.loadedScripts.set(effect.id, script);
        console.info(`Successfully loaded effect: ${effect.id}`);
      } catch (error) {
        console.error(`Failed to load effect ${effect.id}:`, error);
        // Use mock script as fallback
        this.loadedScripts.set(effect.id, this.getMockScript(effect.id));
      }
    }
  }

  private wrapGitHubScript(originalScript: string, effectId: string): string {
    // Wrap the original GitHub script to work with our context system
    return `
      const { ctx, canvas, text, image, animationFrame, clearFrame } = context;

      // Create a safe execution environment for the GitHub effect
      const effectContext = {
        canvas: canvas,
        ctx: ctx,
        text: text,
        image: image,
        width: canvas.width,
        height: canvas.height,
        requestAnimationFrame: animationFrame,
        cancelAnimationFrame: clearFrame
      };

      // Execute the original effect script
      try {
        ${originalScript}
      } catch (error) {
        console.error('Error in effect ${effectId}:', error);

        // Fallback simple animation
        let frame = 0;
        function fallbackAnimate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#ff6b6b';
          ctx.fillText(text, canvas.width / 2, canvas.height / 2);
          frame++;
          animationFrame(fallbackAnimate);
        }
        fallbackAnimate();
      }
    `;
  }

  executeEffect(effectId: string, text: string): void {
    if (!this.canvas || !this.ctx) {
      throw new Error('Canvas not initialized');
    }

    const script = this.loadedScripts.get(effectId);
    if (!script) {
      throw new Error(`Effect ${effectId} not loaded`);
    }

    // Clear previous animation
    this.stopAnimation();

    try {
      // Create isolated scope for effect execution
      this.executeEffectScript(script, text);
    } catch (error) {
      console.error(`Failed to execute effect ${effectId}:`, error);
      this.renderFallbackEffect(text);
    }
  }

  private executeEffectScript(script: string, text: string): void {
    if (!this.canvas || !this.ctx) return;

    // Create a safe execution environment
    const effectContext = {
      canvas: this.canvas,
      ctx: this.ctx,
      text: text,
      width: this.canvas.width,
      height: this.canvas.height,
      startTime: Date.now(),
      animationFrame: (callback: () => void) => {
        this.animationFrame = requestAnimationFrame(callback);
      },
      clearFrame: () => {
        if (this.animationFrame) {
          cancelAnimationFrame(this.animationFrame);
          this.animationFrame = null;
        }
      }
    };

    // Execute the effect script with the context
    try {
      const effectFunction = new Function('context', script);
      effectFunction(effectContext);
    } catch (error) {
      console.error('Effect script execution error:', error);
      this.renderFallbackEffect(text);
    }
  }

  private renderFallbackEffect(text: string): void {
    if (!this.ctx || !this.canvas) return;

    const ctx = this.ctx;
    const canvas = this.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Simple animated text effect as fallback
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated text
      ctx.font = '48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const hue = (frame * 2) % 360;
      ctx.fillStyle = `hsl(${hue}, 70%, 60%)`;

      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const scale = 1 + Math.sin(frame * 0.1) * 0.1;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      frame++;
      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }

  stopAnimation(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private getMockScript(effectId: string): string {
    const scripts: Record<string, string> = {
      'liquid-morph': `
        const { ctx, canvas, text, animationFrame } = context;
        let frame = 0;
        const particles = [];

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Background gradient
          const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          bgGradient.addColorStop(0, '#0f172a');
          bgGradient.addColorStop(1, '#1e293b');
          ctx.fillStyle = bgGradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';

          const x = canvas.width / 2;
          const y = canvas.height / 2;

          // Liquid morph effect
          const wobbleX = Math.sin(frame * 0.08) * 8;
          const wobbleY = Math.cos(frame * 0.12) * 4;
          const scale = 1 + Math.sin(frame * 0.1) * 0.15;

          ctx.save();
          ctx.translate(x + wobbleX, y + wobbleY);
          ctx.scale(scale, 1 / scale);

          const gradient = ctx.createLinearGradient(-100, -30, 100, 30);
          gradient.addColorStop(0, '#06b6d4');
          gradient.addColorStop(0.5, '#3b82f6');
          gradient.addColorStop(1, '#8b5cf6');

          ctx.fillStyle = gradient;
          ctx.fillText(text, 0, 0);
          ctx.restore();

          frame++;
          animationFrame(animate);
        }
        animate();
      `,
      'fire-write': `
        const { ctx, canvas, text, animationFrame } = context;
        let frame = 0;
        const particles = [];

        // Initialize particles
        for(let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 50,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            size: Math.random() * 3 + 1,
            life: Math.random() * 60 + 30
          });
        }

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Dark background
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Update and draw particles
          for(let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            if(p.life <= 0) {
              particles[i] = {
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 50,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 3 - 1,
                size: Math.random() * 3 + 1,
                life: Math.random() * 60 + 30
              };
            }

            const alpha = p.life / 60;
            ctx.fillStyle = \`rgba(255, \${100 + p.life}, 0, \${alpha})\`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          // Main text with fire gradient
          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';

          const gradient = ctx.createLinearGradient(0, canvas.height/2 - 40, 0, canvas.height/2 + 40);
          gradient.addColorStop(0, '#ff4500');
          gradient.addColorStop(0.3, '#ffa500');
          gradient.addColorStop(0.7, '#ff6b35');
          gradient.addColorStop(1, '#dc2626');

          ctx.fillStyle = gradient;
          ctx.fillText(text, canvas.width / 2, canvas.height / 2);

          // Glow effect
          ctx.shadowColor = '#ff4500';
          ctx.shadowBlur = 20;
          ctx.fillText(text, canvas.width / 2, canvas.height / 2);
          ctx.shadowBlur = 0;

          frame++;
          animationFrame(animate);
        }
        animate();
      `,
      'neon-glow': `
        const { ctx, canvas, text, animationFrame } = context;
        let frame = 0;

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Dark background with subtle grid
          ctx.fillStyle = '#0a0a0a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';

          const x = canvas.width / 2;
          const y = canvas.height / 2;

          // Multiple glow layers
          const glowIntensity = Math.sin(frame * 0.1) * 0.3 + 0.7;

          // Outer glow
          ctx.shadowColor = '#ff00ff';
          ctx.shadowBlur = 40 * glowIntensity;
          ctx.fillStyle = '#ff00ff';
          ctx.fillText(text, x, y);

          // Middle glow
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 20 * glowIntensity;
          ctx.fillStyle = '#00ffff';
          ctx.fillText(text, x, y);

          // Inner text
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(text, x, y);

          // Flickering effect
          if(Math.random() < 0.1) {
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, x + (Math.random() - 0.5), y + (Math.random() - 0.5));
          }

          ctx.shadowBlur = 0;
          frame++;
          animationFrame(animate);
        }
        animate();
      `,
      'particle-burst': `
        const { ctx, canvas, text, animationFrame } = context;
        let frame = 0;
        const particles = [];

        // Initialize particles
        for(let i = 0; i < 100; i++) {
          const angle = (i / 100) * Math.PI * 2;
          particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: Math.cos(angle) * (Math.random() * 5 + 2),
            vy: Math.sin(angle) * (Math.random() * 5 + 2),
            color: \`hsl(\${Math.random() * 360}, 70%, 60%)\`,
            size: Math.random() * 4 + 2,
            life: Math.random() * 60 + 60
          });
        }

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Background
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Update and draw particles
          for(let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life--;

            if(p.life <= 0) {
              const angle = Math.random() * Math.PI * 2;
              p.x = canvas.width / 2;
              p.y = canvas.height / 2;
              p.vx = Math.cos(angle) * (Math.random() * 5 + 2);
              p.vy = Math.sin(angle) * (Math.random() * 5 + 2);
              p.life = Math.random() * 60 + 60;
            }

            const alpha = p.life / 120;
            ctx.fillStyle = p.color.replace(')', \`, \${alpha})\`).replace('hsl', 'hsla');
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          // Central text
          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(text, canvas.width / 2, canvas.height / 2);

          frame++;
          animationFrame(animate);
        }
        animate();
      `,
      'glass-shatter': `
        const { ctx, canvas, text, animationFrame } = context;
        let frame = 0;
        const shards = [];

        // Initialize glass shards
        for(let i = 0; i < 30; i++) {
          shards.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 20 + 10,
            alpha: Math.random() * 0.5 + 0.3
          });
        }

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Dark background
          ctx.fillStyle = '#111';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Update and draw shards
          for(let i = 0; i < shards.length; i++) {
            const s = shards[i];
            s.x += s.vx;
            s.y += s.vy;
            s.rotation += s.rotSpeed;

            // Wrap around screen
            if(s.x < -50) s.x = canvas.width + 50;
            if(s.x > canvas.width + 50) s.x = -50;
            if(s.y < -50) s.y = canvas.height + 50;
            if(s.y > canvas.height + 50) s.y = -50;

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rotation);

            const gradient = ctx.createLinearGradient(-s.size/2, -s.size/2, s.size/2, s.size/2);
            gradient.addColorStop(0, \`rgba(200, 230, 255, \${s.alpha})\`);
            gradient.addColorStop(0.5, \`rgba(255, 255, 255, \${s.alpha * 0.8})\`);
            gradient.addColorStop(1, \`rgba(150, 200, 255, \${s.alpha * 0.6})\`);

            ctx.fillStyle = gradient;
            ctx.strokeStyle = \`rgba(255, 255, 255, \${s.alpha})\`;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(-s.size/2, -s.size/3);
            ctx.lineTo(s.size/3, -s.size/2);
            ctx.lineTo(s.size/2, s.size/3);
            ctx.lineTo(-s.size/3, s.size/2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
          }

          // Main text with glass effect
          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';

          const textGradient = ctx.createLinearGradient(0, canvas.height/2 - 30, 0, canvas.height/2 + 30);
          textGradient.addColorStop(0, '#e0f2fe');
          textGradient.addColorStop(0.5, '#bae6fd');
          textGradient.addColorStop(1, '#7dd3fc');

          ctx.fillStyle = textGradient;
          ctx.fillText(text, canvas.width / 2, canvas.height / 2);

          // Glass reflection
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillText(text, canvas.width / 2 + 2, canvas.height / 2 - 2);

          frame++;
          animationFrame(animate);
        }
        animate();
      `,
      'rainbow-wave': `
        const { ctx, canvas, text, animationFrame } = context;
        let frame = 0;

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Dark background
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';

          const x = canvas.width / 2;
          const y = canvas.height / 2;

          // Draw multiple text layers with different colors and offsets
          for(let i = 0; i < 7; i++) {
            const hue = (frame * 3 + i * 51) % 360;
            const offsetX = Math.sin(frame * 0.1 + i * 0.5) * 10;
            const offsetY = Math.cos(frame * 0.08 + i * 0.7) * 5;
            const scale = 1 + Math.sin(frame * 0.05 + i * 0.3) * 0.1;

            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.scale(scale, scale);

            ctx.fillStyle = \`hsl(\${hue}, 80%, 60%)\`;
            ctx.globalAlpha = 0.8;
            ctx.fillText(text, 0, 0);
            ctx.restore();
          }

          // Central white text
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 1;
          ctx.fillText(text, x, y);

          frame++;
          animationFrame(animate);
        }
        animate();
      `,
      'default': `
        const { ctx, canvas, text, animationFrame } = context;
        let frame = 0;

        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.font = '48px Inter, sans-serif';
          ctx.textAlign = 'center';

          const scale = 1 + Math.sin(frame * 0.05) * 0.1;
          const hue = (frame * 2) % 360;
          const x = canvas.width / 2;
          const y = canvas.height / 2;

          ctx.save();
          ctx.translate(x, y);
          ctx.scale(scale, scale);
          ctx.fillStyle = \`hsl(\${hue}, 70%, 60%)\`;
          ctx.fillText(text, 0, 0);
          ctx.restore();

          frame++;
          animationFrame(animate);
        }
        animate();
      `
    };

    return scripts[effectId] || scripts['default'];
  }
}

export const effectLoader = new EffectLoader();