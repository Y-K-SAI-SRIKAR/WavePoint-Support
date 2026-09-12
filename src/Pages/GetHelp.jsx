import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import './GetHelp.css'
import Silk from '../components/Silk'
import TextType from '../components/TextType'
import BlurText from '../components/BlurText'
import SplitText from '../components/SplitText'
import { Form } from '../components/SubscriberForm'

const NS_PARAGRAPHS = [
  "Stay up to date with the latest Wavepoint features, improvements, and product updates.",
  "From new workflow capabilities to smarter project management tools, our updates keep you informed about what’s new and help your team get more from Wavepoint.",
  "Enter your email above and stay connected with everything happening across Wavepoint."
]

const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: 'support@wavepoint.com',
    href: 'mailto:support@wavepoint.com',
    full: false,
  },
  {
    label: 'Phone',
    value: '1800-XXX-XXXX (Toll-Free)',
    href: 'tel:1800XXXXXXXX',
    full: false,
  },
  {
    label: 'Working Hours',
    value: 'Monday to Saturday, 9 AM – 7 PM IST',
    full: false,
  },
  {
    label: 'Postal Address',
    value: 'Wavepoint Technologies, Hyderabad, Telangana – 500050.',
    full: true,
  },
]

const PRIORITY_SUPPORT_DETAILS = [
  {
    label: 'Critical Support',
    value: 'Priority assistance for urgent workspace and project issues',
    full: false,
  },
  {
    label: 'Account Assistance',
    value: 'Get help with account access, workspace access, and permissions',
    full: false,
  },
  {
    label: 'Technical Issues',
    value: 'Report unexpected errors, workflow issues, or platform problems',
    full: false,
  },
  {
    label: 'Service Updates',
    value: 'Check the latest platform updates and service information',
    full: false,
  },
]

const FAQ_CATEGORIES = {
  PRJCTS: 'PROJECTS',
  WRKFLW: 'WORKFLOW',
  TSKMGT: 'TASK MANAGEMENT',
  ACCTS: 'WORKSPACE',
  TECH: 'SUPPORT',
}

const FAQ_DATA = {
  PRJCTS: [
    {
      question: 'How do I create a new project in Wavepoint?',
      answer:
        'Open your workspace, select the option to create a new project, and provide the project name and relevant details. Once created, you can add tasks, assign team members, and start tracking progress.',
    },
    {
      question: 'Can I assign team members to a project?',
      answer:
        'Yes. Project members can be added from the project settings or team management section. You can assign members to projects and control their access based on the available workspace permissions.',
    },
    {
      question: 'How can I track the progress of a project?',
      answer:
        'Wavepoint provides project-level progress visibility through task completion, status updates, deadlines, and workflow information, helping teams understand how work is progressing.',
    },
    {
      question: 'Can I set deadlines for projects?',
      answer:
        'Yes. You can define project timelines and deadlines to help your team plan work, prioritize tasks, and keep projects on schedule.',
    },
    {
      question: 'Can multiple team members collaborate on the same project?',
      answer:
        'Yes. Wavepoint is designed for collaborative project management, allowing team members to work within shared projects, coordinate tasks, and stay aligned through project updates.',
    },
  ],

  WRKFLW: [
    {
      question: 'What is a workflow in Wavepoint?',
      answer:
        'A workflow is a structured sequence of steps used to organize and manage work. Wavepoint helps teams create clear processes so tasks can move efficiently from one stage to another.',
    },
    {
      question: 'Can I customize workflows for my team?',
      answer:
        'Yes. Workflows can be organized around the way your team operates, allowing you to structure stages and processes according to different project or business requirements.',
    },
    {
      question: 'How do workflow updates help my team?',
      answer:
        'Workflow updates provide visibility into the current state of work, making it easier for team members to understand what is in progress, what needs attention, and what has been completed.',
    },
    {
      question: 'Can workflows be used across different projects?',
      answer:
        'Yes. Teams can use workflow structures across projects where the same process is applicable, helping maintain consistency while managing different types of work.',
    },
    {
      question: 'What should I do if a workflow is not working as expected?',
      answer:
        'Check the workflow stages, task statuses, and assigned team members first. If the issue continues, submit a support request with details about the workflow and the behavior you are experiencing.',
    },
  ],

  TSKMGT: [
    {
      question: 'How do I create a task in Wavepoint?',
      answer:
        'Tasks can be created within a project or workflow. Add the task details, assign it to the appropriate team member, and set the relevant status or deadline to begin tracking the work.',
    },
    {
      question: 'Can I assign tasks to specific team members?',
      answer:
        'Yes. Tasks can be assigned to individual team members so responsibilities are clear and everyone knows which work requires their attention.',
    },
    {
      question: 'Can I set priorities and deadlines for tasks?',
      answer:
        'Yes. Task priorities and deadlines can be used to help teams organize their workload, focus on important work, and keep tasks moving toward completion.',
    },
    {
      question: 'How can I see which tasks are still pending?',
      answer:
        'You can review task statuses within your project or workflow to identify pending, active, and completed work and quickly determine what still needs attention.',
    },
    {
      question: 'Can I update a task after assigning it?',
      answer:
        'Yes. Task information can be updated as work progresses, including relevant details, status, assignment, priority, and deadline depending on your permissions.',
    },
  ],

  ACCTS: [
    {
      question: 'How do I manage my Wavepoint account?',
      answer:
        'Your account settings allow you to manage available profile and account information. Workspace administrators may also manage team members, permissions, and workspace-level settings.',
    },
    {
      question: 'How do I create or join a workspace?',
      answer:
        'A workspace can be created according to your Wavepoint account permissions, while joining an existing workspace generally requires an invitation or access provided by a workspace administrator.',
    },
    {
      question: 'Can I manage team member permissions?',
      answer:
        'Yes. Workspace administrators can manage access and permissions for team members based on the roles and controls available within the workspace.',
    },
    {
      question: 'What should I do if I cannot access my workspace?',
      answer:
        'First, verify that you are signed in to the correct account and that you have been granted access to the workspace. If the problem continues, contact Wavepoint Support for assistance.',
    },
    {
      question: 'How do I get help with my subscription or billing?',
      answer:
        'For subscription or billing questions, submit a support request with the relevant account details and a description of the issue. Our support team can review the request and provide the appropriate assistance.',
    },
  ],

  TECH: [
    {
      question: 'What should I do if Wavepoint is not loading correctly?',
      answer:
        'Check your internet connection and try refreshing the page. You can also try signing in again or using an updated browser. If the problem persists, contact technical support with details about the issue.',
    },
    {
      question: 'Why are my project or task updates not appearing?',
      answer:
        'Verify that you have an active connection and the appropriate workspace permissions. Refresh the workspace and check whether the update appears. If it still does not appear, submit a support request.',
    },
    {
      question: 'Which browsers can I use with Wavepoint?',
      answer:
        'Wavepoint is designed to work with modern web browsers. For the best experience, keep your browser updated to the latest stable version.',
    },
    {
      question: 'What should I do if I encounter an unexpected error?',
      answer:
        'Note the action that caused the error, refresh the application, and try the action again. If the issue continues, provide the error message and relevant steps when contacting Wavepoint Support.',
    },
    {
      question: 'How can I report a technical problem?',
      answer:
        'You can submit a support request through the Wavepoint Support portal. Include a clear description of the problem, the affected project or workspace if applicable, and any error message you received.',
    },
  ],
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      className={`faq-item-panel ${isOpen ? 'faq-item-open' : ''}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="faq-item-button"
        aria-expanded={isOpen}
      >
        <span className={`faq-item-question ${isOpen ? 'faq-item-question-open' : ''}`}>
          {question}
        </span>

        <motion.span
          variants={{
            open: { rotate: '45deg' },
            closed: { rotate: '0deg' },
          }}
          transition={{ duration: 0.2 }}
          className="faq-icon-wrap"
        >
          <Plus className={`faq-plus-icon ${isOpen ? 'faq-plus-icon-open' : ''}`} />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : '0px',
          marginBottom: isOpen ? '16px' : '0px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="faq-answer-motion"
      >
        <p className="faq-item-answer">{answer}</p>
      </motion.div>
    </motion.div>
  )
}

function GetHelp() {
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('PRJCTS')

  const handleQuoteComplete = () => {
    console.log('Quote animation completed!')
  }

  const handleNSComplete = () => {
    console.log('Newsletter heading animation completed!')
  }

  const handleContactComplete = () => {
    console.log('Contact heading animation completed!')
  }

  return (
    <div className="Assistance">
      <div className="Assistance-background">
        <Silk
          speed={3.5}
          scale={1}
          color="#DAD4BC"
          noiseIntensity={2.5}
          rotation={0}
        />
      </div>

      <div className="Assistance-Heading">
        <TextType
          text={[
            '- Welcome to Wavepoint Support ! -',
            "- We're Here to Help You Stay on Course -",
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

      <div className="Assistance-subheading">
        <BlurText
          text="Connecting You to Support, Guidance, and the Right Solutions, at the Right Time"
          delay={200}
          animateBy="words"
          direction="bottom"
          onAnimationComplete={handleQuoteComplete}
          className="quote-text"
        />
      </div>

      <section className="Assistance-content">
        <div className="Assistance-stack">
          <div className="Assistance-newsletter-section">
            <div className="newsletter-heading">
              <SplitText
                key="newsletter-heading"
                text="- Newsletter Subscription -"
                className="newsletter-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleNSComplete}
                showCallbacks={true}
              />
            </div>

            <div className="newsletter-form">
              <Form className="subscriber-form" noValidate />
            </div>

            <div className="newsletter-description">
              {NS_PARAGRAPHS.map((paragraph, index) => (
                <div className="newsletter-paragraph-row" key={index}>
                  <SplitText
                    key={`newsletter-paragraph-${index}`}
                    text={paragraph}
                    className="newsletter-paragraph"
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
          </div>

          <div className="Assistance-contact-section">
            <div className="contact-heading">
              <SplitText
                key="contact-heading"
                text="- Contact Us -"
                className="contact-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
                onLetterAnimationComplete={handleContactComplete}
                showCallbacks={true}
              />
            </div>

            <div className="contact-card">
              <div className="contact-text-wrap">
                <SplitText
                  key="contact-text"
                  text="Reach our Wavepoint team for support, product guidance, and assistance during working hours."
                  className="contact-text"
                  delay={14}
                  duration={0.8}
                  ease="power2.out"
                  splitType="words"
                  from={{ opacity: 0, y: 18 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.05}
                  rootMargin="0px"
                  textAlign="center"
                />
              </div>

              <address className="contact-details">
                {CONTACT_DETAILS.map((item, index) => (
                  <div
                    className={`contact-item ${item.full ? 'contact-item-full' : ''}`}
                    key={item.label}
                  >
                    <div className="contact-label-wrap">
                      <SplitText
                        key={`contact-label-${index}`}
                        text={item.label}
                        className="contact-label"
                        delay={16}
                        duration={0.72}
                        ease="power2.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 14 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.05}
                        rootMargin="0px"
                        textAlign="center"
                      />
                    </div>

                    {item.href ? (
                      <a className="contact-link" href={item.href}>
                        <SplitText
                          key={`contact-value-${index}`}
                          text={item.value}
                          className="contact-link-text"
                          delay={10}
                          duration={0.78}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 16 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="center"
                        />
                      </a>
                    ) : (
                      <div className="contact-value-wrap">
                        <SplitText
                          key={`contact-value-${index}`}
                          text={item.value}
                          className="contact-value"
                          delay={10}
                          duration={0.78}
                          ease="power2.out"
                          splitType="words"
                          from={{ opacity: 0, y: 16 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="center"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </address>
            </div>
          </div>

          <div className="Assistance-faqs">
            <div className="faqs-heading">
              <SplitText
                key="faqs-heading"
                text="- Frequently Asked Questions -"
                className="faqs-title"
                delay={45}
                duration={1.1}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 28 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="center"
              />
            </div>

            <div className="faqs-panel">
              <div className="faq-tabs">
                {Object.entries(FAQ_CATEGORIES).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedFaqCategory(key)}
                    className={`faq-tab-button ${
                      selectedFaqCategory === key ? 'faq-tab-button-active' : ''
                    }`}
                  >
                    <span className="faq-tab-label">{label}</span>
                    <AnimatePresence>
                      {selectedFaqCategory === key && (
                        <motion.span
                          initial={{ y: '100%' }}
                          animate={{ y: '0%' }}
                          exit={{ y: '100%' }}
                          transition={{ duration: 0.5, ease: 'backIn' }}
                          className="faq-tab-highlight"
                        />
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>

              <div className="faq-list-wrap">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedFaqCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: 'backIn' }}
                    className="faq-list"
                  >
                    {FAQ_DATA[selectedFaqCategory].map((faq, index) => (
                      <FAQItem key={`${selectedFaqCategory}-${index}`} {...faq} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="Assistance-footer">
            <div className="emergency-section">
              <div className="emergency-heading">
                <SplitText
                  key="emergency-heading"
                  text="- Priority Support Information -"
                  className="emergency-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                />
              </div>

              <div className="emergency-card">
                <div className="emergency-text-wrap">
                  <SplitText
                    key="emergency-text"
                    text="When you need help, our support team is here to guide you quickly and connect you with the right solution."
                    className="emergency-text"
                    delay={14}
                    duration={0.8}
                    ease="power2.out"
                    splitType="words"
                    from={{ opacity: 0, y: 18 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.05}
                    rootMargin="0px"
                    textAlign="center"
                  />
                </div>

                <address className="emergency-details">
                  {PRIORITY_SUPPORT_DETAILS.map((item, index) => (
                    <div
                      className={`emergency-item ${item.full ? 'emergency-item-full' : ''}`}
                      key={item.label}
                    >
                      <div className="emergency-label-wrap">
                        <SplitText
                          key={`emergency-label-${index}`}
                          text={item.label}
                          className="emergency-label"
                          delay={16}
                          duration={0.72}
                          ease="power2.out"
                          splitType="chars"
                          from={{ opacity: 0, y: 14 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.05}
                          rootMargin="0px"
                          textAlign="center"
                        />
                      </div>

                      {item.href ? (
                        <a className="emergency-link" href={item.href}>
                          <SplitText
                            key={`emergency-value-${index}`}
                            text={item.value}
                            className="emergency-link-text"
                            delay={10}
                            duration={0.78}
                            ease="power2.out"
                            splitType="words"
                            from={{ opacity: 0, y: 16 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.05}
                            rootMargin="0px"
                            textAlign="center"
                          />
                        </a>
                      ) : (
                        <div className="emergency-value-wrap">
                          <SplitText
                            key={`emergency-value-${index}`}
                            text={item.value}
                            className="emergency-value"
                            delay={10}
                            duration={0.78}
                            ease="power2.out"
                            splitType="words"
                            from={{ opacity: 0, y: 16 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.05}
                            rootMargin="0px"
                            textAlign="center"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </address>
              </div>
            </div>

            <div className="footer-note">
              <div className="footer-text-wrap">
                <SplitText
                  key="footer-note"
                  text="- We Make Sure Your Task Moves Forward ! -"
                  className="emergency-title"
                  delay={45}
                  duration={1.1}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="0px"
                  textAlign="center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GetHelp