import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
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
  { src: "/photos/1.jpg", alt: "Amelia and Theo embracing outdoors in Tagaytay" },
  { src: "/photos/6.jpg", alt: "Amelia and Theo smiling together outdoors" },
  { src: "/photos/7.jpg", alt: "Amelia and Theo standing beside trees outdoors" },
  { src: "/photos/2.jpg", alt: "Close-up portrait of the couple" },
  { src: "/photos/3.jpg", alt: "Amelia and Theo walking hand in hand" },
  { src: "/photos/4.jpg", alt: "Outdoor portrait of the couple together" },
  { src: "/photos/5.jpg", alt: "Amelia and Theo sharing a quiet moment" },
  { src: "/photos/9.jpg", alt: "Candid moment of the couple" },
];

const weddingPartyGroups = [
  {
    title: "Parents of the Bride",
    members: ["Roberto and Elena Villanueva"],
  },
  {
    title: "Parents of the Groom",
    members: ["Antonio and Marissa Dela Cruz"],
  },
  {
    title: "Matron of Honor",
    members: ["Camille Reyes-Santos"],
  },
  {
    title: "Best Man",
    members: ["Miguel Lorenzo Garcia"],
  },
  {
    title: "Bridesmaids",
    members: [
      "Sofia Mendoza",
      "Patricia Anne Lim",
      "Bianca Isabelle Torres",
      "Katrina Mae Navarro",
      "Danielle Cruz",
    ],
  },
  {
    title: "Groomsmen",
    members: [
      "Rafael Santos",
      "Jerome Castillo",
      "Adrian Morales",
      "Paolo Fernandez",
      "Christian Bautista",
    ],
  },
  {
    title: "Flower Girls",
    members: [
      "Amelia Grace Ramos",
      "Lia Isabelle Tan",
      "Mikaela Joy Santos",
    ],
  },
  {
    title: "Flower Ladies",
    members: [
      "Teresa Gonzales",
      "Carmen Aguilar",
      "Lourdes Rivera",
    ],
  },
  {
    title: "Ring Bearers",
    members: [
      "Lucas Mateo Cruz",
      "Noah Gabriel Reyes",
    ],
  },
];

const weddingPartyMap = Object.fromEntries(
  weddingPartyGroups.map((group) => [group.title, group.members])
);

const sponsors = {
  primary: [
    "Mr. and Mrs. Eduardo Sy",
    "Mr. and Mrs. Benjamin Co",
    "Mr. and Mrs. Ricardo Lim",
    "Mr. and Mrs. Samuel Chua",
    "Mr. and Mrs. Victor Tan",
  ],
  secondary: [
    {
      title: "Candle",
      members: ["Jasmine Marie Lopez", "Carlo Angelo Rivera"],
    },
    {
      title: "Veil",
      members: ["Andrea Nicole Santos", "Francis Miguel Torres"],
    },
    {
      title: "Cord",
      members: ["Michelle Anne Garcia", "Joseph Emmanuel Reyes"],
    },
  ],
};

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

  /* ── Carousel state ── */
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = galleryPhotos.length;
  const touchRef = useRef({ startX: 0, startY: 0, dragging: false });
  const slideInterval = useRef(null);

  const getSlidePosition = useCallback(
    (index) => {
      if (index === activeSlide) {
        return "is-active";
      }

      if (index === (activeSlide - 1 + slideCount) % slideCount) {
        return "is-prev";
      }

      if (index === (activeSlide + 1) % slideCount) {
        return "is-next";
      }

      return "is-hidden";
    },
    [activeSlide, slideCount]
  );

  const goToSlide = useCallback((index) => {
    setActiveSlide((index + slideCount) % slideCount);
  }, [slideCount]);

  const nextSlide = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  const onTouchStart = (e) => {
    touchRef.current = { startX: e.touches ? e.touches[0].clientX : e.clientX, startY: e.touches ? e.touches[0].clientY : e.clientY, dragging: true };
  };

  const onTouchEnd = (e) => {
    if (!touchRef.current.dragging) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const dx = endX - touchRef.current.startX;
    const dy = endY - touchRef.current.startY;
    touchRef.current.dragging = false;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx > 0 ? prevSlide() : nextSlide();
    }
  };

  /* ── Keyboard nav ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prevSlide, nextSlide]);

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

    /* ── Parallax hero image on scroll ── */
    const heroImg = document.querySelector(".hero-frame img");
    let parallaxTicking = false;

    const onScroll = () => {
      if (!parallaxTicking) {
        requestAnimationFrame(() => {
          if (heroImg) {
            const scrollY = window.scrollY;
            const heroRect = heroImg.parentElement.getBoundingClientRect();
            const heroHeight = heroRect.height;
            const heroTop = heroRect.top + scrollY;
            const progress = Math.max(0, Math.min(1, (scrollY - heroTop + window.innerHeight) / (heroHeight + window.innerHeight)));
            const parallaxY = progress * 40;
            heroImg.style.transform = `scale(${1 + progress * 0.08}) translateY(${parallaxY}px)`;
          }
          parallaxTicking = false;
        });
        parallaxTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      document.body.classList.remove("reveal-ready");
      window.removeEventListener("scroll", onScroll);
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
          <div className="hero-invite" data-reveal>
            <p className="eyebrow hero-eyebrow">SunSpire Studios · Starter Sample</p>

            <p className="monogram" aria-hidden="true">
              A<span>&amp;</span>T
            </p>

            <p className="hero-together">Together with their families</p>

            <h1 id="hero-title" className="couple">
              <span className="couple-name">Amelia</span>
              <span className="couple-amp" aria-hidden="true">&amp;</span>
              <span className="couple-name">Theo</span>
            </h1>

            <p className="hero-date">
              <span>Sunday</span>
              <span className="hero-date-sep" aria-hidden="true" />
              <span>November 22, 2026</span>
            </p>

            <p className="hero-place">
              St. Benedict Chapel · Tagaytay City, Philippines
            </p>

            <p className="hero-lead">
              Join us for vows beneath the pines and a garden dinner at golden
              hour. We would be honored to share the day with you.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#rsvp">
                RSVP
              </a>
              <a className="button button-secondary" href="#details">
                View event details
              </a>
            </div>

            <p className="hero-glance" aria-label="Schedule at a glance">
              <span><strong>3:00 PM</strong> Ceremony</span>
              <span className="hero-glance-sep" aria-hidden="true" />
              <span><strong>5:30 PM</strong> Reception</span>
            </p>
          </div>

          <figure className="hero-frame" data-reveal>
            <img
              src="/photos/1.jpg"
              alt="Amelia and Theo embracing outdoors in Tagaytay"
            />
            <figcaption>Amelia &amp; Theo · Tagaytay City</figcaption>
          </figure>
        </section>

        <section className="section details" id="details" data-reveal>
          <div className="section-copy">
            <p className="eyebrow"><span className="idx">01</span>The day</p>
            <h2>Event details</h2>
            <p className="section-lead">
              Everything you need to plan the day, kept to a single glance.
            </p>
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

        <section className="section entourage" data-reveal>
          <div className="section-copy ceremony-copy">
            <p className="eyebrow"><span className="idx">02</span>Wedding party</p>
            <h2>The names that stand with them</h2>
            <p className="ceremony-summary">
              Family opens the aisle, closest friends take their places, and every
              role adds its own quiet weight to the ceremony.
            </p>
          </div>

          <div className="ceremony-layout">
            <div className="ceremony-lead">
              <p className="aside-title">Ceremony entourage</p>
              <p>
                A more traditional invitation flow places the wedding party closer
                to the event details, where guests naturally look for the people
                taking part in the rites.
              </p>
            </div>

            <div className="entourage-grid" aria-label="Wedding party">
              <div className="pair-row pair-row-two">
                <article className="party-group is-featured">
                  <p className="party-role">Parents of the Bride</p>
                  <ul className="party-list">
                    {weddingPartyMap["Parents of the Bride"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
                <article className="party-group is-featured">
                  <p className="party-role">Parents of the Groom</p>
                  <ul className="party-list">
                    {weddingPartyMap["Parents of the Groom"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="pair-row pair-row-two">
                <article className="party-group">
                  <p className="party-role">Matron of Honor</p>
                  <ul className="party-list">
                    {weddingPartyMap["Matron of Honor"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
                <article className="party-group">
                  <p className="party-role">Best Man</p>
                  <ul className="party-list">
                    {weddingPartyMap["Best Man"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="pair-row pair-row-two">
                <article className="party-group">
                  <p className="party-role">Bridesmaids</p>
                  <ul className="party-list">
                    {weddingPartyMap["Bridesmaids"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
                <article className="party-group">
                  <p className="party-role">Groomsmen</p>
                  <ul className="party-list">
                    {weddingPartyMap["Groomsmen"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="pair-row pair-row-two">
                <article className="party-group">
                  <p className="party-role">Flower Girls</p>
                  <ul className="party-list">
                    {weddingPartyMap["Flower Girls"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
                <article className="party-group">
                  <p className="party-role">Flower Ladies</p>
                  <ul className="party-list">
                    {weddingPartyMap["Flower Ladies"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="pair-row pair-row-one">
                <article className="party-group">
                  <p className="party-role">Ring Bearers</p>
                  <ul className="party-list">
                    {weddingPartyMap["Ring Bearers"].map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section sponsors" data-reveal>
          <div className="section-copy ceremony-copy">
            <p className="eyebrow"><span className="idx">03</span>Sponsors</p>
            <h2>Witnesses to the vows</h2>
            <p className="ceremony-summary">
              With gratitude to the sponsors who will witness, bless, and stand
              beside Amelia and Theo throughout the ceremony.
            </p>
          </div>

          <div className="sponsors-layout ceremony-layout">
            <article className="sponsor-panel primary-sponsors">
              <p className="party-role">Primary Sponsors</p>
              <ul className="party-list">
                {sponsors.primary.map((sponsor) => (
                  <li key={sponsor}>{sponsor}</li>
                ))}
              </ul>
            </article>

            <div className="secondary-sponsors" aria-label="Secondary sponsors">
              {sponsors.secondary.map((group) => (
                <article className="sponsor-panel" key={group.title}>
                  <p className="party-role">{group.title}</p>
                  <ul className="party-list">
                    {group.members.map((member) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section gallery" data-reveal>
          <div className="section-copy">
            <p className="eyebrow"><span className="idx">04</span>Photo moments</p>
            <h2>Gallery</h2>
            <p className="gallery-summary">
              A few frames from the couple, kept light so the page still loads in a
              blink.
            </p>
          </div>

          <div
            className="gallery-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label={`Photo ${activeSlide + 1} of ${slideCount}`}
          >
            <div
              className="carousel-track"
              onMouseDown={onTouchStart}
              onMouseUp={onTouchEnd}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {galleryPhotos.map((photo, i) => (
                <div
                  className={`carousel-slide ${getSlidePosition(i)}`}
                  key={photo.src}
                  aria-hidden={i !== activeSlide}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable="false"
                  />
                </div>
              ))}

              <button
                className="carousel-arrow carousel-prev"
                onClick={prevSlide}
                aria-label="Previous photo"
              >
                <ChevronLeft />
              </button>
              <button
                className="carousel-arrow carousel-next"
                onClick={nextSlide}
                aria-label="Next photo"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="carousel-dots" role="tablist" aria-label="Slide selector">
              {galleryPhotos.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === activeSlide ? " is-active" : ""}`}
                  onClick={() => goToSlide(i)}
                  role="tab"
                  aria-selected={i === activeSlide}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>

            <p className="carousel-counter" aria-live="polite">
              {activeSlide + 1} / {slideCount}
            </p>
          </div>
        </section>

        <section className="section rsvp" id="rsvp" data-reveal>
          <div className="section-copy">
            <p className="eyebrow"><span className="idx">05</span>Répondez</p>
            <h2>RSVP in one minute</h2>
            <p className="section-lead">
              Kindly reply by October 25, 2026. It takes less than a minute.
            </p>
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
            <p className="eyebrow"><span className="idx">06</span>Make it yours</p>
            <h2>Basic theme customization</h2>
            <p className="section-lead">
              Starter includes light theming, enough to feel personal without
              turning setup into a full custom build.
            </p>
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

            <aside className="customize-preview">
              <p className="aside-title">Live starter preview</p>
              <div
                className={`preview-stage preview-${theme} preview-type-${typeMood}`}
              >
                <img
                  className="preview-image"
                  src={previewPhoto}
                  alt="Preview of the selected hero photo option"
                />
                <div className="preview-copy">
                  <p className="preview-label">Sample invitation mood</p>
                  <h3>Amelia & Theo</h3>
                  <p>November 22, 2026 · Tagaytay City</p>
                  <div className="preview-tags" aria-label="Preview selections">
                    <span>{palettes.find((palette) => palette.id === theme)?.name}</span>
                    <span>{typeOptions.find((option) => option.id === typeMood)?.name}</span>
                    <span>Starter package</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <footer className="footer" data-reveal>
          <p className="monogram footer-monogram" aria-hidden="true">
            A<span>&amp;</span>T
          </p>
          <p className="footer-couple">Amelia &amp; Theo · November 22, 2026</p>
          <p>For RSVP concerns, please contact Sofia at +63 917 555 0146.</p>
          <small>Sample website concept for SunSpire Studios Starter Package.</small>
        </footer>
      </main>
    </div>
  );
}

export default App;
