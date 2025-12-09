export default function Research() {
    return (
        <div className="page">
            {/* ParticleField removed. Background is now handled by CSS in .page */}

            {/* Radial blur overlay */}
            <div className="radial-blur"></div>

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
          background-color: #F2F2F0;
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

        /* --- CENTERED EMPTY STATE MESSAGE --- */
        .empty-state {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          text-align: center;
          width: 90%;
          max-width: 600px;
          pointer-events: none;
        }

        .empty-state-text {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          color: #0C0C0C;
          font-size: clamp(16px, 1.5vw + 8px, 24px);
          letter-spacing: -0.02em;
          margin-bottom: 1vh;
        }

        .empty-state-subtext {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          color: #0C0C0C;
          /* ~75% of the main text size */
          font-size: clamp(12px, 1.1vw + 6px, 18px);
          letter-spacing: -0.01em;
          opacity: 1; 
        }

        /* Mobile view: below 768px */
        @media (max-width: 768px) {
          .page {
            display: flex;
            flex-direction: column;
            padding: 0;
            height: 100vh;
            overflow: hidden;
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
          
          .empty-state {
            top: 55%; 
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
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }
        }

        /* Tablet/Desktop: 769px and above */
        @media (min-width: 769px) {
          
          .mobile-header,
          .mobile-simulation {
            display: none;
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

        /* Below 1280px: show shorter text versions */
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

            {/* --- SHARED ELEMENTS --- */}
            <div className="empty-state">
                <div className="empty-state-text">No Published Content Found</div>
                <div className="empty-state-subtext">
                    Please contact us regarding inquiries for proprietary documentation
                </div>
            </div>

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
                {/* Particle field removed, only background shows */}
            </div>

        </div>
    );
}