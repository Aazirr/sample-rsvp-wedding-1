# DESIGN.md

## Project

Sample Wedding RSVP Website - Starter Package

## Truth Sources

- `C:\Users\Franz Jason Dolores\Documents\SunSpire Studios\docs\startup-strategy.md`
- `C:\Users\Franz Jason Dolores\Documents\SunSpire Studios\docs\launch-roadmap.md`
- Local image assets in `Photoshoot/`

Note: this repo now includes local planning files in `docs/`, while the SunSpire Studios strategy docs above remain the business and offer reference for this sample.

## Package Positioning

This sample represents the SunSpire Studios `Starter` wedding RSVP package.

Primary message:

"A clean, practical RSVP website for couples who want a beautiful online invitation without extra complexity."

The design should communicate:

- Speed of delivery
- Affordability
- Clean mobile experience
- Enough visual polish to sell the service on Facebook
- No unnecessary sections beyond the Starter package scope

## Audience

Primary users:

- Engaged couples who need a simple RSVP link
- Guests opening the site from Messenger, Facebook, or mobile chat
- Wedding vendors who may refer couples to SunSpire Studios

User expectations:

- Understand the event quickly
- Confirm attendance without friction
- See key date, time, venue, and contact details
- Feel that the couple's website is neat and personal

## Page Scope

One-page website only.

Required sections:

1. Hero invitation
2. Event details
3. RSVP form
4. Basic theme customization preview
5. Footer/contact note

Out of scope for this Starter sample:

- Full photo gallery
- Love story page
- Entourage section
- Countdown timer
- Registry or gift guide
- Guest dashboard
- Multi-event support
- Map embed unless later upgraded to Signature

## Content Structure

### 1. Hero Invitation

Purpose:

- Immediately show this is a wedding RSVP site.
- Give couples a visually sellable first impression.

Recommended content:

- Couple names as the main headline
- Wedding date
- Short invitation line
- Primary RSVP button
- One portrait photo from `Photoshoot/` as the main visual

Layout:

- Mobile: full-width photo-led hero with text overlay or text below the photo, depending on readability.
- Desktop: balanced two-column layout with invitation text on one side and a portrait image on the other.

### 2. Event Details

Purpose:

- Give guests the practical information first.

Fields:

- Date
- Ceremony time
- Reception time, if applicable
- Venue name
- Venue address
- Dress code
- Contact person or note

Layout:

- Compact detail rows or cards.
- Avoid making this feel like a premium package section.

### 3. RSVP Form

Purpose:

- Let guests confirm attendance quickly.

Fields:

- Guest name
- Attendance choice: Accepts / Regretfully declines
- Number of guests
- Meal preference, optional if included in sample
- Short message, optional
- Submit button

Behavior for sample:

- Frontend-only form is acceptable for the visual sample.
- Show a simple success state after submission.
- Future production versions can connect to email, Google Sheets, Supabase, or a dashboard.

### 4. Theme Customization Preview

Purpose:

- Show that Starter includes basic customization without making the site feel complex.

Controls or examples:

- Color theme: Blush, Sage, Champagne
- Typography mood: Classic, Modern
- Photo choice from the existing `Photoshoot/` folder

Implementation note:

- If implemented as interactive controls, keep them simple and demo-focused.
- If implemented as static content, present this subtly as part of the design system.

### 5. Footer

Purpose:

- Close the site gracefully and provide support context.

Content:

- Couple name/date
- "For RSVP concerns, please contact..."
- Optional small "Created by SunSpire Studios" credit

## Visual Direction

Overall feel:

- Clean
- Romantic but not ornate
- Practical
- Fast-loading
- Mobile-first

Recommended palette:

- Warm ivory background
- Soft blush accent
- Deep charcoal text
- Muted sage or champagne secondary accent

Avoid:

- Heavy dark overlays
- Large decorative gradients
- Overly ornate script text that hurts readability
- Too many photo tiles, since this is not the Signature package
- Marketing-style sections that distract from the RSVP task

Typography:

- Serif or elegant display font for couple names
- Clear sans-serif for all details and form fields
- Strong mobile readability over decorative styling

Imagery:

- Use one strong portrait image in the hero.
- Use one secondary portrait image only if the page needs visual rhythm.
- Keep image crops respectful and face-aware.
- Optimize photos before implementation for fast loading.

## Responsive Behavior

Mobile priority:

- RSVP button should appear early.
- Event details should be readable without zooming.
- Form controls should be large enough for touch input.
- Avoid side-by-side fields on narrow screens.

Desktop:

- Keep the page centered and elegant.
- Do not stretch text too wide.
- Use portrait imagery as a strong visual anchor.

## Suggested Section Order

1. Hero invitation
2. Event details
3. RSVP form
4. Theme customization sample
5. Footer

Rationale:

Guests should not have to scroll through storytelling before reaching the RSVP action. This keeps the sample aligned with the Starter package: practical, fast, and affordable.

## Starter Package Boundaries

This design should intentionally feel lighter than a premium wedding website.

Starter value comes from:

- A clean shareable RSVP link
- A polished first impression
- Fast confirmation flow
- Basic couple-specific theming

Signature and Premium upgrades can be shown elsewhere, but this sample should not include them by default.

## Sample Content Details

- Couple names: Amelia and Theo
- Wedding date: November 22, 2026
- Ceremony time: 3:00 PM
- Reception time: 5:30 PM
- Ceremony venue: St. Benedict Chapel, Tagaytay City, Philippines
- Reception venue: The Garden Pavilion, Alta Veranda, Tagaytay City
- Dress code: Semi-Formal in soft neutrals, sage, dusty blue, or champagne tones
- RSVP deadline: October 25, 2026
- RSVP contact: Sofia, +63 917 555 0146
- Form behavior: Demo-only with frontend local storage
- Footer branding: Mention SunSpire Studios as the sample package source

## Build Notes

- Keep the implementation lightweight.
- Use local photos from `Photoshoot/`.
- Use a deploy-safe public asset path for production builds.
- Prefer a lightweight framework setup if it improves asset handling, animation control, and future maintainability.
- Optimize images for web delivery.
- Preserve a one-page experience.
- Prioritize mobile layout testing before desktop polish.
