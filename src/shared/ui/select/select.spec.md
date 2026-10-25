# Select

**Typ:** gemensam UI-komponent
**Storybook:** ja

## Krav — funktionella (K)

- **K1 — Val:** användaren kan välja ett värde ur de alternativ som feature-specen skickar in.

## Krav — data och validering (D)

- **D1 — Tillåtna alternativ:** endast definierade alternativ visas.
- **D2 — Servervalidering:** validering av Select i gränssnittet utger sig inte för att ersätta servervalidering.

## Krav — tillgänglighet (T)

- **T1 — Etikett:** synlig etikett är programmässigt kopplad till kontrollen.
- **T2 — Feltext:** feltext visas när kontrollen har ett fel.
- **T3 — Felkoppling:** feltext är kopplad till kontrollen med `aria-describedby`.
- **T4 — Ogiltigt tillstånd:** kontrollen exponerar programmatiskt att valt värde är ogiltigt.

## Krav — felhantering (F)

- **F1 — Rätta val:** användaren kan välja ett giltigt alternativ efter ett fel.
- **F2 — Bevara övriga fält:** ändring av valt alternativ raderar inte övriga formulärvärden.
