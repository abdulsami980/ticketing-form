## Contact Us Form — React + Vite

A production-ready contact form application with a dark theme, animated galaxy background, and a typed headline. The form is validated with Zod and react-hook-form and submits to an n8n webhook. Built with Vite for fast local development and easy deployment.

### Highlights

- **Galaxy background**: GPU-accelerated starfield using `ogl` with GSAP-like interactivity
- **Dark theme**: Global dark color system via CSS variables and utility classes
- **Glassmorphism card**: Semi-transparent, blurred form panel overlaying the galaxy
- **Typed headline**: Configurable typing animation with blinking cursor
- **Robust form**: `react-hook-form` + `zod` validation, toast feedback via `sonner`
- **Webhook forwarding**: Sends submissions to an `n8n` webhook endpoint

### Tech Stack

- React 18 + Vite
- Tailwind-like utilities (via `@import "tailwindcss"` in `src/index.css`)
- OGL (WebGL) for the galaxy shader background (`src/components/ui/Galaxy.jsx`)
- GSAP for cursor blink animation in `TextType`
- react-hook-form + zod for form state and validation
- sonner for toasts

---

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm (bundled with Node) or pnpm/yarn

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Configuration

### n8n Webhook Endpoint

The form submits via GET to a relative path:

`/n8n/webhook/React-Contact-Form`

You can handle this in one of two ways:

- Configure your hosting/reverse proxy to forward `/n8n/*` to your n8n instance
- During development, run n8n locally and use a dev proxy in Vite if desired

The form also appends `ngrok-skip-browser-warning=1` and a cache-busting `_ts` parameter.

If your webhook path differs, update `baseUrl` in `src/components/common/contactForm.jsx`.

### Dark Theme

Dark mode is enabled by wrapping the app root with a `dark` class. Color tokens are defined in `src/index.css` under the `.dark` block and are applied throughout the UI.

### Galaxy Background Interaction

`src/components/ui/Galaxy.jsx` renders the animated starfield as a full-page background. Mouse interaction is globally captured but intentionally disabled when the mouse is over elements marked with:

```html
data-block-galaxy="true"
```

This is applied to the form card container so the starfield pauses while users interact with the form.

---

## Key Components

### Galaxy

Path: `src/components/ui/Galaxy.jsx`

Props of interest:

- `transparent` (boolean): whether the canvas has transparency (set to `false` for solid background)
- `density`, `hueShift`, `saturation`, `glowIntensity`, `starSpeed`, `twinkleIntensity`: visual tuning
- `mouseInteraction` (boolean): enable or disable mouse interaction globally

Usage example (see `src/App.jsx`):

```jsx
<Galaxy
  className="absolute inset-0 -z-10"
  transparent={false}
  density={1.2}
  hueShift={200}
  saturation={0.8}
  glowIntensity={0.35}
/>
```

### TextType (Typed Headline)

Path: `src/components/ui/TypeText.jsx`

Selected props:

- `text`: string or string[]
- `typingSpeed`, `deletingSpeed`, `pauseDuration`, `initialDelay`
- `loop`, `reverseMode`, `variableSpeed`
- `showCursor`, `hideCursorWhileTyping`, `cursorCharacter`, `cursorBlinkDuration`

Cursor blinking is animated with GSAP and safely recreated when `cursorBlinkDuration` changes.

Example (see `src/App.jsx`):

```jsx
<TextType
  text={["Contact Us!", "Generate a Ticket!", "Ask a Query!"]}
  typingSpeed={70}
  pauseDuration={1500}
  showCursor
  cursorCharacter="_"
  cursorBlinkDuration={0.2}
  className="text-2xl"
/>
```

### ContactForm

Path: `src/components/common/contactForm.jsx`

Validation with Zod, UX via react-hook-form, and toasts via `sonner`. Fields include name, email, phone, department, request type, and message. On submit, a timestamp is appended and data is sent to the configured n8n webhook.

---

## Project Structure

```
src/
  App.jsx                 # Page layout; galaxy background + glass card
  index.css               # Theme tokens and base styles
  components/
    common/
      contactForm.jsx     # Validated contact form with webhook submit
    ui/
      Galaxy.jsx          # WebGL galaxy background
      TypeText.jsx        # Typed text with blinking cursor
      form/               # Form primitives
      button/             # Button component
```

---

## Deployment

Any static hosting platform that supports SPA routing will work (Vercel, Netlify, Cloudflare Pages, static S3/CloudFront, etc.). Ensure your reverse proxy routes `/n8n/*` to your n8n instance in production.

Example Nginx snippet:

```nginx
location /n8n/ {
  proxy_pass http://n8n.internal/;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
}
```

---

## Accessibility & Quality

- Labels are associated with inputs via `FormLabel` and field bindings
- Keyboard focus states are preserved
- Color contrast based on dark theme tokens
- ESLint configured; run `npm run lint` regularly

---

## Troubleshooting

- Galaxy not reacting to mouse: ensure no full-screen element has `data-block-galaxy="true"` unintentionally; check that the canvas is mounted and not covered by an element with `pointer-events: none` issues.
- Webhook not receiving data: verify reverse proxy for `/n8n/webhook/React-Contact-Form` and CORS settings on your n8n instance.
- Cursor not visible: confirm `showCursor` is true and `cursorBlinkDuration` is a positive number. The app recreates the blink tween when this prop changes.

---

## License

This project is provided as-is. Add your preferred license for production use.
