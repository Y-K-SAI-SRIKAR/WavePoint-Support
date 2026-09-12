import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">

        <header className="privacy-policy-header">
          <h1>Privacy Policy</h1>
          <p className="privacy-policy-updated">
            Last updated: September 12, 2026
          </p>
        </header>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Wavepoint Support. Wavepoint is a team workflow and
            project management platform designed to help teams plan projects,
            organize tasks, track progress, collaborate, and manage their work
            efficiently.
          </p>

          <p>
            This Privacy Policy explains how Wavepoint Support collects, uses,
            stores, and protects information when you use our support portal
            and related services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>

          <p>
            Depending on how you use Wavepoint Support, we may collect
            information such as:
          </p>

          <ul>
            <li>Name and contact information provided through support forms.</li>
            <li>Email address used for support requests and notifications.</li>
            <li>Client or account identifiers submitted through support forms.</li>
            <li>Information included in support requests, feedback, and suggestions.</li>
            <li>Information required to provide and maintain support services.</li>
          </ul>
        </section>

        <section>
          <h2>3. Google API and Gmail Data</h2>

          <p>
            Wavepoint Support uses the Google Gmail API to send transactional
            and support-related email communications.
          </p>

          <p>
            The application requests the following Google OAuth permission:
          </p>

          <div className="privacy-policy-scope">
            <strong>Gmail Send</strong>
            <br />
            <code>https://www.googleapis.com/auth/gmail.send</code>
          </div>

          <p>
            This permission is used only to send emails on behalf of the
            configured Wavepoint Support email account. Examples include
            support acknowledgements, review acknowledgements, suggestion
            acknowledgements, password-reset emails, subscriber notifications,
            and Wavepoint update notifications.
          </p>

          <p>
            Wavepoint Support does <strong>not</strong> use the Gmail API to
            read, search, modify, or delete messages in the Gmail inbox.
          </p>

          <p>
            Wavepoint Support does not sell Google user data or use Google
            user data for advertising purposes.
          </p>
        </section>

        <section>
          <h2>4. How We Use Information</h2>

          <p>
            Information collected through the support portal may be used to:
          </p>

          <ul>
            <li>Respond to customer support requests.</li>
            <li>Send requested support and service notifications.</li>
            <li>Process feedback, reviews, and suggestions.</li>
            <li>Send relevant Wavepoint product and service updates.</li>
            <li>Maintain and improve the Wavepoint Support experience.</li>
            <li>Protect the security and reliability of our services.</li>
          </ul>
        </section>

        <section>
          <h2>5. Email Communications</h2>

          <p>
            Wavepoint Support may send transactional emails when they are
            necessary to provide a requested service or respond to an action
            taken through the support portal.
          </p>

          <p>
            These emails may include support confirmations, password-reset
            messages, feedback acknowledgements, subscription-related
            notifications, and product update notifications.
          </p>
        </section>

        <section>
          <h2>6. Data Storage and Security</h2>

          <p>
            Information submitted through Wavepoint Support is stored and
            processed using systems configured to support the operation of the
            application.
          </p>

          <p>
            OAuth credentials and application secrets used for Gmail API access
            are maintained on the server side and are not intentionally exposed
            through the public frontend application.
          </p>

          <p>
            We take reasonable measures to protect information against
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2>7. Information Sharing</h2>

          <p>
            Wavepoint Support does not sell personal information.
          </p>

          <p>
            Information may be processed by infrastructure and service
            providers required to operate the application, such as hosting,
            database, email, and cloud service providers. These services are
            used only as necessary to provide and maintain Wavepoint Support.
          </p>
        </section>

        <section>
          <h2>8. Google User Data Limited Use</h2>

          <p>
            Any Google user data accessed through Google APIs is used only for
            the functionality described in this Privacy Policy and for the
            specific purpose for which access was granted.
          </p>

          <p>
            Wavepoint Support does not transfer Google user data to third
            parties except where necessary to provide or improve the requested
            functionality, comply with applicable law, or protect the security
            of the service.
          </p>

          <p>
            Wavepoint Support does not use Google user data for advertising,
            targeted advertising, or unrelated purposes.
          </p>
        </section>

        <section>
          <h2>9. Data Retention</h2>

          <p>
            We retain information only for as long as reasonably necessary to
            provide support services, maintain application records, meet
            operational requirements, or comply with applicable legal
            obligations.
          </p>
        </section>

        <section>
          <h2>10. Your Choices</h2>

          <p>
            You may contact us if you have questions about information
            associated with your support request or if you would like to
            request information about how your data is handled.
          </p>

          <p>
            You can also revoke Google's authorization for an application from
            your Google Account settings.
          </p>
        </section>

        <section>
          <h2>11. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to reflect
            changes to our services, technologies, or legal requirements.
            Updated versions will be published on this page with a revised
            "Last updated" date.
          </p>
        </section>

        <section>
          <h2>12. Contact Us</h2>

          <p>
            If you have questions about this Privacy Policy or Wavepoint
            Support, you can contact us at:
          </p>

          <div className="privacy-policy-contact">
            <strong>Wavepoint Support</strong>
            <br />
            Email:{" "}
            <a href="mailto:support@wavepoint.com">
              support@wavepoint.com
            </a>
          </div>
        </section>

        <footer className="privacy-policy-footer">
          <p>© 2026 Wavepoint. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
};

export default PrivacyPolicy;