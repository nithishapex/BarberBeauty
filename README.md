# Crownora Barber Academy

Static Vite and React site. Run it locally with `npm install` and `npm run dev`.

## My Certificates

This is a frontend prototype. Student access is simulated in the browser. It is not secure authentication. The certificate password is the date of birth, and those details are in `src/data/certificates.js`.

### Certificate access

| Student | Student ID | Date of birth | Certificate |
| --- | --- | --- | --- |
| FIROZ IDRISH | `CBA-2026-368` | `01-01-1996` | `CBA-2026-368`, issued 19 May 2026 |
| MOHD TANVEER MOHAMAD MEHTAB SALMANI | `CBA-2026-978` | `27-10-2004` | `CBA-2026-978`, issued 12 Jun 2026 |
| NAVEED AHMAD MUHAMMAD RASHEED RAJPUT | `CBA-2026-774` | `21-11-1999` | `CBA-2026-774`, issued 16 May 2026 |
| NAVED ALI SIKANDER | `CBA-2026-324` | `12-12-2000` | `CBA-2026-324`, issued 27 Oct 2026 |

Open `/certificates/access`, enter the Student ID and date of birth, and choose View Certificate. That opens that student's certificate page directly. There is no personal certificate list.

The date of birth is checked in the browser and is not saved.

### Routes

- `/certificates/access` — Student ID and date of birth
- `/certificates/:certificateId` — opens the same public verification page
- `/certificates/verify/:certificateId` — certificate view opened from View Certificate or from the QR code, no access code required
- `/certificates/review/:certificateId` — review form for one certificate

`/certificates` redirects to the access page. There is no public list of every student certificate.

### QR verification

Each certificate image has one QR code in the corner. That code is the verification link for that certificate only, for example `http://127.0.0.1:5173/certificates/verify/CBA-2026-368`. The app does not add a second QR code beside or below the certificate. On the deployed site the code uses the page origin plus the Vite base path. Set `VITE_SITE_URL` to an origin such as `https://nithishapex.github.io` when a code should always use that host. Do not include `/BarberBeauty` in that variable.

Scanning the code, or choosing View Certificate, opens that certificate's verification page. It does not open the private dashboard, show a private access code, or list other certificates. A direct visit or refresh works in `npm run dev`. GitHub Pages uses `404.html` copied from `index.html` by the deploy workflow, so the same client routes can load there.

The downloaded file is a PDF of the certificate image, with that same QR code in its original place.

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
