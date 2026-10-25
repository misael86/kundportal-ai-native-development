# TextInput

**Typ:** gemensam UI-komponent
**Storybook:** ja

## Krav — funktionella (K)

- **K1 — Inmatning:** användaren kan ange och ändra textvärdet.

## Krav — data och validering (D)

- **D1 — Obligatoriskt värde:** kan ta emot `required`-regeln från feature-specen.
- **D2 — Längdgräns:** kan ta emot en längdgräns från feature-specen.
- **D3 — Servervalidering:** klientens fältregler utger sig inte för att ersätta servervalidering.

## Krav — tillgänglighet (T)

- **T1 — Etikett:** synlig etikett är programmässigt kopplad till kontrollen.
- **T2 — Feltext:** feltext visas när fältet har ett fel.
- **T3 — Felkoppling:** feltext är kopplad till kontrollen med `aria-describedby`.
- **T4 — Ogiltigt tillstånd:** kontrollen exponerar programmatiskt att värdet är ogiltigt.

## Krav — felhantering (F)

- **F1 — Rätta värde:** användaren kan ändra fältvärdet efter valideringsfel.
- **F2 — Bevara övriga fält:** ändring av fältvärdet raderar inte övriga formulärvärden.
