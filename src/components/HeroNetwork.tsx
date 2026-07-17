"use client";

import { useEffect, useRef } from "react";

const LABELS = [
  "TYPESCRIPT",
  "PYTHON",
  "JAVASCRIPT",
  "GO",
  "RUST",
  "REACT",
  "NEXT.JS",
  "NODE.JS",
  "GRAPHQL",
  "DOCKER",
  "KAFKA",
  "POSTGRESQL",
  "MONGODB",
  "REDIS",
  "AWS",
  "KUBERNETES",
  "CI/CD",
  "MICROSERVICES",
  "WEBSOCKETS",
  "ELASTICSEARCH",
  "NGINX",
  "EXPRESS",
  "TAILWIND",
  "GITHUB ACTIONS",
];

const NODE_COUNT = 72;
const VISIBLE_LABELS = 4;
/** Minimum node-index gap so labels don't stack */
const MIN_NODE_GAP = 10;
/** Radians per second — full turn ~36s */
const ROTATION_SPEED = (Math.PI * 2) / 36;

type ActiveLabel = {
  nodeIndex: number;
  text: string;
  life: number;
  maxLife: number;
};

type ThemeColors = {
  ink: string;
  accent: string;
};

function pickLabel(exclude: Set<string>) {
  const pool = LABELS.filter((l) => !exclude.has(l));
  return pool[Math.floor(Math.random() * pool.length)] ?? LABELS[0];
}

function readThemeColors(): ThemeColors {
  const styles = getComputedStyle(document.documentElement);
  return {
    ink: styles.getPropertyValue("--ink").trim() || "#0f172a",
    accent: styles.getPropertyValue("--accent").trim() || "#22c55e",
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  if (clean.length < 6) return [148, 163, 184];
  const n = parseInt(clean.slice(0, 6), 16);
  if (Number.isNaN(n)) return [148, 163, 184];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(hex: string, alpha: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

function nodeGap(a: number, b: number) {
  const d = Math.abs(a - b) % NODE_COUNT;
  return Math.min(d, NODE_COUNT - d);
}

function isVisibleNode(nodeIndex: number, rotation: number) {
  const angle = (nodeIndex / NODE_COUNT) * Math.PI * 2 + rotation;
  // Keep labels on the open left arc, away from top/bottom extremes
  return Math.cos(angle) < -0.2;
}

function pickSpacedNode(rotation: number, used: number[]): number | null {
  const candidates: number[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    if (!isVisibleNode(i, rotation)) continue;
    if (used.some((u) => nodeGap(u, i) < MIN_NODE_GAP)) continue;
    candidates.push(i);
  }
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)] ?? null;
}

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;
    let rotation = 0;
    let lastTs = 0;
    let labelTimer = 0;
    let colors = readThemeColors();
    let lastSize = 0;
    const labels: ActiveLabel[] = [];

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const size = Math.max(Math.floor(rect.width), 1);
      if (size === lastSize) return;
      lastSize = size;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      colors = readThemeColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const spawnLabel = () => {
      if (labels.length >= VISIBLE_LABELS) return;
      const usedNodes = labels.map((l) => l.nodeIndex);
      const nodeIndex = pickSpacedNode(rotation, usedNodes);
      if (nodeIndex === null) return;
      const usedText = new Set(labels.map((l) => l.text));
      labels.push({
        nodeIndex,
        text: pickLabel(usedText),
        life: 0,
        maxLife: 5.6 + Math.random() * 4.4,
      });
    };

    for (let i = 0; i < VISIBLE_LABELS; i++) spawnLabel();

    const draw = (ts: number) => {
      if (disposed) return;

      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      rotation += ROTATION_SPEED * dt;
      labelTimer += dt;
      if (labelTimer > 1.1) {
        spawnLabel();
        labelTimer = 0;
      }

      const w = lastSize || wrap.clientWidth;
      const h = lastSize || wrap.clientHeight;
      if (w < 2) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.33;

      ctx.clearRect(0, 0, w, h);

      // Accent wash
      const wash = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.3);
      wash.addColorStop(0, rgba(colors.accent, 0.1));
      wash.addColorStop(1, rgba(colors.accent, 0));
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);

      // --- Rotating mesh (translate → rotate) ---
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      ctx.lineWidth = 0.85;
      for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * Math.PI * 2;
        const nx = Math.cos(angle) * radius;
        const ny = Math.sin(angle) * radius;

        const swirl = 0.52;
        const cAngle = angle + swirl * 0.55;
        const cDist = radius * 0.42;

        const alpha = 0.18 + ((i % 5) / 5) * 0.16;
        ctx.strokeStyle = rgba(colors.ink, alpha);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
          Math.cos(cAngle) * cDist,
          Math.sin(cAngle) * cDist,
          nx,
          ny,
        );
        ctx.stroke();
      }

      for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * Math.PI * 2;
        const accent = i % 8 === 0;
        ctx.beginPath();
        ctx.fillStyle = accent ? rgba(colors.accent, 0.85) : rgba(colors.ink, 0.55);
        ctx.arc(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          accent ? 2.6 : 1.6,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 36);
      glow.addColorStop(0, rgba(colors.accent, 0.95));
      glow.addColorStop(0.4, rgba(colors.accent, 0.25));
      glow.addColorStop(1, rgba(colors.accent, 0));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = colors.accent;
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // --- Labels: snapped to nodes, spaced, aligned on the ray ---
      ctx.font =
        "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";

      // Drop labels that drifted too close after rotation
      for (let i = 0; i < labels.length; i++) {
        for (let j = i + 1; j < labels.length; j++) {
          if (nodeGap(labels[i].nodeIndex, labels[j].nodeIndex) < MIN_NODE_GAP) {
            // Retire the older one early
            const older = labels[i].life >= labels[j].life ? i : j;
            labels[older].maxLife = Math.min(labels[older].maxLife, labels[older].life + 0.5);
          }
        }
      }

      for (let i = labels.length - 1; i >= 0; i--) {
        const label = labels[i];
        label.life += dt;

        const fadeIn = Math.min(1, label.life / 0.7);
        const fadeOut =
          label.life > label.maxLife - 0.9
            ? Math.max(0, (label.maxLife - label.life) / 0.9)
            : 1;
        const opacity = fadeIn * fadeOut;

        if (label.life >= label.maxLife) {
          labels.splice(i, 1);
          continue;
        }

        const worldAngle = (label.nodeIndex / NODE_COUNT) * Math.PI * 2 + rotation;
        if (Math.cos(worldAngle) > -0.15) {
          // Leaving the visible arc — fade out
          label.maxLife = Math.min(label.maxLife, label.life + 0.6);
        }

        const cos = Math.cos(worldAngle);
        const sin = Math.sin(worldAngle);
        const nx = cx + cos * radius;
        const ny = cy + sin * radius;

        // Tick + text sit on the same radial line outside the node
        const tickStart = radius + 5;
        const tickEnd = radius + 18;
        const textR = radius + 24;
        const textX = cx + cos * textR;
        const textY = cy + sin * textR;

        const text = `${label.text}...`;

        ctx.strokeStyle = rgba(colors.accent, 0.55 * opacity);
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(cx + cos * tickStart, cy + sin * tickStart);
        ctx.lineTo(cx + cos * tickEnd, cy + sin * tickEnd);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = rgba(colors.accent, 0.95 * opacity);
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fill();

        // Always right-align so text hangs to the left of the ray endpoint
        ctx.fillStyle = rgba(colors.ink, 0.82 * opacity);
        ctx.fillText(text, textX - 4, textY);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="hero-network pointer-events-none absolute top-1/2 right-0 z-[1] aspect-square w-[min(110vh,900px)] -translate-y-1/2 translate-x-1/2 sm:w-[min(115vh,980px)] lg:w-[min(120vh,1080px)]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
