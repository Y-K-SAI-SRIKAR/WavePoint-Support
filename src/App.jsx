import { useEffect, useRef, useState } from "react"
import Loader from "./components/Loader"
import Threads from "./components/Threads"
import Shuffle from "./components/Shuffle"
import TextType from "./components/TextType"
import SplitText from "./components/SplitText"
import BlurText from "./components/BlurText"
import ClickSpark from "./components/ClickSpark"
import CircularText from "./components/CircularText"
import PillNav from "./components/PillNav"
import { Footer } from "./components/Footer"
import "./App.css"

const logo = "/logo.svg"

const LOADER_DURATION = 14000
const FADE_DURATION = 900
const LOADER_TOTAL = LOADER_DURATION + FADE_DURATION

const SHUFFLE_PROPS = {
  shuffleDirection: "right",
  duration: 0.35,
  animationMode: "evenodd",
  shuffleTimes: 1,
  ease: "power3.out",
  stagger: 0.03,
  threshold: 0.1,
  triggerOnce: true,
  triggerOnHover: true,
  respectReducedMotion: true,
  loop: false,
  loopDelay: 0,
}

const ABOUT_PARAGRAPHS = [
  "Wavepoint is a modern SaaS platform that helps teams organize work and stay focused.",
  "Our mission is to simplify workflows by bringing tools, information, and collaboration into one workspace.",
  "Wavepoint helps teams manage tasks, track progress, and coordinate work with ease.",
  "With clear visibility and real-time updates, Wavepoint keeps teams aligned and moving forward.",
]

const WHY_PARAGRAPHS = [
  "Wavepoint brings your team's work, tasks, and workflows together in one organized and easy-to-use platform.",
  "Our platform helps teams simplify complex processes, track progress, and stay aligned with clear visibility across their work.",
  "With centralized information and real-time updates, Wavepoint reduces unnecessary complexity and keeps everyone moving in the same direction.",
  "Built for flexibility and growth, Wavepoint helps businesses work smarter, collaborate better, and stay on course as they scale.",
]

const WHAT_EXP = [
  "We want to help teams simplify work, organize workflows, and manage everything in one place.",
  "We value your feedback and use it to improve Wavepoint and build better features.",
  "We welcome partnerships and integrations that make Wavepoint more useful and connected.",
  "We believe great software grows with its users. We listen, improve, and keep teams moving forward.",
]

let loaderAlreadyShown = false

export default function App() {
  const [isLoaderVisible, setIsLoaderVisible] = useState(!loaderAlreadyShown)
  const [isLoaderFading, setIsLoaderFading] = useState(false)

  const [showHeroIntro, setShowHeroIntro] = useState(loaderAlreadyShown)
  const [showQuote, setShowQuote] = useState(loaderAlreadyShown)
  const [showAbout, setShowAbout] = useState(loaderAlreadyShown)
  const [showWhy, setShowWhy] = useState(loaderAlreadyShown)
  const [showWhat, setShowWhat] = useState(loaderAlreadyShown)
  const [showContact, setShowContact] = useState(loaderAlreadyShown)
  const [showMark, setShowMark] = useState(loaderAlreadyShown)
  const [showFooter, setShowFooter] = useState(loaderAlreadyShown)

  const footerRef = useRef(null)

  const handleAnimationComplete = () => {
    console.log("All letters have animated!")
  }

  const handleAboutComplete = () => {
    console.log("About heading animation completed!")
  }

  const handleQuoteComplete = () => {
    console.log("Quote blur animation completed!")
  }

  const handleWhyComplete = () => {
    console.log("Why heading animation completed!")
  }

  const handleWhatComplete = () => {
    console.log("What heading animation complete!")
  }

  useEffect(() => {
    if (loaderAlreadyShown) {
      setShowHeroIntro(true)
      setShowQuote(true)
      setShowAbout(true)
      setShowWhy(true)
      setShowWhat(true)
      setShowContact(true)
      setShowMark(true)
      setShowFooter(true)
      return
    }

    const fadeTimer = setTimeout(() => {
      setIsLoaderFading(true)
    }, LOADER_DURATION)

    const removeTimer = setTimeout(() => {
      setIsLoaderVisible(false)
      loaderAlreadyShown = true
    }, LOADER_TOTAL)

    const heroTimer = setTimeout(() => {
      setShowHeroIntro(true)
    }, LOADER_TOTAL + 80)

    const quoteTimer = setTimeout(() => {
      setShowQuote(true)
    }, LOADER_TOTAL + 500)

    const aboutTimer = setTimeout(() => {
      setShowAbout(true)
    }, LOADER_TOTAL + 850)

    const whyTimer = setTimeout(() => {
      setShowWhy(true)
    }, LOADER_TOTAL + 1100)

    const whatTimer = setTimeout(() => {
      setShowWhat(true)
    }, LOADER_TOTAL + 1350)

    const contactTimer = setTimeout(() => {
      setShowContact(true)
    }, LOADER_TOTAL + 1500)

    const markTimer = setTimeout(() => {
      setShowMark(true)
    }, LOADER_TOTAL + 1650)

    const footerTimer = setTimeout(() => {
      setShowFooter(true)
    }, LOADER_TOTAL + 1800)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      clearTimeout(heroTimer)
      clearTimeout(quoteTimer)
      clearTimeout(aboutTimer)
      clearTimeout(whyTimer)
      clearTimeout(whatTimer)
      clearTimeout(contactTimer)
      clearTimeout(markTimer)
      clearTimeout(footerTimer)
    }
  }, [])

  useEffect(() => {
    if (!showFooter || !footerRef.current) return

    const node = footerRef.current
    const observer = new IntersectionObserver(
      () => {},
      {
        root: null,
        threshold: 0.15,
      }
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
      observer.disconnect()
    }
  }, [showFooter])

  return (
    <div className="app">
      <ClickSpark
        sparkColor="#ffffff"
        sparkSize={12}
        sparkRadius={15}
        sparkCount={7}
        duration={400}
      >
        <div className="background-layer">
          <Threads
            color={[1, 1, 1]}
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>

        {isLoaderVisible && (
          <div className={`loader-overlay ${isLoaderFading ? "loader-overlay--fade" : ""}`}>
            <Loader />
          </div>
        )}

        <main className="app-content">
          <section className="hero-section">
            <div className="heading-wrapper">
              <div className="heading-row">
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="W"
                  style={{ color: "#4a90ff", fontSize: "7.5rem" }}
                />
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="ave"
                  style={{ color: "#ffffff" }}
                />
                <span className="heading-space" />
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="P"
                  style={{ color: "#ff4444", fontSize: "7.5rem" }}
                />
                <Shuffle
                  {...SHUFFLE_PROPS}
                  text="oint"
                  style={{ color: "#ffffff" }}
                />
              </div>

              {showHeroIntro && (
                <SplitText
                  key="split-after-loader"
                  text="- WORK SMART. STAY ON COURSE -"
                  className="split-text-sub"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                  showCallbacks={true}
                />
              )}

              {showHeroIntro && (
                <TextType
                  text={["Welcome to WavePoint Support !"]}
                  typingSpeed={70}
                  deletingSpeed={45}
                  pauseDuration={1200}
                  initialDelay={300}
                  showCursor
                  cursorCharacter="|"
                  cursorBlinkDuration={0.7}
                  loop={true}
                  className="subheading-text"
                />
              )}

              {showHeroIntro && (
                <div className="hero-pill-nav">
                  <PillNav
                    logo={logo}
                    logoAlt="Company Logo"
                    items={[
                      { label: "GET HELP", href: "/gethelp" },
                      { label: "SUPPORT", href: "/support" },
                      { label: "MY REQUESTS", href: "/myrequests" },
                      { label: "IDEAS", href: "/ideas" },
                      { label: "FEEDBACK", href: "/feedback" },
                      { label: "UPDATES", href: "/Updates" },
                      { label: "SIGN IN", href: "/PreAdmin" },
                    ]}
                    activeHref="/"
                    ease="power2.easeOut"
                    baseColor="#ffffff"
                    pillColor="#000000"
                    hoveredPillTextColor="#000000"
                    pillTextColor="#ffffff"
                    theme="dark"
                    initialLoadAnimation={true}
                  />
                </div>
              )}
            </div>
          </section>

          {showQuote && (
            <section className="quote-section">
              <div className="quote-inner">
                <BlurText
                  key="quote-blur"
                  text="When Work Moves Fast, Wavepoint Keeps You On Course With Smarter Tools And Reliable Support."
                  delay={200}
                  animateBy="words"
                  direction="bottom"
                  onAnimationComplete={handleQuoteComplete}
                  className="quote-text"
                />
              </div>
            </section>
          )}

          {showAbout && (
            <section className="about-section">
              <div className="about-inner">
                <div className="about-title-wrap">
                  <SplitText
                    key="about-heading"
                    text="- ABOUT WavePoint -"
                    className="about-title"
                    delay={45}
                    duration={1.1}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 28 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={handleAboutComplete}
                    showCallbacks={true}
                  />
                </div>

                <section className="about-panel">
                  <div className="about-content">
                    {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                      <div className="about-block" key={index}>
                        <SplitText
                          key={`about-paragraph-${index}`}
                          text={paragraph}
                          className="about-paragraph"
                          delay={12}
                          duration={0.85}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 18 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="left"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          )}

          {showWhy && (
            <section className="why-section">
              <div className="why-inner">
                <div className="why-title-wrap">
                  <SplitText
                    key="why-heading"
                    text="- WHY WavePoint ? -"
                    className="why-title"
                    delay={45}
                    duration={1.1}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 28 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={handleWhyComplete}
                    showCallbacks={true}
                  />
                </div>

                <section className="why-panel">
                  <div className="why-content">
                    {WHY_PARAGRAPHS.map((paragraph, index) => (
                      <div className="why-block" key={index}>
                        <SplitText
                          key={`why-paragraph-${index}`}
                          text={paragraph}
                          className="why-paragraph"
                          delay={12}
                          duration={0.85}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 18 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="left"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          )}

          {showWhat && (
            <section className="What-section">
              <div className="What-title-wrap">
                <SplitText
                  key="What-heading"
                  text="- Open to Strategic Partnerships, Investment -"
                  className="What-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleWhatComplete}
                  showCallbacks={true}
                />
              </div>

              <div className="What-content">
                <div className="What-content-wrapper">
                  {WHAT_EXP.map((paragraph, index) => (
                    <div className="What-block" key={index}>
                      <SplitText
                        key={`What-paragraph-${index}`}
                        text={paragraph}
                        className="What-paragraph"
                        delay={12}
                        duration={0.85}
                        ease="power2.out"
                        splitType="words"
                        from={{ opacity: 0, y: 18 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.05}
                        rootMargin="0px"
                        textAlign="left"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {showMark && (
            <section className="mark-section">
              <div className="mark-inner">
                <CircularText
                  text="WavePoint * Work-Smart * "
                  onHover="speedUp"
                  spinDuration={15}
                  className="mark-class"
                />
              </div>
            </section>
          )}

          {showFooter && (
            <div ref={footerRef} className="footer-wrap">
              <Footer />
            </div>
          )}

        </main>
      </ClickSpark>
    </div>
  )
}