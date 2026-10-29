# Beslut och uppföljning

Använd denna logg för öppna och senarelagda beslut samt beslutad men ej genomförd implementation. Bocka av beslut först när beslutet är dokumenterat; bocka av genomförande separat. Lägg till nya uppskjutna beslut här. Hitta inte på ansvariga eller datum.

## Öppna beslut

- Inga kända öppna beslut.

## Senarelagda beslut

- [ ] **Playwright-version:** lås kompatibel stabilversion när E2E-testning läggs till.
- [ ] **CI-checknamn:** fastställ exakta checknamn när workflow implementeras; konfigurera sedan branch protection/ruleset mot dessa.

## Beslutade val

- [x] **SQLite/servergräns:** `better-sqlite3` i server-only datalager. Server Components läser; Server Actions skriver. Använd Node.js-runtime, inte Edge.
- [x] **Runtime:** Node.js `24.22.2`; pnpm 10. Lås exakt pnpm-patch i `packageManager` vid scaffold.
- [x] **Kategorier:** Konto, Betalning, Leverans, Retur/reklamation, Övrigt.
- [x] **Prioriteter:** Låg, Normal, Hög, Akut.
- [x] **Redigering:** rubrik, beskrivning, kategori och prioritet kan redigeras. Status ändras separat på detaljsidan.
- [x] **Sortering:** `created_at` fallande; ID fallande vid lika skapelsetid.
- [x] **Teststack:** Vitest, Testing Library med `user-event`, jsdom, V8 coverage och Playwright E2E. Lås kompatibla stabilversioner vid scaffold.
- [x] **Storybook:** använd för delade UI-komponenter och kör produktionsbuild i CI. Lås kompatibel stabilversion vid scaffold.
- [x] **Kravverifiering:** varje krav märks `Automatiserad`, `Manuell` eller `Båda`. CI kräver test för `Automatiserad`/`Båda` och godkänd checklistpost för `Manuell`/`Båda`.
- [x] **Manuell tillgänglighetskontroll:** spåra krav-ID, kontrollsteg, resultat, datum och PR/commit i [checklistan](accessibility-manual-checks.md).
- [x] **Sökning:** sök i rubrik, beskrivning och kategori. Trimma söktext; matcha delsträngar skiftlägesokänsligt, inklusive svenska tecken. Tom sökning ignoreras. Sökning kombineras med statusfilter.
- [x] **CI-trigger:** kör workflow endast vid `pull_request` riktad mot teamets `main`. Kursens löpande PR ändras inte.
- [x] **UI-inspiration:** Zendesk för support- och ärendeflöden, Plain för avskalad och modern B2B-känsla samt GOV.UK Design System för tillgängliga mönster. Använd som referenser, inte kopior; se [UI-riktlinjerna](ui-guidelines.md).
- [x] **UI-teman:** stöd ljust och mörkt tema. Följ operativsystemets inställning initialt och kom ihåg användarens manuella temaval.
- [x] **Tangentbordsfokus:** använd en tydlig, konsekvent fokusindikator som fungerar i både ljust och mörkt tema.

## Beslutade, ej genomförda

- [x] Lås Node.js `24.22.2` i `.nvmrc` och `engines`; lås pnpm-patch i `packageManager`.
- [x] Skapa Next.js-/Storybook-grund med delade komponenter, stories och komponenttester.
- [ ] Implementera CI enligt [projektplanen](plan.md), inklusive Storybook-build och kravverifiering.
- [ ] Aktivera branch protection/ruleset så CI-checks krävs före merge till teamets `main`.
- [ ] Implementera och dokumentera beslutad SQLite-/servergräns och validering i appen.
- [ ] Implementera beslutade kategorier, prioriteter, redigering, sortering och sökbeteende i applikation och databas.
- [x] Implementera systemtema, sparat manuellt temaval och temaväljare enligt [UI-riktlinjerna](ui-guidelines.md).
- [ ] Genomföra och dokumentera manuell kontroll av fokusindikator och kontrast i båda temana enligt [UI-riktlinjerna](ui-guidelines.md).
