# IssueList

**Typ:** ärendefeature-komponent
**Storybook:** valfritt; tillstånd verifieras främst med feature-tester

## Krav — funktionella (K)

- **K1 — Visa lista:** visar hämtade ärenden som en lista.
- **K2 — Sortering:** sorterar ärenden enligt beslutad sorteringsordning.
- **K3 — Tom databas:** tom databas visar ett besked om att det inte finns några ärenden.
- **K4 — Tom sökning:** sökning utan träffar visar ett besked om att inga ärenden matchar.
- **K5 — Sök rubrik:** sökning kan matcha ärendets rubrik.
- **K6 — Sök beskrivning:** sökning kan matcha ärendets beskrivning.
- **K7 — Sök kategori:** sökning kan matcha ärendets kategori.
- **K8 — Statusfilter:** statusfilter visar endast ärenden med vald status.
- **K9 — Laddning:** datahämtning visar skelettkort.
- **K10 — Dekorativt skelett:** skelettkortens dekorativa innehåll döljs för hjälpmedel.

## Krav — tillgänglighet (T)

- **T1 — Sökfältets etikett:** sökfältet har en synlig, programmässigt kopplad etikett.
- **T2 — Filteretikett:** statusfiltret har en synlig, programmässigt kopplad etikett.
- **T3 — Tangentbord:** samtliga sök- och filterkontroller kan användas med tangentbord.
- **T4 — Navigering med tangentbord:** varje ärendelänk kan fokuseras och aktiveras med tangentbord.
- **T5 — Touchmål:** sökfältets aktiveringsyta är minst 44 × 44 CSS-pixlar.
- **T6 — Filtermål:** statusfiltrets aktiveringsyta är minst 44 × 44 CSS-pixlar.
- **T7 — Länkmål:** varje ärendelänks aktiveringsyta är minst 44 × 44 CSS-pixlar.
- **T8 — Laddningsstatus:** laddning exponeras som ett statusmeddelande.
- **T9 — Upptagen listregion:** listregionen exponeras som upptagen under datahämtning.
- **T10 — Reducerad rörelse:** skelettanimation stängs av eller reduceras vid `prefers-reduced-motion: reduce`.
- **T11 — Textalternativ:** tomlägen förklaras med text, inte enbart med grafik eller färg.

## Krav — felhantering (F)

- **F1 — Felbesked:** API- eller databasfel visas med begripligt besked.
- **F2 — Fel skiljt från tom databas:** läsfel får inte framstå som tom databas.
- **F3 — Fel skiljt från sökträffar:** läsfel får inte framstå som sökning utan träffar.
- **F4 — Bevara sökning:** läsfel rensar inte söktext.
- **F5 — Bevara filter:** läsfel återställer inte statusfiltret.

## Tillstånd och innehåll

- **Laddar:** visa ett diskret skelett som ungefär motsvarar ärendekorten och texten ”Hämtar ärenden…”. Dölj dekorationen för skärmläsare; exponera status en gång, inte ett meddelande per skelettkort.
- **Tom databas:** visa ”Inga ärenden ännu” och förklara hur användaren skapar det första ärendet.
- **Inga sökträffar:** visa ”Inga ärenden matchar sökningen” och instruera att ändra söktext eller statusfilter.
- **Fel:** visa inte tomt läge samtidigt som läsfel; behåll sök/filtervärden så användaren kan försöka igen.
