// client/src/components/BackgroundAnimation.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const BackgroundAnimation = () => {
    const particlesInit = async (main) => {
        await loadSlim(main);
    };

    const options = {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#2e7d32" },
            shape: { type: "char", character: { value: ["🌿", "🍃"], fill: true, font: "Verdana", style: "", weight: "400" } },
            opacity: { value: 0.5, random: true, anim: { enable: false } },
            size: { value: 16, random: true, anim: { enable: false } },
            line_linked: { enable: false },
            move: {
                enable: true,
                speed: 1.5,
                direction: "bottom",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false } } },
        retina_detect: true,
        background: { color: "transparent" },
    };

    return <Particles id="tsparticles" init={particlesInit} options={options} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default BackgroundAnimation;