# Projektriktlinjer

- Svara kort och tydligt på svenska; föredra punktlistor och undvik upprepningar.
- Projektet är en lokal Next.js-app med TypeScript och SQLite för lärardemo. Den ska inte publiceras och har ingen inloggning i första versionen.
- Använd endast fiktiva kund- och ärendeuppgifter.
- Följ feature-driven struktur: featurekod i `src/features/<feature>/`, återanvändbar UI i `src/shared/ui/`, gemensamma baskrav i `src/shared/`.
- Varje komponent och sida har sin kravspecifikation bredvid koden som `<namn>.spec.md`. Följ [spec-instruktionen](./instructions/component-specs.instructions.md).
- Håll krav atomära och verifierbara. Krav-ID numreras per komponent och kravtyp (`K`, `D`, `T`, `F`); ID:n får återkomma mellan komponenter.
- Arbeta testdrivet. Varje krav ska täckas av minst ett automatiserat test; ett test får täcka flera krav. Följ [testinstruktionen](./instructions/tests.instructions.md).
- Uppfyll WCAG 2.2 AA och responsiv användning på små och stora skärmar. Automatiska kontroller ersätter inte manuell tangentbords- och skärmläsargranskning.
- SQLite-demodata ska vara fiktiv och seedning idempotent. Tester använder isolerad temporär databas, aldrig lärarens lokala demo-data.
- Behåll kursens löpande fork-PR till kursrepot; interna PR:er går till teamets `main`.
- Veckorapporter ligger i `docs/weekly-status/`; följ [veckostatusinstruktionen](./instructions/weekly-status.instructions.md) och bevara tidigare rapporter.
- Planera eller specificera utan att implementera när det är vad användaren ber om. Börja inte bygga appen utan uttrycklig begäran om implementation.
