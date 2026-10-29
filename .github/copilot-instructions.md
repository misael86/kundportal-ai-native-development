# Projektriktlinjer

- Svara kort och tydligt på svenska.
- Vid öppna frågor: ge högst tre konkreta alternativ per fråga, rekommendera ett och skilj förslag från fattade beslut.
- Appen är lokal Next.js/TypeScript med SQLite för lärardemo. Ingen publicering eller inloggning i första versionen.
- Använd bara fiktiva kund- och ärendeuppgifter. Använd pnpm; skriv inte npm-kommandon i guider.
- Struktur: `src/features/<feature>/` för features, `src/shared/ui/` för UI, `src/shared/` för baskrav.
- Lägg varje komponents/sidas `<namn>.spec.md` bredvid koden. Följ [spec-instruktionen](./instructions/component-specs.instructions.md). Krav ska vara atomära och verifierbara; ID (`K`, `D`, `T`, `F`) är lokala per komponent/typ och får återkomma i andra komponenter.
- Arbeta testdrivet. Märk varje krav `Automatiserad`, `Manuell` eller `Båda` och verifiera enligt [testinstruktionen](./instructions/tests.instructions.md).
- Följ WCAG 2.2 AA och stöd små/stora skärmar. Automatiska kontroller ersätter inte manuell tangentbords- och skärmläsargranskning.
- SQLite-demodata ska vara fiktiv och seedning idempotent. Tester använder isolerad temporär databas, aldrig lärarens demo-data.
- Behåll kursens löpande fork-PR till kursrepot; interna PR:er går till teamets `main`.
- Spara veckorapporter i `docs/weekly-status/`; följ [veckostatusinstruktionen](./instructions/weekly-status.instructions.md) och bevara historiken.
- Använd [assignment-intake](./skills/assignment-intake/SKILL.md) för substantiella uppdrag: grilla och invänta ett godkännande av en komplett exekveringsprompt som innehåller planen. Komprimera sedan prompten med [caveman-prompt-compact](./skills/caveman-prompt-compact/SKILL.md).
- Avsluta substantiella uppgifter med ett tydligt ja/nej om återanvändbar kunskap hittades. Föreslå plats för eventuell kunskap och fråga innan något sparas eller AI-filer ändras.
- När användaren ber om plan/specifikation, implementera inte. Börja inte bygga appen utan uttrycklig begäran.
