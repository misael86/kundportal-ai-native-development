# IssueForm

**Typ:** ärendefeature-komponent
**Storybook:** valfritt; funktion verifieras främst med automatiserade tester

## Krav — funktionella (K)

- **K1 — Skapa:** formuläret kan skicka ett nytt ärende för sparning.
- **K2 — Startstatus:** nytt ärende får status Nytt.
- **K3 — Redigera:** formuläret visar sparade värden för redigering.
- **K4 — Uppdatera:** formuläret kan skicka ändringar av ett befintligt ärende för sparning.

## Krav — data och validering (D)

- **D1 — Rubrik krävs:** rubriken får inte vara tom efter trimning.
- **D2 — Rubrik maxlängd:** rubriken innehåller högst 120 tecken efter trimning.
- **D3 — Beskrivning krävs:** beskrivningen får inte vara tom efter trimning.
- **D4 — Beskrivning maxlängd:** beskrivningen innehåller högst 5 000 tecken efter trimning.
- **D5 — Kategori:** kategorin måste vara ett av de tillåtna värdena.
- **D6 — Prioritet:** prioriteten måste vara ett av de tillåtna värdena.
- **D7 — Status:** status måste vara ett av de tillåtna värdena.

## Krav — tillgänglighet (T)

- **T1 — Etiketter:** varje formulärfält har en synlig, programmässigt kopplad etikett.
- **T2 — Felkoppling:** varje fältfel är programmässigt kopplat till motsvarande fält.
- **T3 — Tangentbord:** formulärets fält och skicka-åtgärd kan användas med tangentbord.

## Krav — felhantering (F)

- **F1 — Sparfel:** server- eller nätverksfel visas med begripligt besked.
- **F2 — Bevara inmatning:** formulärvärden bevaras när sparning misslyckas.
- **F3 — Nytt försök:** användaren kan försöka spara igen efter ett fel.
- **F4 — Ingen falsk framgång:** misslyckad sparning visas inte som lyckad.
