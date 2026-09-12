import { useState } from 'react'
import './Ideas.css'
import Silk from '../components/Silk'
import TextType from '../components/TextType'
import BlurText from '../components/BlurText'
import SplitText from '../components/SplitText'
import { Form } from '../components/SugestionForm'

const SGF_PARAGRAPHS = [
  'At Wavepoint, we value ideas from the people who use our platform every day.',
  'Your feedback helps us improve projects, tasks, workflows, and team collaboration.',
  'Whether it is a new feature, a better interface, or a simpler way to manage work, we want to hear your ideas.',
  'Every suggestion helps us make Wavepoint better and easier to use.',
]

const SUGGESTION_TYPES = [
  'We welcome ideas that can make Wavepoint simpler, smarter, and more useful for teams.',
  'New project management features',
  'Better task organization and prioritization',
  'Improved workflow customization and automation',
  'Enhanced team collaboration and communication',
  'Better workspace organization and visibility',
  'New integrations with popular productivity tools',
]
const CMT_CONTENT = [
  'All ideas shared through this page are handled responsibly and used only to help improve Wavepoint.',
  'Selected suggestions may be reviewed by our product team and considered for future features or improvements.',
  'We may contact you for additional details or clarification. Providing your contact information is optional.',
]

function Ideas() {
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    suggestion: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isPostingSuggestion, setIsPostingSuggestion] = useState(false)

  const handleQuoteComplete = () => {
    console.log('Quote animation completed!')
  }

  const handleSGComplete = () => {
    console.log('Suggestions heading animation completed!')
  }

  const handleLabelComplete = () => {
    console.log('Field label animation completed!')
  }

  const handleSubmitTextComplete = () => {
    console.log('Submit text animation completed!')
  }

  const handleSuccessTextComplete = () => {
    console.log('Success text animation completed!')
  }

  const handleSGTComplete = () => {
    console.log('Suggestion type animation completed!')
  }

  const handleCNTComplete = () => {
    console.log('Close note heading animation completed!')
  }

  const handleCNTCTComplete = () => {
    console.log('Close note content animation completed!')
  }

  const handleFTComplete = () => {
    console.log('Footer animation completed!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitSuggestion = async (payload) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/suggestion/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Name: payload.name,
        EmailId: payload.emailId,
        Suggestion: payload.suggestion,
      }),
    })

    const result = await response.json()
    return result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isPostingSuggestion) {
      return
    }

    if (
      !formData.name.trim() ||
      !formData.emailId.trim() ||
      !formData.suggestion.trim()
    ) {
      return
    }

    try {
      setIsPostingSuggestion(true)
      setSubmitted(false)

      const result = await handleSubmitSuggestion(formData)

      if (result.success) {
        setSubmitted(true)
        setFormData({
          name: '',
          emailId: '',
          suggestion: '',
        })
      } else {
        console.log(result.message)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setIsPostingSuggestion(false)
    }
  }

  return (
    <div className="Suggestions">
      <div className="Suggestions-background">
        <Silk
          speed={3.5}
          scale={1}
          color="#CCBEB1"
          noiseIntensity={2.5}
          rotation={0}
        />
      </div>

      <div className="Suggestions-Heading">
        <TextType
          text={[
            '- Welcome to Wavepoint Ideas ! -',
            '- Help Shape the Future of Teamwork -',
          ]}
          typingSpeed={70}
          deletingSpeed={45}
          pauseDuration={1200}
          initialDelay={300}
          showCursor
          cursorCharacter="|"
          cursorBlinkDuration={0.7}
          loop={true}
          className="heading-text"
        />
      </div>

      <div className="Suggestions-subheading">
        <BlurText
          text="The Best Ideas Come from the People Who Use Wavepoint Every Day and That Means You"
          delay={200}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleQuoteComplete}
          className="quote-text"
        />
      </div>

      <section className="Suggestions-content">
        <div className="Suggestions-stack">
          <div className="Suggestions-types">
            <div className="suggestions-type-heading">
              <SplitText
                key="Suggestions-types-heading"
                text="- What Kinds of Suggestions Are We Looking For? -"
                className="suggestions-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleSGComplete}
                showCallbacks={true}
              />
            </div>
          </div>

          <div className="Suggestions-types-list">
            {SUGGESTION_TYPES.map((type, index) => (
              <div className="suggestions-type" key={`suggestion-type-${index}`}>
                <SplitText
                  key={`suggestions-type-text-${index}`}
                  text={type}
                  className="suggestions-type-text"
                  delay={12}
                  duration={0.85}
                  ease="power2.out"
                  splitType="words"
                  from={{ opacity: 0, y: 18 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  onLetterAnimationComplete={handleSGTComplete}
                  textAlign="center"
                />
              </div>
            ))}
          </div>

          <div className="Suggestions-form-section">
            <div className="Suggestions-heading">
              <SplitText
                key="Suggestions-heading"
                text="- Share Your Improvement Ideas -"
                className="suggestions-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleSGComplete}
                showCallbacks={true}
              />
            </div>

            <div className="Suggestions-form">
              <Form onSubmit={handleSubmit} className="suggestion-form-shell">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    <SplitText
                      key="name-label"
                      text="Name"
                      className="form-label-text"
                      delay={22}
                      duration={0.7}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 16 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      rootMargin="0px"
                      textAlign="left"
                      onLetterAnimationComplete={handleLabelComplete}
                      showCallbacks={true}
                    />
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isPostingSuggestion}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="emailId" className="form-label">
                    <SplitText
                      key="email-label"
                      text="Email Id"
                      className="form-label-text"
                      delay={22}
                      duration={0.7}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 16 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      rootMargin="0px"
                      textAlign="left"
                      onLetterAnimationComplete={handleLabelComplete}
                      showCallbacks={true}
                    />
                  </label>
                  <input
                    id="emailId"
                    name="emailId"
                    type="email"
                    className="form-input"
                    placeholder="Enter your email id"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                    disabled={isPostingSuggestion}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="suggestion" className="form-label">
                    <SplitText
                      key="suggestion-label"
                      text="Suggestion"
                      className="form-label-text"
                      delay={22}
                      duration={0.7}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 16 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      rootMargin="0px"
                      textAlign="left"
                      onLetterAnimationComplete={handleLabelComplete}
                      showCallbacks={true}
                    />
                  </label>
                  <textarea
                    id="suggestion"
                    name="suggestion"
                    className="form-textarea"
                    placeholder="Share an Idea That Could Make Wavepoint Better"
                    value={formData.suggestion}
                    onChange={handleChange}
                    required
                    disabled={isPostingSuggestion}
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={isPostingSuggestion}
                >
                  <SplitText
                    key={isPostingSuggestion ? 'posting-text' : 'submit-text'}
                    text={isPostingSuggestion ? 'Posting Suggestion...' : 'Send Suggestion'}
                    className="form-submit-text"
                    delay={18}
                    duration={0.7}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 12 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    textAlign="center"
                    onLetterAnimationComplete={handleSubmitTextComplete}
                    showCallbacks={true}
                  />
                </button>

                {submitted && (
                  <div className="form-success-message">
                    <SplitText
                      key="success-text"
                      text="Thanks for suggesting! We appreciate your valuable Suggestion."
                      className="form-success-text"
                      delay={16}
                      duration={0.75}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 14 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      rootMargin="0px"
                      textAlign="center"
                      onLetterAnimationComplete={handleSuccessTextComplete}
                      showCallbacks={true}
                    />
                  </div>
                )}
              </Form>
            </div>

            <div className="Suggestions-info">
              {SGF_PARAGRAPHS.map((paragraph, index) => (
                <div
                  className="suggestions-paragraph-row"
                  key={`paragraph-row-${index}`}
                >
                  <SplitText
                    key={`suggestions-paragraph-${index}`}
                    text={paragraph}
                    className="suggestions-paragraph"
                    delay={12}
                    duration={0.85}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 18 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    textAlign="center"
                  />
                </div>
              ))}
            </div>

            <div className="Suggestions-closenote">
              <div className="Suggestions-closenote-heading">
                <SplitText
                  key="closenote-text"
                  text="- Our Commitment to You -"
                  className="closenote-text"
                  delay={16}
                  duration={0.75}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 14 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleCNTComplete}
                  showCallbacks={true}
                />
              </div>

              <div className="Suggestions-closenote-content">
                {CMT_CONTENT.map((sentence, index) => (
                  <div
                    className="closenote-sentence-row"
                    key={`closenote-row-${index}`}
                  >
                    <SplitText
                      key={`closenote-sentence-${index}`}
                      text={sentence}
                      className="closenote-sentence"
                      delay={20}
                      duration={0.85}
                      ease="power2.out"
                      splitType="words"
                      from={{ opacity: 0, y: 18 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      onLetterAnimationComplete={handleCNTCTComplete}
                      rootMargin="0px"
                      textAlign="center"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="Suggestions-footer">
              <SplitText
                key="Suggestions-footer"
                text="- From Planning to Progress, Powered by Wavepoint ! -"
                className="suggestions-footer-text"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleFTComplete}
                showCallbacks={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Ideas