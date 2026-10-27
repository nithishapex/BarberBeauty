# Crownora Barber Academy

Static Vite and React site. Run it locally with `npm install` and `npm run dev`.

## My Certificates

This is a frontend prototype. Student access is simulated in the browser. It is not secure authentication, and the demonstration access codes are visible in `src/data/certificates.js` and on the access page.

### Demo access

| Student | Student ID | Private access code | Certificates |
| --- | --- | --- | --- |
| Hassan Raza | `CBA-STU-2026-00842` | `K7P9-X4M2` | `CBA-BC-2026-0148` Classic Barbering Course, 20 Oct 2026 |
| Muhammad Ali | `CBA-STU-2026-01933` | `Q8W3-N5T1` | `CBA-HS-2026-0275` Hair Styling & Grooming Course, 22 Oct 2026 |
| Owais Khan | `CBA-STU-2026-01408` | `B2H6-L9R4` | `CBA-BE-2026-0361` Beard & Men's Grooming Course, 25 Oct 2026 |
| Noor Ahmed | `CBA-STU-2026-00017` | `T3S8-E1M4` | None. Use this login to see the empty state. |

Open `/certificates/access`, enter one student, and choose View Certificate. That opens that student's certificate page directly. There is no personal certificate list.

The private access code is checked in the browser and is not saved.

### Routes

- `/certificates/access` — Student ID and private access code
- `/certificates/:certificateId` — opens the same public verification page
- `/certificates/verify/:certificateId` — certificate view opened from View Certificate or from the QR code, no access code required
- `/certificates/review/:certificateId` — review form for one certificate

`/certificates` redirects to the access page. There is no public list of every student certificate.

### QR verification

Each certificate image keeps the QR code already printed on the artwork. That code is the verification link for that certificate only, for example `http://127.0.0.1:5174/certificates/verify/CBA-BC-2026-0148`. The app does not add a second QR code beside or below the certificate. On the deployed site the code uses the page origin plus the Vite base path. Set `VITE_SITE_URL` to an origin such as `https://nithishapex.github.io` when a code should always use that host. Do not include `/BarberBeauty` in that variable.

Scanning the code, or choosing View Certificate, opens that certificate's verification page. It does not open the private dashboard, show a private access code, or list other certificates. A direct visit or refresh works in `npm run dev`. GitHub Pages uses `404.html` copied from `index.html` by the deploy workflow, so the same client routes can load there.

The downloaded PNG is the certificate image, with that same QR code in its original place.

### Reviews and storage

Reviews are saved in `localStorage` under `crownora.certificateReviews.v1`, attached to the certificate ID. They stay in this browser only. They are not sent to a server, shared with other visitors, or synced across devices. Saving a review does not verify the reviewer.

### Later backend

A production version would replace this module with real member authentication, certificates linked to accounts, server-side verification and revocation, centralized reviews, and QR checks against an authoritative record. Do not treat the current browser checks as access control. Anyone can read the frontend data and storage.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
