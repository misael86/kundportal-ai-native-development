# Textarea

**Typ:** gemensam UI-komponent
**Storybook:** ja

## Krav — funktionella (K)

- **K1 — Inmatning:** användaren kan ange och ändra flerradig text. **Verifiering:** Automatiserad.

## Krav — data och validering (D)

- **D1 — Obligatoriskt värde:** kan ta emot `required`-regeln från feature-specen. **Verifiering:** Automatiserad.
- **D2 — Längdgräns:** kan ta emot en längdgräns från feature-specen. **Verifiering:** Automatiserad.
- **D3 — Servervalidering:** klientens fältregler utger sig inte för att ersätta servervalidering. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Etikett:** synlig etikett är programmässigt kopplad till kontrollen. **Verifiering:** Automatiserad.
- **T2 — Feltext:** feltext visas när fältet har ett fel. **Verifiering:** Automatiserad.
- **T3 — Felkoppling:** feltext är kopplad till kontrollen med `aria-describedby`. **Verifiering:** Automatiserad.
- **T4 — Ogiltigt tillstånd:** kontrollen exponerar programmatiskt att värdet är ogiltigt. **Verifiering:** Automatiserad.

## Krav — felhantering (F)

- **F1 — Rätta värde:** användaren kan ändra fältvärdet efter valideringsfel. **Verifiering:** Automatiserad.
- **F2 — Bevara övriga fält:** ändring av fältvärdet raderar inte övriga formulärvärden. **Verifiering:** Automatiserad.
