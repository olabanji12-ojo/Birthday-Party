import { confetti } from "@tsparticles/confetti";

export const firePoppers = (origin: "hero" | "rsvp") => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const countMultiplier = isMobile ? 0.6 : 1;

  if (origin === "hero") {
    // Bottom Left
    confetti({
      origin: { x: 0.1, y: 1.0 },
      particleCount: Math.floor(80 * countMultiplier),
      colors: ["#c9a84c", "#e8c96d", "#f5e6c0", "#ffffff"],
      spread: 70,
      startVelocity: 45,
      gravity: 1.2,
      ticks: 200,
      scalar: 1.1,
      zIndex: 9999,
    });

    // Bottom Right
    confetti({
      origin: { x: 0.9, y: 1.0 },
      particleCount: Math.floor(80 * countMultiplier),
      colors: ["#c9a84c", "#e8c96d", "#f5e6c0", "#ffffff"],
      spread: 70,
      startVelocity: 45,
      gravity: 1.2,
      ticks: 200,
      scalar: 1.1,
      zIndex: 9999,
    });
  } else if (origin === "rsvp") {
    // Bottom Left
    confetti({
      origin: { x: 0.1, y: 1.0 },
      particleCount: Math.floor(120 * countMultiplier),
      colors: ["#c9a84c", "#e8c96d", "#f5e6c0", "#ffffff", "#0a0e2e"],
      spread: 80,
      startVelocity: 50,
      ticks: 280,
      zIndex: 9999,
    });

    // Bottom Right
    confetti({
      origin: { x: 0.9, y: 1.0 },
      particleCount: Math.floor(120 * countMultiplier),
      colors: ["#c9a84c", "#e8c96d", "#f5e6c0", "#ffffff", "#0a0e2e"],
      spread: 80,
      startVelocity: 50,
      ticks: 280,
      zIndex: 9999,
    });

    // Top Center (Raining down)
    confetti({
      origin: { x: 0.5, y: 0.0 },
      particleCount: Math.floor(60 * countMultiplier),
      colors: ["#c9a84c", "#e8c96d", "#f5e6c0", "#ffffff", "#0a0e2e"],
      spread: 120,
      startVelocity: 30,
      gravity: 0.8,
      angle: 270,
      ticks: 280,
      zIndex: 9999,
    });
  }
};
