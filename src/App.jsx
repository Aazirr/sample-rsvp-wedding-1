import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  PaintbrushVertical,
  Shirt,
  Sparkles,
  Type,
  UtensilsCrossed,
  Users,
} from "lucide-react";

const details = [
  {
    title: "Ceremony",
    value: "Sunday, November 22, 2026",
    copy: "3:00 PM at St. Benedict Chapel, Tagaytay City",
    Icon: CalendarDays,
  },
  {
    title: "Reception",
    value: "Alta Veranda",
    copy: "5:30 PM at The Garden Pavilion, Tagaytay City",
    Icon: MapPin,
  },
  {
    title: "Dress Code",
    value: "Semi-Formal",
    copy: "Soft neutrals, sage, dusty blue, and champagne tones are welcome.",
    Icon: Shirt,
  },
  {
    title: "RSVP Deadline",
    value: "October 25, 2026",
    copy: "For assistance, contact Sofia at +63 917 555 0146.",
    Icon: Clock3,
  },
];

const expectations = [
  { label: "Outdoor ceremony", Icon: Sparkles },
  { label: "Garden reception", Icon: Users },
  { label: "Seated dinner", Icon: UtensilsCrossed },
];

const palettes = [
  { id: "blush", name: "Blush", preview: "swatch-blush" },
  { id: "sage", name: "Sage", preview: "swatch-sage" },
  { id: "champagne", name: "Champagne", preview: "swatch-champagne" },
];

const typeOptions = [
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
];

const previewPhotos = ["/photos/1.jpg", "/photos/6.jpg", "/photos/7.jpg"];
const galleryPhotos = [
  { src: "/photos/7.jpg", alt: "Amelia and Theo standing beside trees outdoors" },
  { src: "/photos/6.jpg", alt: "Amelia and Theo smiling together outdoors" },
  { src: "/photos/4.jpg", alt: "Outdoor portrait of the couple together" },
];

function App() {
  const [theme, setTheme] = useState("blush");
  const [typeMood, setTypeMood] = useState("classic");
  const [previewPhoto, setPreviewPhoto] = useState(previewPhotos[0]);
  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    document.body.dataset.theme = theme;
    document.body.dataset.type = typeMood;
  }, [theme, typeMood]);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal]"));

    if (!targets.length) {
      return undefined;
    }

    document.body.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      document.body.classList.remove("reveal-ready");
    };
  }, []);

  const handleChange = (event) => {
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
    <div className="app-shell">
      <main className="page">
        <section className="hero" aria-labelledby="hero-title">
          <figure className="hero-visual" data-reveal>
            <img
              src="/photos/1.jpg"
              alt="Amelia and Theo embracing outdoors in Tagaytay"
            />
            <figcaption className="hero-overlay">
              <p className="hero-kicker">SunSpire Studios Starter Sample</p>
              <h1 id="hero-title">
                <span className="hero-name">Amelia</span>
                <em>and</em>
                <span className="hero-name">Theo</span>
              </h1>
              <p className="hero-date">November 22, 2026</p>
              <p className="hero-subline">A candlelit garden celebration in Tagaytay City</p>
            </figcaption>
          </figure>

          <div className="hero-copy" data-reveal>
            <div className="hero-meta" aria-label="Event summary">
              <p>Tagaytay City, Philippines</p>
              <p>Outdoor ceremony, seated dinner, acoustic after-party set</p>
            </div>

            <div className="hero-actions">
              <a className="button button-primary" href="#rsvp">
                RSVP Now
              </a>
              <a className="button button-secondary" href="#details">
                View Event Details
              </a>
            </div>
          </div>
        </section>

        <section className="section details" id="details" data-reveal>
          <div className="section-copy">
            <h2>Event details</h2>
          </div>

          <div className="details-layout">
            <div className="details-list" aria-label="Wedding details">
              {details.map((item) => (
                <article className="detail-item" key={item.title}>
                  <item.Icon className="detail-icon" aria-hidden="true" />
                  <div className="detail-body">
                    <p className="detail-title">{item.title}</p>
                    <h3>{item.value}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="expectations">
              <p className="aside-title">What guests can expect</p>
              <ul>
                {expectations.map((item) => (
                  <li key={item.label}>
                    <item.Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section gallery" data-reveal>
          <div className="section-copy">
            <h2>Gallery</h2>
          </div>

          <div className="gallery-grid" aria-label="Wedding gallery">
            {galleryPhotos.map((photo) => (
              <figure className="gallery-card" key={photo.src}>
                <img className="gallery-photo" src={photo.src} alt={photo.alt} />
              </figure>
            ))}
          </div>
        </section>

        <section className="section rsvp" id="rsvp" data-reveal>
          <div className="section-copy">
            <p className="section-intro">
              The starter package keeps the RSVP flow lightweight while still
              looking polished on mobile.
            </p>
            <h2>RSVP in one minute</h2>
          </div>

          <div className="rsvp-layout">
            <div className="rsvp-sidebar">
              <div className="invitation-note">
                <p className="aside-title">Sample invitation</p>
                <h3>Amelia and Theo</h3>
                <p>Sunday, November 22, 2026</p>
                <p>Alta Veranda, Tagaytay City</p>
              </div>
            </div>

            <form className="rsvp-form" onSubmit={handleSubmit}>
              <label>
                <span>Full name</span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Juan Dela Cruz"
                  required
                />
              </label>

              <div className="form-grid">
                <fieldset>
                  <legend>Will you attend?</legend>
                  <label className="choice">
                    <input
                      type="radio"
                      name="attendance"
                      value="Joyfully Accept"
                      checked={formData.attendance === "Joyfully Accept"}
                      onChange={handleChange}
                    />
                    <span>Joyfully Accept</span>
                  </label>
                  <label className="choice">
                    <input
                      type="radio"
                      name="attendance"
                      value="Regretfully Decline"
                      checked={formData.attendance === "Regretfully Decline"}
                      onChange={handleChange}
                    />
                    <span>Regretfully Decline</span>
                  </label>
                </fieldset>

                <label>
                  <span>Guest count</span>
                  <select
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </label>
              </div>

              <div className="form-grid">
                <label>
                  <span>Meal preference</span>
                  <select name="meal" value={formData.meal} onChange={handleChange}>
                    <option value="Chef's Choice">Chef&apos;s Choice</option>
                    <option value="Beef">Beef</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Fish">Fish</option>
                    <option value="Vegetarian">Vegetarian</option>
                  </select>
                </label>

                <label>
                  <span>Contact number</span>
                  <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+63 9XX XXX XXXX"
                  />
                </label>
              </div>

              <label>
                <span>Message for the couple</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Share your wishes and kind words..."
                />
              </label>

              <div className="form-actions">
                <button className="button button-primary" type="submit">
                  Submit RSVP
                </button>
                <p>Demo mode: responses are stored only in this browser.</p>
              </div>

              <div className={`form-success${submitted ? " is-visible" : ""}`}>
                <strong>RSVP received.</strong>
                <span>Your sample confirmation has been saved locally.</span>
              </div>
            </form>
          </div>
        </section>

        <section className="section customize" data-reveal>
          <div className="section-copy">
            <p className="section-intro">
              Starter includes basic theming, enough for couples to feel the site is
              theirs without turning the setup into a full custom build.
            </p>
            <h2>Basic theme customization</h2>
          </div>

          <div className="customize-layout">
            <div className="customize-controls">
              <div className="control-block">
                <div className="control-head">
                  <PaintbrushVertical aria-hidden="true" />
                  <div>
                    <p className="aside-title">Color palette</p>
                    <p>Swap the mood in one click.</p>
                  </div>
                </div>
                <div className="choice-row" role="group" aria-label="Color themes">
                  {palettes.map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      className={`theme-chip${theme === palette.id ? " is-active" : ""}`}
                      onClick={() => setTheme(palette.id)}
                    >
                      <span className={`swatch ${palette.preview}`} aria-hidden="true" />
                      <span>{palette.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-block">
                <div className="control-head">
                  <Type aria-hidden="true" />
                  <div>
                    <p className="aside-title">Typography mood</p>
                    <p>Classic for romance, modern for a cleaner invitation feel.</p>
                  </div>
                </div>
                <div className="choice-row" role="group" aria-label="Typography moods">
                  {typeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`type-chip${typeMood === option.id ? " is-active" : ""}`}
                      onClick={() => setTypeMood(option.id)}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-block">
                <div className="control-head">
                  <Sparkles aria-hidden="true" />
                  <div>
                    <p className="aside-title">Hero photo</p>
                    <p>Choose from the existing photoshoot set.</p>
                  </div>
                </div>
                <div className="choice-row photo-row" role="group" aria-label="Photo choices">
                  {previewPhotos.map((photo) => (
                    <button
                      key={photo}
                      type="button"
                      className={`photo-chip${previewPhoto === photo ? " is-active" : ""}`}
                      onClick={() => setPreviewPhoto(photo)}
                    >
                      <img src={photo} alt="" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer" data-reveal>
          <p>For RSVP concerns, please contact Sofia at +63 917 555 0146.</p>
          <small>Sample website concept for SunSpire Studios Starter Package.</small>
        </footer>
      </main>
    </div>
  );
}

export default App;
