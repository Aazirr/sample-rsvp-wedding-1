import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, MapPin, Shirt, Sparkles } from "lucide-react";

const eventDetails = [
  {
    label: "Ceremony",
    value: "3:00 PM",
    copy: "St. Benedict Chapel\nTagaytay City, Philippines",
    Icon: CalendarDays,
  },
  {
    label: "Reception",
    value: "5:30 PM",
    copy: "The Garden Pavilion\nAlta Veranda, Tagaytay City",
    Icon: MapPin,
  },
  {
    label: "Dress Code",
    value: "Semi-Formal",
    copy: "Soft neutrals, sage, dusty blue, or champagne tones are warmly welcome.",
    Icon: Shirt,
  },
  {
    label: "RSVP Deadline",
    value: "October 25, 2026",
    copy: "For assistance, contact Sofia at +63 917 555 0146.",
    Icon: Clock3,
  },
];

const palettes = [
  { id: "blush", label: "Blush", className: "swatch-blush" },
  { id: "sage", label: "Sage", className: "swatch-sage" },
  { id: "champagne", label: "Champagne", className: "swatch-champagne" },
];

const typeOptions = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
];

const highlightList = [
  "Outdoor ceremony",
  "Garden reception",
  "Seated dinner",
  "Acoustic after-party set",
];

function PhotoFrame({ className, src, alt }) {
  return (
    <figure className={`framed-photo ${className}`}>
      <img src={src} alt={alt} />
    </figure>
  );
}

function App() {
  const [theme, setTheme] = useState("blush");
  const [typeMood, setTypeMood] = useState("classic");
  const [submitted, setSubmitted] = useState(false);
  const [heroFrontIndex, setHeroFrontIndex] = useState(0);

  useEffect(() => {
    document.body.dataset.theme = theme;
    document.body.dataset.type = typeMood;
  }, [theme, typeMood]);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    let observer;

    const setDesktopVisible = () => {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
    };

    const setMobileObserver = () => {
      revealTargets.forEach((element) => element.classList.remove("is-visible"));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
        {
          threshold: 0.16,
          rootMargin: "0px 0px -10% 0px",
        }
      );

      revealTargets.forEach((element) => observer.observe(element));
    };

    if (mobileQuery.matches) {
      setMobileObserver();
    } else {
      setDesktopVisible();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const initialForm = useMemo(
    () => ({
      fullName: "",
      attendance: "Joyfully Accept",
      guestCount: "1",
      meal: "Chef's Choice",
      contact: "",
      message: "",
    }),
    []
  );

  const [formData, setFormData] = useState(initialForm);
  const heroPhotos = [
    { src: "/photos/1.jpg", alt: "Bride and groom portrait" },
    { src: "/photos/7.jpg", alt: "Couple standing beside a tree" },
    { src: "/photos/4.jpg", alt: "Outdoor full-length portrait of the couple" },
    { src: "/photos/6.jpg", alt: "Bride and groom smiling outdoors" },
  ];
  const visibleHeroPhotos = [
    heroFrontIndex,
    (heroFrontIndex + 1) % heroPhotos.length,
    (heroFrontIndex + 2) % heroPhotos.length,
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("sampleWeddingRsvp", JSON.stringify(formData));
    setSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <div className="site-shell">
      <main className="page-shell">
        <header className="hero" data-reveal style={{ "--reveal-delay": "0ms" }}>
          <div className="hero-copy">
            <h1>
              <span>Amelia</span>
              <em>and</em>
              <span>Theo</span>
            </h1>
            <p className="date-pill">November 22, 2026</p>
            <p className="hero-note">
              We would love for you to join us for an intimate garden celebration
              filled with music, candlelight, and good company.
            </p>
            <p className="hero-actions-note">
              See the schedule, venue, and dress code before you send your RSVP.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#rsvp">
                RSVP Now
              </a>
              <a className="button button-secondary" href="#details">
                View Details
              </a>
            </div>
          </div>

          <div className="hero-media" id="hero-gallery">
            <div className="hero-stack" aria-label="Wedding photo gallery">
              {visibleHeroPhotos
                .slice()
                .reverse()
                .map((photoIndex, layerIndex) => {
                  const layerClass = ["hero-stack-far", "hero-stack-mid", "hero-stack-front"][layerIndex];
                  const photoClass = ["hero-photo-far", "hero-photo-mid", "hero-photo-front"][layerIndex];
                  const nextPhotoIndex = (heroFrontIndex + 1) % heroPhotos.length;
                  const targetPhotoIndex = layerClass === "hero-stack-front" ? nextPhotoIndex : photoIndex;

                  return (
                    <button
                      key={heroPhotos[photoIndex].src}
                      className={`hero-stack-button ${layerClass}`}
                      type="button"
                      onClick={() => setHeroFrontIndex(targetPhotoIndex)}
                      aria-label={`Show ${heroPhotos[targetPhotoIndex].alt.toLowerCase()}`}
                    >
                      <PhotoFrame
                        className={`hero-photo ${photoClass}`}
                        src={heroPhotos[photoIndex].src}
                        alt={heroPhotos[photoIndex].alt}
                      />
                    </button>
                  );
                })}
            </div>
            <p className="hero-media-bridge">
              A few favorite moments first, then everything your guests need to know.
            </p>
          </div>
        </header>

        <section className="section details-section" id="details" data-reveal style={{ "--reveal-delay": "80ms" }}>
          <div className="section-heading centered">
            <p className="details-bridge">We can&apos;t wait to celebrate with you in Tagaytay.</p>
            <p className="section-label">Event Details</p>
            <h2>Everything your guests need in one scroll.</h2>
          </div>

          <div className="details-list" aria-label="Event details">
            {eventDetails.map((item) => (
              <article className="detail-row" key={item.label}>
                <item.Icon className="detail-icon" aria-hidden="true" />
                <div className="detail-head">
                  <p className="detail-title">{item.label}</p>
                  <p className="detail-value">{item.value}</p>
                </div>
                <p className="detail-copy">
                  {item.copy.split("\n").map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section story-section" data-reveal style={{ "--reveal-delay": "160ms" }}>
          <div className="story-copy">
            <p className="section-label">A Simple Starter Sample</p>
            <h2>Simple. Practical. Beautiful.</h2>
            <p>
              This sample keeps the focus on RSVP while still feeling warm,
              polished, and easy to send to guests from mobile chat. No extra pages,
              no guest dashboard, just the details and a smooth response flow.
            </p>
          </div>

          <PhotoFrame
            className="story-photo"
            src="/photos/4.jpg"
            alt="Full-length couple portrait outdoors"
          />
        </section>

        <section className="section rsvp-section" id="rsvp" data-reveal style={{ "--reveal-delay": "240ms" }}>
          <div className="section-heading centered">
            <p className="section-label">Kindly RSVP</p>
            <h2>Let us know if we'll be celebrating with you.</h2>
            <p className="section-support">
              This demo stores responses locally so the sample stays lightweight
              while still feeling real.
            </p>
          </div>

          <div className="rsvp-layout">
            <aside className="sidebar-column">
              <div className="sidebar-panel">
                <p className="detail-title">Sample Invitation</p>
                <h3>Amelia and Theo</h3>
                <p>Sunday, November 22, 2026</p>
                <p>Alta Veranda, Tagaytay City</p>
              </div>

              <div className="sidebar-panel">
                <p className="detail-title">What to Expect</p>
                <ul className="mini-list">
                  {highlightList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <PhotoFrame
                className="rsvp-photo"
                src="/photos/6.jpg"
                alt="Bride and groom smiling outdoors"
              />
            </aside>

            <form className="rsvp-form" onSubmit={handleSubmit}>
              <label>
                <span>Full Name</span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Juan Dela Cruz"
                  required
                />
              </label>

              <div className="form-row">
                <fieldset>
                  <legend>Will you attend?</legend>
                  <label className="choice">
                    <input
                      type="radio"
                      name="attendance"
                      value="Joyfully Accept"
                      checked={formData.attendance === "Joyfully Accept"}
                      onChange={handleInputChange}
                    />
                    <span>Joyfully Accept</span>
                  </label>
                  <label className="choice">
                    <input
                      type="radio"
                      name="attendance"
                      value="Regretfully Decline"
                      checked={formData.attendance === "Regretfully Decline"}
                      onChange={handleInputChange}
                    />
                    <span>Regretfully Decline</span>
                  </label>
                </fieldset>

                <label>
                  <span>Number of Guests</span>
                  <select
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  <span>Meal Preference</span>
                  <select name="meal" value={formData.meal} onChange={handleInputChange}>
                    <option value="Chef's Choice">Chef's Choice</option>
                    <option value="Beef">Beef</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Fish">Fish</option>
                    <option value="Vegetarian">Vegetarian</option>
                  </select>
                </label>

                <label>
                  <span>Contact Number</span>
                  <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="+63 9XX XXX XXXX"
                  />
                </label>
              </div>

              <label>
                <span>Message for the Couple</span>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share your wishes and kind words..."
                />
              </label>

              <div className="form-actions">
                <button className="button button-primary" type="submit">
                  Submit RSVP
                </button>
                <p className="form-helper">
                  Demo mode: responses stay in this browser only.
                </p>
              </div>

              <div className={`form-success${submitted ? " is-visible" : ""}`}>
                <strong>RSVP received.</strong>
                <span>
                  Thank you for responding. Your sample confirmation has been
                  saved locally.
                </span>
              </div>
            </form>
          </div>
        </section>

        <section className="section customize-section" data-reveal style={{ "--reveal-delay": "320ms" }}>
          <div className="section-heading centered">
            <p className="section-label">Basic Theme Customization</p>
            <h2>Enough flexibility for a couple-specific feel.</h2>
          </div>

          <div className="customize-grid">
            <div className="theme-panel">
              <p className="detail-title">Color Palette</p>
              <div className="swatch-row">
                {palettes.map((palette) => (
                  <button
                    key={palette.id}
                    className={`swatch${theme === palette.id ? " is-active" : ""}`}
                    type="button"
                    onClick={() => setTheme(palette.id)}
                  >
                    <span className={`swatch-color ${palette.className}`} />
                    <span>{palette.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="theme-panel">
              <p className="detail-title">Typography Mood</p>
              <div className="type-row">
                {typeOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`type-option${typeMood === option.id ? " is-active" : ""}`}
                    type="button"
                    onClick={() => setTypeMood(option.id)}
                  >
                    <span
                      className={`type-sample ${
                        option.id === "classic" ? "classic-sample" : "modern-sample"
                      }`}
                    >
                      Aa
                    </span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="footer" data-reveal style={{ "--reveal-delay": "400ms" }}>
          <Sparkles className="footer-mark" aria-hidden="true" />
          <p className="footer-script">With love, Amelia &amp; Theo</p>
          <p className="footer-copy">
            For RSVP concerns, please contact Sofia at +63 917 555 0146.
          </p>
          <p className="footer-credit">
            Sample website concept for SunSpire Studios Starter Package.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
