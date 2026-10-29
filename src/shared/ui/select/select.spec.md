# Select

**Typ:** gemensam UI-komponent
**Storybook:** ja

## Krav — funktionella (K)

- **K1 — Val:** användaren kan välja ett värde ur de alternativ som feature-specen skickar in. **Verifiering:** Automatiserad.

## Krav — data och validering (D)

- **D1 — Tillåtna alternativ:** endast definierade alternativ visas. **Verifiering:** Automatiserad.
- **D2 — Servervalidering:** validering av Select i gränssnittet utger sig inte för att ersätta servervalidering. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Etikett:** synlig etikett är programmässigt kopplad till kontrollen. **Verifiering:** Automatiserad.
- **T2 — Feltext:** feltext visas när kontrollen har ett fel. **Verifiering:** Automatiserad.
- **T3 — Felkoppling:** feltext är kopplad till kontrollen med `aria-describedby`. **Verifiering:** Automatiserad.
- **T4 — Ogiltigt tillstånd:** kontrollen exponerar programmatiskt att valt värde är ogiltigt. **Verifiering:** Automatiserad.

## Krav — felhantering (F)

- **F1 — Rätta val:** användaren kan välja ett giltigt alternativ efter ett fel. **Verifiering:** Automatiserad.
- **F2 — Bevara övriga fält:** ändring av valt alternativ raderar inte övriga formulärvärden. **Verifiering:** Automatiserad.
