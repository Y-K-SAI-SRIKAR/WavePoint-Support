import './FeedBack.css'
import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Silk from '../components/Silk'
import TextType from '../components/TextType'
import BlurText from '../components/BlurText'
import SplitText from '../components/SplitText'
import { Form as FormPrimitive } from '@base-ui/react/form'
import Carousel from '../components/Carousel'

const RV_TYPES = [
  'Rate your Wavepoint experience and help us understand what we can improve.',
  'Overall Experience',
  'Project and Task Management',
  'Workflow and Collaboration',
  'Customer Support Quality',
]

const RV_END = [
  'Your feedback helps us improve Wavepoint and create a better experience for teams.',
  'Whether you are sharing your daily experience or suggesting an improvement, every review helps us build better.'
]

const ASPECT_OPTIONS = [
  { value: 'Projects & Tasks', label: 'Projects & Tasks' },
  { value: 'Collaboration', label: 'Collaboration' },
  { value: 'Customer Support', label: 'Customer Support' },
  { value: 'Pricing & Billing', label: 'Pricing & Billing' },
]

const RV_FTR_NT = [
  'Read reviews from Wavepoint users sharing their real experiences with the platform.',
  'These honest experiences highlight what works well and where Wavepoint can improve.',
  'They provide a realistic view of the platform and help us build a better product.',
]

const RVEC_GUD = [
  'To keep reviews genuine and helpful, please follow these guidelines:',
  'Reviews should be based on your actual experience with Wavepoint.',
  'Do not share personal or sensitive information in your review.',
  'Keep your feedback respectful, relevant, and constructive.',
  'Fraudulent or inappropriate reviews may be removed.',
]

function FeedBack() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clientID: '',
    reviewerCategory: '',
    aspectOfReview: '',
    reviewText: '',
  })

  const [status, setStatus] = useState({
    type: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectOpen, setSelectOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState({})
  const triggerRef = useRef(null)
  const portalRef = useRef(null)

  const updateDropdownPosition = useCallback(() => {
    if (!triggerRef.current) return

    const rect = triggerRef.current.getBoundingClientRect()
    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    })
  }, [])

  useEffect(() => {
    if (!selectOpen) return

    updateDropdownPosition()
    window.addEventListener('resize', updateDropdownPosition)
    window.addEventListener('scroll', updateDropdownPosition, true)

    return () => {
      window.removeEventListener('resize', updateDropdownPosition)
      window.removeEventListener('scroll', updateDropdownPosition, true)
    }
  }, [selectOpen, updateDropdownPosition])

  useEffect(() => {
    if (!selectOpen) return

    const handler = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        portalRef.current &&
        !portalRef.current.contains(e.target)
      ) {
        setSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [selectOpen])

  const handleQuoteComplete = () => {
    console.log('Quote animation completed!')
  }

  const handleRTHComplete = () => {
    console.log('RTH animation completed!')
  }

  const handleRTCComplete = () => {
    console.log('RTC animation completed!')
  }

  const handleFormHeadingComplete = () => {
    console.log('Form heading animation completed!')
  }

  const handleRVEComplete = () => {
    console.log('RVE animation completed!')
  }

  const handleECComplete = () => {
    console.log('EC animation completed!')
  }

  const handleRFHComplete = () => {
    console.log('RFH animation completed!')
  }

  const handleRVFNComplete = () => {
    console.log('RVFN animation completed!')
  }

  const handleRVEHComplete = () => {
    console.log('RVEH animation completed!')
  }

  const handleRVENComplete = () => {
    console.log('RVEN animation completed!')
  }

  const handleRVCQComplete = () => {
    console.log('RVCQ animation completed!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'clientId') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.slice(0, 10),
      }))
      setStatus({ type: '', message: '' })
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setStatus({ type: '', message: '' })
  }

  const handleAspectSelect = (value) => {
    setFormData((prev) => ({ ...prev, aspectOfReview: value }))
    setSelectOpen(false)
    setStatus({ type: '', message: '' })
  }

  const handleSubmitReview = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/review/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Name: data.name,
        EmailId: data.email,
        WavePointClientID: data.clientId,
        ReviewerCatagory: data.reviewerCategory,
        AspectOfReview: data.aspectOfReview,
        ReviewText: data.reviewText,
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Unable to post review.')
    }

    return result
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      setStatus({
        type: 'error',
        message: 'Unable to post review. Please fill in all fields correctly before submitting.',
      })
      return
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.clientId.trim() ||
      !formData.reviewerCategory.trim() ||
      !formData.aspectOfReview.trim() ||
      !formData.reviewText.trim()
    ) {
      setStatus({
        type: 'error',
        message: 'Unable to post review. Please fill in all required fields.',
      })
      return
    }

    const clientIdPattern = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{10}$/

    if (!clientIdPattern.test(formData.clientId)) {
      setStatus({
        type: 'error',
        message:'Unable to post review. Client ID must be exactly 10 alphanumeric characters.',
      })
      return
    }

    setIsSubmitting(true)
    setStatus({
      type: '',
      message: 'Posting your review...',
    })

    try {
      await handleSubmitReview(formData)

      setStatus({
        type: 'success',
        message: 'Review posted successfully.',
      })

      setFormData({
        name: '',
        email: '',
        clientId: '',
        reviewerCategory: '',
        aspectOfReview: '',
        reviewText: '',
      })
      setSelectOpen(false)
      setRefreshKey((prev) => prev + 1)
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Error submitting review.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="Review">
      <div className="Review-background">
        <Silk
          speed={3.5}
          scale={1}
          color="#4c848d"
          noiseIntensity={2.5}
          rotation={0}
        />
      </div>

      <div className="Review-Heading">
        <TextType
          text={[
            '- Welcome to Wavepoint Reviews ! -',
            '- Your Experience Helps Us Improve -',
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

      <div className="Review-subheading">
        <BlurText
          text="- Honest Feedback from Real Users Helps Us Make Wavepoint Better -"
          delay={200}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleQuoteComplete}
          className="quote-text"
        />
      </div>

      <section className="Review-Content">
        <div className="Review-Content-stack">
          <div className="Review-types">
            <div className="Review-types-heading">
              <SplitText
                key="Review-types-heading"
                text="- Rate and Review Wavepoint -"
                className="Review-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleRTHComplete}
                showCallbacks={true}
              />
            </div>

            <div className="Review-types-content">
              {RV_TYPES.map((type, index) => (
                <div
                  key={index}
                  className={`Review-type-item ${index === 0 ? 'Review-type-item-intro' : ''}`}
                >
                  <SplitText
                    key={`Review-type-${index}`}
                    text={type}
                    className={`Review-type-text ${index === 0 ? 'Review-type-text-intro' : ''}`}
                    delay={index * 100}
                    duration={1.2}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="0px"
                    textAlign={index === 0 ? 'center' : 'left'}
                    onLetterAnimationComplete={handleRTCComplete}
                    showCallbacks={false}
                  />
                </div>
              ))}
            </div>

            <div className="Review-form">
              <div className="Review-form-heading">
                <SplitText
                  key="Review-form-heading"
                  text="- Share Your Review -"
                  className="Review-form-title"
                  delay={30}
                  duration={1.05}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleFormHeadingComplete}
                  showCallbacks={false}
                />
              </div>

              <FormPrimitive className="Review-form-element" onSubmit={handleSubmit} noValidate={false}>
                <div className="Review-form-grid">
                  <div className="Review-field">
                    <label htmlFor="reviewer-name" className="Review-label">
                      Name
                    </label>
                    <input
                      id="reviewer-name"
                      name="name"
                      type="text"
                      className="Review-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="Review-field">
                    <label htmlFor="reviewer-email" className="Review-label">
                      Email Id
                    </label>
                    <input
                      id="reviewer-email"
                      name="email"
                      type="email"
                      className="Review-input"
                      placeholder="Enter your email id"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="Review-field">
                  <label htmlFor="reviewer-device-id" className="Review-label">
                    Client ID
                  </label>
                  <input
                    id="reviewer-device-id"
                    name="clientId"
                    type="text"
                    className="Review-input"
                    placeholder="Enter 10-character device ID"
                    value={formData.clientId}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="^(?=.*\d)[A-Za-z\d]{10}$"
                    title="client ID must be exactly 10 characters and include at least one number"
                    required
                  />
                </div>

                <div className="Review-field">
                  <span className="Review-label">Reviewer Category</span>
                  <div className="Review-radio-group">
                    <label className="Review-radio-option">
                      <input
                        type="radio"
                        name="reviewerCategory"
                        value="Public"
                        checked={formData.reviewerCategory === 'Public'}
                        onChange={handleChange}
                        required
                      />
                      <span>Public</span>
                    </label>

                    <label className="Review-radio-option">
                      <input
                        type="radio"
                        name="reviewerCategory"
                        value="Wavepoint Insider"
                        checked={formData.reviewerCategory === 'WavePoint Insider'}
                        onChange={handleChange}
                      />
                      <span>WavePoint Insider</span>
                    </label>

                    <label className="Review-radio-option">
                      <input
                        type="radio"
                        name="reviewerCategory"
                        value="External Expert"
                        checked={formData.reviewerCategory === 'External Expert'}
                        onChange={handleChange}
                      />
                      <span>External Expert</span>
                    </label>
                  </div>
                </div>

                <div className="Review-field">
                  <span className="Review-label">Aspect of Review</span>

                  <input
                    type="text"
                    name="aspectOfReview"
                    value={formData.aspectOfReview}
                    onChange={() => {}}
                    required
                    readOnly
                    tabIndex={-1}
                    aria-hidden="true"
                    className="Review-hidden-input"
                  />

                  <div className="Review-custom-select">
                    <div
                      ref={triggerRef}
                      className={`Review-custom-select-trigger ${selectOpen ? 'open' : ''}`}
                      onClick={() => setSelectOpen((prev) => !prev)}
                      tabIndex={0}
                      role="button"
                      aria-haspopup="listbox"
                      aria-expanded={selectOpen}
                      aria-controls="aspect-portal"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectOpen((prev) => !prev)
                        }
                        if (e.key === 'Escape') {
                          setSelectOpen(false)
                        }
                      }}
                    >
                      <span className={!formData.aspectOfReview ? 'placeholder' : ''}>
                        {formData.aspectOfReview || 'Select an aspect'}
                      </span>
                      <span className="Review-custom-select-arrow" />
                    </div>
                  </div>
                </div>

                <div className="Review-field">
                  <label htmlFor="reviewText" className="Review-label">
                    Review Text
                  </label>
                  <textarea
                    id="reviewText"
                    name="reviewText"
                    className="Review-textarea"
                    placeholder="Write your review here"
                    value={formData.reviewText}
                    onChange={handleChange}
                    rows={6}
                    required
                  />
                </div>

                {status.message && (
                  <div
                    className={`Review-message ${
                      status.type === 'success'
                        ? 'Review-message-success'
                        : status.type === 'error'
                          ? 'Review-message-error'
                          : 'Review-message-info'
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <div className="Review-submit-wrap">
                  <button
                    type="submit"
                    className="Review-submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Review'}
                  </button>
                </div>
              </FormPrimitive>

              {selectOpen &&
                createPortal(
                  <div
                    id="aspect-portal"
                    ref={portalRef}
                    className="Review-custom-select-options"
                    style={dropdownStyle}
                    role="listbox"
                    aria-label="Aspect of Review options"
                  >
                    {ASPECT_OPTIONS.map((opt) => (
                      <div
                        key={opt.value}
                        className={`Review-custom-select-option ${
                          formData.aspectOfReview === opt.value ? 'selected' : ''
                        }`}
                        role="option"
                        aria-selected={formData.aspectOfReview === opt.value}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          handleAspectSelect(opt.value)
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>,
                  document.body
                )}
            </div>

            <div className="Review-form-note">
              {RV_END.map((paragraph, index) => (
                <div className="review-paragraph-row" key={`paragraph-row-${index}`}>
                  <SplitText
                    key={`review-paragraph-${index}`}
                    text={paragraph}
                    className="review-paragraph"
                    delay={12}
                    duration={0.85}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 18 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    onLetterAnimationComplete={handleRVEComplete}
                    textAlign="center"
                  />
                </div>
              ))}
            </div>

            <div className="Review-footer">
              <div className="Review-footer-heading">
                <SplitText
                  key="Review-footer-heading"
                  text="- What Our Community Is Saying -"
                  className="Review-footer-title"
                  delay={30}
                  duration={1.05}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                  onLetterAnimationComplete={handleRFHComplete}
                  showCallbacks={false}
                />
              </div>

              <div className="Review-footer-content">
                <Carousel
                  key={refreshKey}
                  fetchFromAPI={true}
                  baseWidth={280}
                  autoplay={false}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
              </div>

              <div className="Review-footer-note">
                {RV_FTR_NT.map((paragraph, index) => (
                  <div className="review-paragraph-row" key={`ftr-paragraph-row-${index}`}>
                    <SplitText
                      key={`ftr-paragraph-${index}`}
                      text={paragraph}
                      className="review-paragraph"
                      delay={12}
                      duration={0.85}
                      ease="power2.out"
                      splitType="words"
                      from={{ opacity: 0, y: 18 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      rootMargin="0px"
                      onLetterAnimationComplete={handleRVFNComplete}
                      textAlign="center"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="Review-end">
              <div className="Review-end-heading">
                <SplitText
                  key="Review-end-heading"
                  text="- Review Guidelines -"
                  className="Review-end-title"
                  delay={30}
                  duration={1.05}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 24 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  onLetterAnimationComplete={handleRVEHComplete}
                  textAlign="center"
                />
              </div>

              <div className="Review-end-content">
                {RVEC_GUD.map((guideline, index) => (
                  <div className="review-paragraph-row" key={`guideline-row-${index}`}>
                    <SplitText
                      key={`guideline-${index}`}
                      text={guideline}
                      className="review-paragraph"
                      delay={12}
                      duration={0.85}
                      ease="power2.out"
                      splitType="words"
                      from={{ opacity: 0, y: 18 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.05}
                      rootMargin="0px"
                      onLetterAnimationComplete={handleECComplete}
                      textAlign="center"
                    />
                  </div>
                ))}
              </div>

              <div className="Review-end-note">
                <SplitText
                  key="Review-end-note"
                  text="- We read every review. Your feedback helps us make Wavepoint better. -"
                  className="review-note"
                  delay={12}
                  duration={0.85}
                  ease="power2.out"
                  splitType="words"
                  from={{ opacity: 0, y: 18 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  onLetterAnimationComplete={handleRVENComplete}
                  textAlign="center"
                />
              </div>
            </div>

            <div className="Review-close-quote">
              <SplitText
                key="Review-close-quote"
                text="- Smart Work. Better Results. -"
                className="review-close-quote"
                delay={12}
                duration={0.85}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 18 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.05}
                rootMargin="0px"
                onLetterAnimationComplete={handleRVCQComplete}
                textAlign="center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeedBack