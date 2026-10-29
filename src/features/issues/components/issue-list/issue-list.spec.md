# IssueList

**Typ:** ärendefeature-komponent
**Storybook:** ja; exempel visar innehåll, laddning, tomt läge, sökning utan träff och fel.

## Krav — funktionella (K)

- **K1 — Visa lista:** visar hämtade ärenden som en lista. **Verifiering:** Automatiserad.
- **K2 — Sortering:** sorterar `created_at` fallande och ID fallande vid lika skapelsetid. **Verifiering:** Automatiserad.
- **K3 — Tom databas:** tom databas visar ett besked om att det inte finns några ärenden. **Verifiering:** Automatiserad.
- **K4 — Tom sökning:** aktiv sökning utan träffar visar ett besked om att inga ärenden matchar. **Verifiering:** Automatiserad.
- **K5 — Sök rubrik:** sökning kan matcha del av ärendets rubrik. **Verifiering:** Automatiserad.
- **K6 — Sök beskrivning:** sökning kan matcha del av ärendets beskrivning. **Verifiering:** Automatiserad.
- **K7 — Sök kategori:** sökning kan matcha del av ärendets kategori. **Verifiering:** Automatiserad.
- **K8 — Statusfilter:** statusfilter visar endast ärenden med vald status; aktiv sökning kombineras med filtret. **Verifiering:** Automatiserad.
- **K9 — Laddning:** datahämtning visar skelettkort. **Verifiering:** Automatiserad.
- **K10 — Dekorativt skelett:** skelettkortens dekorativa innehåll döljs för hjälpmedel. **Verifiering:** Automatiserad.
- **K11 — Trimma sökning:** inledande och avslutande blanksteg tas bort före sökning; tom sökning ignoreras. **Verifiering:** Automatiserad.
- **K12 — Skiftlägesokänslig sökning:** delsträngsmatchning är skiftlägesokänslig, även för svenska tecken. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Sökfältets etikett:** sökfältet har en synlig, programmässigt kopplad etikett. **Verifiering:** Automatiserad.
- **T2 — Filteretikett:** statusfiltret har en synlig, programmässigt kopplad etikett. **Verifiering:** Automatiserad.
- **T3 — Tangentbord:** samtliga sök- och filterkontroller kan användas med tangentbord. **Verifiering:** Automatiserad.
- **T4 — Navigering med tangentbord:** varje ärendelänk kan fokuseras och aktiveras med tangentbord. **Verifiering:** Automatiserad.
- **T5 — Touchmål:** sökfältets aktiveringsyta är minst 44 × 44 CSS-pixlar. **Verifiering:** Automatiserad.
- **T6 — Filtermål:** statusfiltrets aktiveringsyta är minst 44 × 44 CSS-pixlar. **Verifiering:** Automatiserad.
- **T7 — Länkmål:** varje ärendelänks aktiveringsyta är minst 44 × 44 CSS-pixlar. **Verifiering:** Automatiserad.
- **T8 — Laddningsstatus:** laddning exponeras som ett statusmeddelande. **Verifiering:** Automatiserad.
- **T9 — Upptagen listregion:** listregionen exponeras som upptagen under datahämtning. **Verifiering:** Automatiserad.
- **T10 — Reducerad rörelse:** skelettanimation stängs av eller reduceras vid `prefers-reduced-motion: reduce`. **Verifiering:** Automatiserad.
- **T11 — Textalternativ:** tomlägen förklaras med text, inte enbart med grafik eller färg. **Verifiering:** Automatiserad.

## Krav — felhantering (F)

- **F1 — Felbesked:** API- eller databasfel visas med begripligt besked. **Verifiering:** Automatiserad.
- **F2 — Fel skiljt från tom databas:** läsfel får inte framstå som tom databas. **Verifiering:** Automatiserad.
- **F3 — Fel skiljt från sökträffar:** läsfel får inte framstå som sökning utan träffar. **Verifiering:** Automatiserad.
- **F4 — Bevara sökning:** läsfel rensar inte söktext. **Verifiering:** Automatiserad.
- **F5 — Bevara filter:** läsfel återställer inte statusfiltret. **Verifiering:** Automatiserad.

## Tillstånd och innehåll

- **Laddar:** visa ett diskret skelett som ungefär motsvarar ärendekorten och texten ”Hämtar ärenden…”. Dölj dekorationen för skärmläsare; exponera status en gång, inte ett meddelande per skelettkort.
- **Tom databas:** visa ”Inga ärenden ännu” och förklara hur användaren skapar det första ärendet.
- **Inga sökträffar:** visa ”Inga ärenden matchar sökningen” och instruera att ändra söktext eller statusfilter.
- **Fel:** visa inte tomt läge samtidigt som läsfel; behåll sök/filtervärden så användaren kan försöka igen.
