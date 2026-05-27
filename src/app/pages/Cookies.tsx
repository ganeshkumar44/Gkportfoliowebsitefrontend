export function Cookies() {

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Page title */}
        <div className="flex items-start justify-between mb-4">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold text-foreground leading-tight tracking-tight">
            Cookies Policy
          </h1>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/40 hover:bg-card/60 border border-border text-foreground transition-all duration-200 hover:border-amber-400/50 group shrink-0 mt-2"
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This Cookies Policy explains how Ganesh Kumar ("we", "our", or "us") uses cookies and
              similar technologies on this website. By using this website, you agree to the use of
              cookies as described in this policy.
            </p>
          </section>

          <hr className="border-border my-8" />

          {/* What Are Cookies */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              What Are Cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help
              websites function properly, improve user experience, remember preferences, and provide
              analytics information.
            </p>
          </section>

          <hr className="border-border my-8" />

          {/* How We Use Cookies */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              How We Use Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use cookies to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Improve website performance and functionality</li>
              <li>Remember user preferences such as theme settings</li>
              <li>Analyze website traffic and visitor behavior</li>
              <li>Enhance user experience and responsiveness</li>
              <li>Maintain website security and stability</li>
            </ul>
          </section>

          <hr className="border-border my-8" />

          {/* Types of Cookies */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Types of Cookies We Use
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  1. Essential Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable core
                  features such as navigation, security, and accessibility.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  2. Performance & Analytics Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies help us understand how visitors interact with the website by
                  collecting anonymous usage data. This helps improve website performance and user
                  experience.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  3. Preference Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies remember your preferences, such as language settings or dark/light
                  theme selection, to provide a more personalized experience.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  4. Third-Party Cookies
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Some third-party services integrated into the website (such as embedded videos,
                  analytics tools, or social media links) may place cookies on your device.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-border my-8" />

          {/* Managing Cookies */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Managing Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most web browsers allow you to manage or disable cookies through browser settings.
              Please note that disabling certain cookies may affect website functionality and user
              experience.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You can usually find cookie settings in your browser under:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Settings</li>
              <li>Privacy</li>
              <li>Security</li>
              <li>Cookies</li>
            </ul>
          </section>

          <hr className="border-border my-8" />

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This website may use trusted third-party services such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Analytics providers</li>
              <li>Embedded media services</li>
              <li>Social media platforms</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              These services may use their own cookies according to their respective privacy
              policies.
            </p>
          </section>

          <hr className="border-border my-8" />

          {/* Updates to This Policy */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Updates to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookies Policy from time to time to reflect changes in technology,
              legal requirements, or website functionality. Updates will be posted on this page.
            </p>
          </section>

          <hr className="border-border my-8" />

          {/* Contact */}
          <section className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions regarding this Cookies Policy, feel free to contact:
            </p>
            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-6">
              <p className="font-semibold text-foreground mb-1">Ganesh Kumar</p>
              <p className="text-muted-foreground">
                Email:{" "}
                <a
                  href="mailto:ganeshkr.in90@gmail.com"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  ganeshkr.in90@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
