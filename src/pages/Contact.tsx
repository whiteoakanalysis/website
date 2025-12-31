import { useState, useEffect, useRef } from 'react';
import ParallaxImage from '../components/ParallaxImage';

/**
 * StaticDotGrid
 * Renders the dot grid background statically.
 */
const StaticDotGrid = ({ dotColor = "#A6A6A4", gridSpacing = 40, dotSize = 1 }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const drawDots = (ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number) => {
        ctx.clearRect(0, 0, w * dpr, h * dpr);
        ctx.fillStyle = dotColor;
        for (let y = 0; y <= h; y += gridSpacing) {
            for (let x = 0; x <= w; x += gridSpacing) {
                ctx.beginPath();
                ctx.arc(x * dpr, y * dpr, dotSize * dpr, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            drawDots(ctx, w, h, dpr);
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [dotColor, gridSpacing, dotSize]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                pointerEvents: "none",
                zIndex: -10,
                backgroundColor: "#F2F2F0"
            }}
        />
    );
};

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Check honeypot
        if (formData.get('website')) {
            return; // Likely a bot
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzYXbcCxJqdjh9r8bVPVG3W2bqRmPwC5vD_pifAghH1EaRg_bXhPmOxQAHwWoQi81Ln/exec', {
                method: 'POST',
                body: new URLSearchParams(formData as any)
            });

            if (response.ok) {
                window.location.href = '/contact_success';
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            {/* Background Dots */}
            <StaticDotGrid />

            {/* Radial blur overlay (z-index: 0) */}
            <div className="radial-blur"></div>

            {/* Parallax Image 
                - 25% from left (1/4 left)
                - 75% from top
                - 90vw width
                - Forced ABOVE blur via CSS override
            */}
            <div className="desktop-parallax">
                <ParallaxImage
                    src="/stocks_img.png"
                    positionX="25%"
                    positionY="75%"
                    width="90vw"
                />
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        :root {
          --phi: 1.414;
          --invphi: calc(1 / var(--phi));
          --comp: calc(1 - var(--invphi));
        }

        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .page {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .radial-blur {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(
            circle at center,
            transparent 0%,
            transparent 30%,
            rgba(242, 242, 240, 0.25) 50%,
            rgba(242, 242, 240, 0.75) 70%,
            rgba(242, 242, 240, 1) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .box {
          position: absolute;
        }

        .honeypot {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }

        /* Parallax Styling */
        .desktop-parallax {
          display: none;
        }
        
        /* OVERRIDE: Force parallax wrapper above the radial blur (which is z-index 0) */
        .desktop-parallax .parallax-wrapper {
            z-index: 1 !important; 
        }

        /* Desktop Contact Form */
        .contact-form-desktop {
          display: none;
        }

        .contact-form-mobile {
          display: none;
        }

        /* Mobile view: below 768px */
        @media (max-width: 768px) {
          .page {
            display: flex;
            flex-direction: column;
            padding: 0;
            height: 100vh;
            overflow: hidden;
            background-color: #F2F2F0;
          }

          .box,
          .divider-bar,
          .yellow-content,
          .blue-content {
            display: none !important;
          }

          .radial-blur {
            display: block !important;
          }

          /* Mobile Header */
          .mobile-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 4vh 6vw 2vh 6vw;
            background: #0C0C0C;
            box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.15);
            z-index: 100;
            height: calc(100vh * var(--comp));
            box-sizing: border-box;
          }

          .mobile-logo-section {
            display: flex;
            align-items: flex-end;
            gap: 3vw;
            flex-shrink: 0;
          }

          .mobile-logo-section img {
            height: 10vh;
            width: auto;
          }

          .mobile-text-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .mobile-white-oak-text {
            font-family: 'Inter', sans-serif;
            font-size: 5.5vh;
            font-weight: 900;
            color: #F2F2F0;
            line-height: 1;
            margin: 0 0 0.5vh 0;
            letter-spacing: -0.3vh;
          }

          .mobile-analytics-text {
            font-family: 'Inter', sans-serif;
            font-size: 2.8vh;
            font-weight: 400;
            color: #F2F2F0;
            line-height: 1;
            margin: 0;
            letter-spacing: -0.2vh;
            border-bottom: 0.8vh solid #BDB0D9;
          }

          /* Fixed height divider */
          .mobile-divider-bar {
            width: 70vw;
            height: 6px;
            background-color: #F2F2F0;
            border-radius: 3px;
            margin: 2vh 0;
          }

          .mobile-nav {
            display: flex;
            gap: 8vw;
            width: 100%;
            justify-content: center;
            padding-bottom: 2vh;
          }

          .mobile-nav-link {
            font-family: 'Inter', sans-serif;
            font-size: 4vw;
            font-weight: 600;
            color: #F2F2F0;
            text-decoration: none;
            padding-bottom: 0.8vh;
            border-bottom: 0.8vh solid transparent;
            transition: border-bottom 0.2s ease;
          }

          .mobile-nav-link:hover {
            border-bottom: 0.8vh solid #BDB0D9;
          }

          .mobile-nav-link:active {
            border-bottom: 0.8vh solid #BDB0D9;
          }

          .mobile-simulation {
            height: calc(100vh * var(--invphi));
            display: flex;
            align-items: flex-start;
            justify-content: center;
            position: relative;
            overflow-y: auto;
            padding: 3vh 5vw;
            box-sizing: border-box;
          }

          /* Mobile Contact Form */
          .contact-form-mobile {
            display: block;
            width: 100%;
            max-width: 500px;
          }

          .contact-form-mobile h2 {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            color: #0C0C0C;
            font-size: 6vw;
            letter-spacing: -0.02em;
            margin: 0 0 1vh 0;
            text-align: center;
          }

          .contact-form-mobile p {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            color: #0C0C0C;
            font-size: 3.5vw;
            opacity: 0.7;
            margin: 0 0 3vh 0;
            text-align: center;
          }

          .contact-form-mobile .form-group {
            margin-bottom: 2.5vh;
          }

          .contact-form-mobile label {
            display: block;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            color: #0C0C0C;
            font-size: 3.5vw;
            margin-bottom: 1vh;
          }

          .contact-form-mobile input[type="text"],
          .contact-form-mobile input[type="email"],
          .contact-form-mobile select,
          .contact-form-mobile textarea {
            width: 100%;
            padding: 2vh 3vw;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 3.5vw;
            color: #0C0C0C;
            background: #FFFFFF;
            border: 2px solid #0C0C0C;
            border-radius: 8px;
            box-sizing: border-box;
          }

          .contact-form-mobile select {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230C0C0C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 3vw center;
            background-size: 5vw;
            padding-right: 10vw;
          }

          .contact-form-mobile textarea {
            resize: vertical;
            min-height: 15vh;
          }

          .contact-form-mobile button[type="submit"] {
            width: 100%;
            padding: 2vh;
            margin-top: 2vh;
            font-family: 'Inter', sans-serif;
            font-size: 4vw;
            font-weight: 600;
            color: #0C0C0C;
            background: #BDB0D9;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }

          .contact-form-mobile button[type="submit"]:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        }

        /* Tablet/Desktop: 769px and above */
        @media (min-width: 769px) {
          
          .mobile-header,
          .mobile-simulation {
            display: none;
          }

          /* Show Parallax */
          .desktop-parallax {
            display: block;
          }

          /* Desktop Contact Form - CENTERED IN RIGHT HALF */
          .contact-form-desktop {
            display: block;
            position: absolute;
            
            /* Vertical Center relative to bottom section (unchanged) */
            top: calc(50% + (100vh * var(--comp)) / 2);
            
            /* Horizontal Center of RIGHT HALF */
            left: 75%; 
            transform: translate(-50%, -50%);
            
            z-index: 5;
            
            /* Sizing - Half page width */
            width: 50%;
            
            height: calc(100vh * var(--invphi) - 6vh);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 4vw;
            box-sizing: border-box;
          }

          .contact-form-desktop h2 {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            color: #0C0C0C;
            font-size: clamp(20px, 2vw, 32px);
            letter-spacing: -0.02em;
            margin: 0 0 0.5vh 0;
            text-align: center;
            flex-shrink: 0;
          }

          .contact-form-desktop p {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            color: #0C0C0C;
            font-size: clamp(13px, 1vw, 16px);
            opacity: 0.7;
            margin: 0 0 2.5vh 0;
            text-align: center;
            flex-shrink: 0;
          }

          .contact-form-desktop form {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            min-height: 0;
          }

          .contact-form-desktop .form-group {
            margin-bottom: 0;
            flex-shrink: 0;
          }

          .contact-form-desktop .form-row {
            display: flex;
            gap: 2vw;
            margin-bottom: 0;
            flex-shrink: 0;
          }

          .contact-form-desktop .form-row .form-group {
            flex: 1;
            margin-bottom: 0;
          }

          .contact-form-desktop label {
            display: block;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            color: #0C0C0C;
            font-size: clamp(11px, 0.9vw, 14px);
            margin-bottom: 0.6vh;
          }

          .contact-form-desktop input[type="text"],
          .contact-form-desktop input[type="email"],
          .contact-form-desktop select,
          .contact-form-desktop textarea {
            width: 100%;
            padding: 1vh 1vw;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(12px, 0.9vw, 14px);
            color: #0C0C0C;
            background: #FFFFFF;
            border: 2px solid #0C0C0C;
            border-radius: 6px;
            box-sizing: border-box;
            transition: border-color 0.2s ease;
          }

          .contact-form-desktop input:focus,
          .contact-form-desktop select:focus,
          .contact-form-desktop textarea:focus {
            outline: none;
            border-color: #BDB0D9;
          }

          .contact-form-desktop select {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230C0C0C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 1vw center;
            background-size: 1.2vw;
            padding-right: 3vw;
            cursor: pointer;
          }

          .contact-form-desktop textarea {
            resize: vertical;
            flex: 1;
            min-height: 8vh;
          }

          .contact-form-desktop button[type="submit"] {
            display: block;
            margin: 0 auto;
            padding: 1vh 4vw;
            font-family: 'Inter', sans-serif;
            font-size: clamp(13px, 1vw, 15px);
            font-weight: 600;
            color: #0C0C0C;
            background: #BDB0D9;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.1s ease;
            flex-shrink: 0;
          }

          .contact-form-desktop button[type="submit"]:hover:not(:disabled) {
            background: #D4CBEA;
          }

          .contact-form-desktop button[type="submit"]:active:not(:disabled) {
            transform: scale(0.98);
          }

          .contact-form-desktop button[type="submit"]:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .red {
            background: #0C0C0C;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: calc(100vh * var(--invphi));
            opacity: 0;
          }

          .yellow {
            background: #0C0C0C;
            top: 0;
            left: 0;
            width: calc(100vw * var(--invphi));
            height: calc(100vh * var(--comp));
            opacity: 1;
            box-shadow: 0 0.63vh 1.27vh rgba(0, 0, 0, 0.5);
          }

          .yellow-content {
            position: absolute;
            top: 0;
            left: 0;
            width: calc(100vw * var(--invphi));
            height: calc(100vh * var(--comp));
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            z-index: 10;
            box-sizing: border-box;
            overflow: visible;
          }

          .yellow-links {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 3vw;
            margin-left: 4vw;
            position: relative;
            overflow: visible;
          }

          .yellow-link-wrapper {
            position: relative;
            text-align: left;
            display: flex;
            align-items: center;
            overflow: visible;
          }

          .yellow-link {
            font-family: 'Inter', sans-serif;
            font-size: clamp(1.2rem, 1.5vw + 0.5rem, 2rem);
            font-weight: 600;
            color: #F2F2F0;
            text-decoration: none;
            cursor: pointer;
            transition: opacity 0.2s ease, border-bottom 0.2s ease;
            border-bottom: 0.47vh solid transparent;
            padding-bottom: 0.32vh;
            display: inline-block;
            white-space: nowrap;
          }

          .yellow-link:hover {
            border-bottom: 0.47vh solid #BDB0D9;
          }

          .yellow-link-wrapper:hover .yellow-link {
            border-bottom: 0.47vh solid #BDB0D9;
          }

          .yellow-temp-text {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(0.8rem, 0.7vw + 0.5rem, 1rem);
            line-height: 1.5;
            font-weight: 400;
            color: #F2F2F0;
            text-align: left;
            margin: 0;
            margin-left: 0;
            max-width: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-width 0.4s ease, opacity 0.4s ease, margin-left 0.4s ease;
            white-space: nowrap;
            text-decoration: none;
          }

          .yellow-link-wrapper:hover .yellow-temp-text {
            max-width: 39vw;
            opacity: 1;
            margin-left: 2vw;
            text-decoration: none;
          }

          .yellow-temp-text-short {
            display: none;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(0.8rem, 0.7vw + 0.5rem, 1rem);
            line-height: 1.5;
            font-weight: 400;
            color: #F2F2F0;
            text-align: left;
            margin: 0;
            margin-left: 0;
            max-width: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-width 0.4s ease, opacity 0.4s ease, margin-left 0.4s ease;
            white-space: nowrap;
            text-decoration: none;
          }

          .blue {
            background: #0C0C0C;
            top: 0;
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--comp));
            opacity: 1;
            box-shadow: 0 0.63vh 1.27vh rgba(0, 0, 0, 0.5);
          }

          .blue-content {
            position: absolute;
            top: 0;
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--comp));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }

          .glass-container {
            display: flex;
            align-items: flex-end;
            gap: 1.56vw;
            padding: 4.44vh 2.19vw 3.49vh 2.19vw;
            border-radius: 0.78vw;
          }

          .logo-container img {
            height: 11.89vh;
            width: auto;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .white-oak-text {
            font-family: 'Inter', sans-serif;
            font-size: 6.34vh;
            font-weight: 900;
            color: #F2F2F0;
            line-height: 1;
            margin: 0 0 0.63vh 0;
            letter-spacing: -0.16vw;
            word-spacing: 0.39vw;
          }

          .analytics-text {
            font-family: 'Inter', sans-serif;
            font-size: 3.17vh;
            font-weight: 400;
            color: #F2F2F0;
            line-height: 1;
            margin: 0;
            letter-spacing: -0.16vw;
            border-bottom: 0.47vh solid #BDB0D9;
          }

          .divider-bar {
            position: absolute;
            top: calc((100vh * var(--comp)) * 0.15);
            left: calc(100vw * var(--invphi) - 0.23vw);
            width: 0.16vw;
            height: calc((100vh * var(--comp)) * 0.7);
            background-color: #F2F2F0;
            border-radius: 0.08vw;
            z-index: 5;
            pointer-events: none;
          }
        }

        /* Below 1152px: show shorter text versions */
        @media (max-width: 1152px) and (min-width: 769px) {
          .yellow-temp-text {
            display: none !important;
          }

          .yellow-temp-text-short {
            display: block;
          }

          .yellow-link-wrapper:hover .yellow-temp-text-short {
            max-width: 25vw;
            opacity: 1;
            margin-left: 2vw;
          }
        }
      `}</style>

            {/* --- DESKTOP-ONLY ELEMENTS --- */}
            <div className="box red"></div>
            <div className="box blue"></div>
            <div className="box yellow"></div>

            <div className="divider-bar"></div>

            <div className="yellow-content">
                <div className="yellow-links">
                    <div className="yellow-link-wrapper">
                        <a href="/about" className="yellow-link">About</a>
                        <a href="/about" className="yellow-temp-text">
                            A brief on our origins, philosophy, and direction.
                        </a>
                        <a href="/about" className="yellow-temp-text-short">
                            Our story
                        </a>
                    </div>
                    <div className="yellow-link-wrapper">
                        <a href="/research" className="yellow-link">Research</a>
                        <a href="/research" className="yellow-temp-text">
                            An overview of our ongoing studies and findings.
                        </a>
                        <a href="/research" className="yellow-temp-text-short">
                            Our work
                        </a>
                    </div>
                    <div className="yellow-link-wrapper">
                        <a href="/contact" className="yellow-link">Contact</a>
                        <a href="/contact" className="yellow-temp-text">
                            Reach out for inquiries, collaborations, or opportunities.
                        </a>
                        <a href="/contact" className="yellow-temp-text-short">
                            Get in touch
                        </a>
                    </div>
                </div>
            </div>

            <div className="blue-content">
                <a href="/" className="logo-link" style={{ textDecoration: "none" }}>
                    <div className="glass-container">
                        <div className="logo-container">
                            <img src="/WOA_logo_white.svg" alt="WOA Logo" />
                        </div>
                        <div className="text-container">
                            <h1 className="white-oak-text">WHITE OAK</h1>
                            <p className="analytics-text">Analysis .</p>
                        </div>
                    </div>
                </a>
            </div>

            {/* --- MOBILE-ONLY ELEMENTS --- */}
            <div className="mobile-header">
                <a href="/" style={{ textDecoration: "none" }}>
                    <div className="mobile-logo-section">
                        <div className="mobile-logo-container">
                            <img src="/WOA_logo_white.svg" alt="WOA Logo" />
                        </div>
                        <div className="mobile-text-container">
                            <h1 className="mobile-white-oak-text">WHITE OAK</h1>
                            <p className="mobile-analytics-text">Analysis .</p>
                        </div>
                    </div>
                </a>

                <div className="mobile-divider-bar"></div>

                <nav className="mobile-nav">
                    <a href="/about" className="mobile-nav-link">About</a>
                    <a href="/research" className="mobile-nav-link">Research</a>
                    <a href="/contact" className="mobile-nav-link">Contact</a>
                </nav>
            </div>

            <div className="mobile-simulation">
                <div className="contact-form-mobile">
                    <h2>Contact Us</h2>
                    <p>We'd love to hear from you.</p>

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="website" className="honeypot" tabIndex={-1} autoComplete="off" />

                        <div className="form-group">
                            <label htmlFor="reason-mobile">Reason for Contact</label>
                            <select name="reason" id="reason-mobile" required>
                                <option value="" disabled selected>Select an option...</option>
                                <option value="Partnership">Partnership</option>
                                <option value="Client Inquiries">Client Inquiries</option>
                                <option value="Careers & Internships">Careers & Internships</option>
                                <option value="Media">Media</option>
                                <option value="General Inquiries">General Inquiries</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="fullname-mobile">Full Name</label>
                            <input type="text" name="fullname" id="fullname-mobile" placeholder="First Last" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email-mobile">Email</label>
                            <input type="email" name="email" id="email-mobile" placeholder="email@example.com" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message-mobile">Message</label>
                            <textarea name="message" id="message-mobile" rows={5} placeholder="Enter your inquiry" required></textarea>
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Desktop Contact Form */}
            <div className="contact-form-desktop">
                <h2>Contact Us</h2>
                <p>We'd love to hear from you.</p>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="website" className="honeypot" tabIndex={-1} autoComplete="off" />

                    <div className="form-group">
                        <label htmlFor="reason-desktop">Reason for Contact</label>
                        <select name="reason" id="reason-desktop" required>
                            <option value="" disabled selected>Select an option...</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Client Inquiries">Client Inquiries</option>
                            <option value="Careers & Internships">Careers & Internships</option>
                            <option value="Media">Media</option>
                            <option value="General Inquiries">General Inquiries</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="fullname-desktop">Name</label>
                            <input type="text" name="fullname" id="fullname-desktop" placeholder="First Last" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email-desktop">Email</label>
                            <input type="email" name="email" id="email-desktop" placeholder="email@example.com" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message-desktop">Message</label>
                        <textarea name="message" id="message-desktop" rows={4} placeholder="Enter your inquiry" required></textarea>
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                </form>
            </div>

        </div>
    );
}