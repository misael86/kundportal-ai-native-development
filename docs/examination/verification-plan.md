# Verifieringsplan

Kravspecifikationerna definierar acceptanskriterier och stabila krav-ID:n. Matrisen nedan omfattar samtliga 29 ID:n. **Kört** betyder att angivet test passerade i verifieringen nedan; **Öppet** betyder att kravet inte påstås vara täckt eller färdigt.

## Körda kontroller

Kört 2026-11-04 med Node.js 22.12.0 och npm 10.9.0:

| Kommando | Faktiskt resultat |
|---|---|
| `npm test` | **Godkänt:** API 77/77 tester i 5 filer; webb 32/32 tester i 5 filer. |
| `npm run test:e2e` | **Godkänt:** CPU-konfigurationstester 2/2; E2E TypeScript-kontroll passerade; 6/6 Playwright-flöden passerade i Chromium med 6 workers. |
| `npm run build` | **Godkänt:** API TypeScript-build samt webbens TypeScript-kontroll och Vite-produktionsbygge passerade. |

Playwright använder `availableParallelism()` och kör med `max(1, floor(80 % av tillgängliga processorer))` workers. Varje parallellt test startar en egen API-/webbinstans och använder en separat SQLite-fil under operativsystemets temporärkatalog. Efter testet stoppas servrarna och den tillfälliga katalogen tas bort; den lokala `data/kundportal.sqlite` används inte.

GitHub Actions-workflowen för pull requests är konfigurerad i [.github/workflows/ci.yml](../../.github/workflows/ci.yml) för `npm ci`, Chromium-installation, `npm test`, `npm run test:e2e` och `npm run build`. Ingen fjärrkörd GitHub Actions-run har verifierats i denna lokala arbetskopia.

## Krav-till-test-matris

| Krav-ID | Automatiserad kontroll | Nivå och resultat |
|---|---|---|
| CASE-CREATE-001 | [cases.test.ts](../../packages/api/src/cases.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/UI/E2E; **Kört**. Trimning, tomma värden och gränser kontrolleras. |
| CASE-CREATE-002 | Samma filer som ovan | API/UI/E2E; **Kört**. Trimning, tomma värden och gränser kontrolleras. |
| CASE-CREATE-003 | [cases.test.ts](../../packages/api/src/cases.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. API avvisar okänd kategori; browserflödet visar de tillåtna alternativen. |
| CASE-CREATE-004 | [cases.test.ts](../../packages/api/src/cases.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. API avvisar okänd prioritet; browserflödet visar de tillåtna alternativen. |
| CASE-CREATE-005 | [cases.test.ts](../../packages/api/src/cases.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. Standardstatus och skapandetid verifieras. |
| CASE-CREATE-006 | [cases.test.ts](../../packages/api/src/cases.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/SQLite/E2E; **Kört**. API-test öppnar databasen igen; E2E läser efter omladdning av sidan. |
| CASE-CREATE-007 | [cases.test.ts](../../packages/api/src/cases.test.ts), [CaseForm.test.tsx](../../packages/web/src/CaseForm.test.tsx) | API/UI; **Kört**. Ogiltig indata avvisas, lagringen förblir oförändrad och felet visas. |
| CASE-CREATE-008 | [cases.test.ts](../../packages/api/src/cases.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. Ärende skapas och visas utan anteckning. |
| CASE-LIST-001 | [caseList.test.ts](../../packages/api/src/caseList.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. Sammanfattningsfält och nyast-först-sortering verifieras. |
| CASE-LIST-002 | [caseList.test.ts](../../packages/api/src/caseList.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. Tom array och verkligt tomläge verifieras. |
| CASE-LIST-003 | [CaseList.test.tsx](../../packages/web/src/CaseList.test.tsx) | UI; **Kört**. Hämtningsfel är skilt från en lyckad tom lista. |
| CASE-DETAIL-001 | [caseDetail.test.ts](../../packages/api/src/caseDetail.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. Val av ärende och fullständig detaljvy verifieras. |
| CASE-DETAIL-002 | [caseDetail.test.ts](../../packages/api/src/caseDetail.test.ts), [CaseDetail.test.tsx](../../packages/web/src/CaseDetail.test.tsx) | API/UI; **Kört**. Saknat ID ger 404 och begripligt UI-besked. |
| CASE-DETAIL-003 | [caseDetail.test.ts](../../packages/api/src/caseDetail.test.ts), [CaseDetail.test.tsx](../../packages/web/src/CaseDetail.test.tsx) | API/UI; **Kört**. Databas-, nätverks-, server- och svarsfel hanteras. |
| CASE-STATUS-001 | [caseStatus.test.ts](../../packages/api/src/caseStatus.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. API testar statuskombinationerna; E2E sparar och återläser en statusändring. |
| CASE-STATUS-002 | [caseStatus.test.ts](../../packages/api/src/caseStatus.test.ts), [CaseDetail.test.tsx](../../packages/web/src/CaseDetail.test.tsx), [CaseStatusForm.test.tsx](../../packages/web/src/CaseStatusForm.test.tsx) | API/UI; **Kört**. Ogiltig status avvisas och tidigare status bevaras. |
| CASE-STATUS-003 | [caseStatus.test.ts](../../packages/api/src/caseStatus.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts), [CaseStatusForm.test.tsx](../../packages/web/src/CaseStatusForm.test.tsx) | API/SQLite/UI/E2E; **Kört**. Beständig uppdatering och fel-/omförsöksbeteende verifieras. |
| CASE-STATUS-004 | [caseStatus.test.ts](../../packages/api/src/caseStatus.test.ts), [CaseStatusForm.test.tsx](../../packages/web/src/CaseStatusForm.test.tsx) | API/UI; **Kört**. Saknat ärende ger 404 och begripligt fel. |
| CASE-NOTE-001 | [caseNote.test.ts](../../packages/api/src/caseNote.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. Ärende utan anteckning skapas, visas och återläses. |
| CASE-NOTE-002 | [caseNote.test.ts](../../packages/api/src/caseNote.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/E2E; **Kört**. Trimning och 2 000 teckens gräns verifieras. |
| CASE-NOTE-003 | [caseNote.test.ts](../../packages/api/src/caseNote.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts), [CaseDetail.test.tsx](../../packages/web/src/CaseDetail.test.tsx), [CaseNoteForm.test.tsx](../../packages/web/src/CaseNoteForm.test.tsx) | API/SQLite/UI/E2E; **Kört**. Redigering och omläsning verifieras; separata UI-tester behåller samtidighets-, fel- och omförsökskontroller. |
| CASE-NOTE-004 | [caseNote.test.ts](../../packages/api/src/caseNote.test.ts), [portal.spec.ts](../../e2e/portal.spec.ts) | API/SQLite/E2E; **Kört**. Tomning raderar anteckningen och omläsning ger tom editor. |
| CASE-NOTE-005 | [caseNote.test.ts](../../packages/api/src/caseNote.test.ts), [CaseNoteForm.test.tsx](../../packages/web/src/CaseNoteForm.test.tsx) | API/UI; **Kört**. Ogiltig längd avvisas utan att befintlig text ändras. |
| CASE-NOTE-006 | [caseNote.test.ts](../../packages/api/src/caseNote.test.ts), [CaseNoteForm.test.tsx](../../packages/web/src/CaseNoteForm.test.tsx) | API/UI; **Kört**. Saknat ärende ger 404 och begripligt fel. |
| STEP10-PARALLEL-001 | [worker-count.test.mjs](../../e2e/worker-count.test.mjs) | Konfiguration; **Kört**. Workerantalet är 80 % av tillgängliga processorer avrundat nedåt, minst en; ogiltiga antal avvisas. |
| STEP10-CI-001 | [ci.yml](../../.github/workflows/ci.yml) | CI-konfiguration; **Konfigurerat, ej fjärrkört**. Pull request-eventet kör unit/API-tester, Playwright och build. |
| UI-CONSISTENCY-001 | [portal.spec.ts](../../e2e/portal.spec.ts) | E2E; **Kört**. Etiketter och tillgängliga namn verifieras i skapa- och detaljformulär. |
| UI-CONSISTENCY-002 | [CaseForm.test.tsx](../../packages/web/src/CaseForm.test.tsx), [CaseList.test.tsx](../../packages/web/src/CaseList.test.tsx), [CaseDetail.test.tsx](../../packages/web/src/CaseDetail.test.tsx), [CaseStatusForm.test.tsx](../../packages/web/src/CaseStatusForm.test.tsx), [CaseNoteForm.test.tsx](../../packages/web/src/CaseNoteForm.test.tsx) | UI; **Kört**. Svenska felbesked exponeras som tillgängliga alerts. |
| UI-CONSISTENCY-003 | [portal.spec.ts](../../e2e/portal.spec.ts) | E2E; **Kört**. Status visas som läsbar text i listan och detaljen. |
| UI-CONSISTENCY-004 | Ingen ännu | **Öppet** i uppskjutet delsteg 9. Designvariablernas palett och återanvändning är inte verifierade. |
| UI-CONSISTENCY-005 | Ingen ännu | **Öppet** i uppskjutet delsteg 9. Gemensamma fält-/knappkomponenter är inte verifierade. |

## Selektiv flytt till Playwright

E2E ersätter mockbaserade komponenttester för skapande och omläsning, tomläge/listsortering, detaljvisning, statusuppdatering och anteckningens skapa/redigera/radera. API-/SQLite-tester behålls för exakta kontrakt, ogiltiga värden, beständighet efter återöppning, statusövergångar och fel i lagringslagret. UI-tester som isolerat kontrollerar API-fel, svarsfel, samtidiga svar och omförsök behålls där E2E inte ger samma kontroll.

## Begränsningar och återstående arbete

- E2E-sidomladdning återhämtar data från samma körande API-process; processomstart/persistence kontrolleras i API-/SQLite-testerna.
- E2E verifierar en faktisk statusövergång; API-testet täcker hela övergångsmatrisen.
- UI-CONSISTENCY-004/005 och manuell visuell granskning av kontrast, fokus och smala/breda vyer återstår i delsteg 9.
- Ingen kontroll har gjorts av drift, autentisering eller externa integrationer; de ingår inte i MVP:n.
