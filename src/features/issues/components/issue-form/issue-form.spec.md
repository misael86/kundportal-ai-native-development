# IssueForm

**Typ:** ärendefeature-komponent
**Storybook:** ja; exempel visar skapa, redigera, valideringsfel och sparfel.

## Krav — funktionella (K)

- **K1 — Skapa:** formuläret kan skicka ett nytt ärende för sparning. **Verifiering:** Automatiserad.
- **K2 — Startstatus:** nytt ärende får status Nytt. **Verifiering:** Automatiserad.
- **K3 — Redigera:** formuläret visar sparade rubrik-, beskrivnings-, kategori- och prioritetsvärden för redigering. Status ändras separat på detaljsidan. **Verifiering:** Automatiserad.
- **K4 — Uppdatera:** formuläret kan skicka ändringar av rubrik, beskrivning, kategori och prioritet på ett befintligt ärende för sparning. Status ändras separat på detaljsidan. **Verifiering:** Automatiserad.

## Krav — data och validering (D)

- **D1 — Rubrik krävs:** rubriken får inte vara tom efter trimning. **Verifiering:** Automatiserad.
- **D2 — Rubrik maxlängd:** rubriken innehåller högst 120 tecken efter trimning. **Verifiering:** Automatiserad.
- **D3 — Beskrivning krävs:** beskrivningen får inte vara tom efter trimning. **Verifiering:** Automatiserad.
- **D4 — Beskrivning maxlängd:** beskrivningen innehåller högst 5 000 tecken efter trimning. **Verifiering:** Automatiserad.
- **D5 — Kategori:** kategorin är Konto, Betalning, Leverans, Retur/reklamation eller Övrigt. **Verifiering:** Automatiserad.
- **D6 — Prioritet:** prioriteten är Låg, Normal, Hög eller Akut. **Verifiering:** Automatiserad.
- **D7 — Status:** status måste vara ett av de tillåtna värdena. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Etiketter:** varje formulärfält har en synlig, programmässigt kopplad etikett. **Verifiering:** Automatiserad.
- **T2 — Felkoppling:** varje fältfel är programmässigt kopplat till motsvarande fält. **Verifiering:** Automatiserad.
- **T3 — Tangentbord:** formulärets fält och skicka-åtgärd kan användas med tangentbord. **Verifiering:** Båda.

## Krav — felhantering (F)

- **F1 — Sparfel:** server- eller nätverksfel visas med begripligt besked. **Verifiering:** Automatiserad.
- **F2 — Bevara inmatning:** formulärvärden bevaras när sparning misslyckas. **Verifiering:** Automatiserad.
- **F3 — Nytt försök:** användaren kan försöka spara igen efter ett fel. **Verifiering:** Automatiserad.
- **F4 — Ingen falsk framgång:** misslyckad sparning visas inte som lyckad. **Verifiering:** Automatiserad.
