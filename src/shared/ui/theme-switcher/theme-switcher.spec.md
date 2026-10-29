# ThemeSwitcher

**Typ:** gemensam UI-komponent
**Användning:** låter användaren följa systemets tema eller välja ljust/mörkt tema.
**Storybook:** ja

## Krav — funktionella (K)

- **K1 — Systemtema:** utan manuellt val följer gränssnittet operativsystemets färgschema. **Verifiering:** Automatiserad.
- **K2 — Manuellt val:** användaren kan välja systemets inställning, ljust eller mörkt tema. **Verifiering:** Automatiserad.
- **K3 — Sparat val:** ett manuellt val sparas i en cookie och används efter omladdning. **Verifiering:** Automatiserad.

## Krav — data och validering (D)

- **D1 — Tillåtna värden:** endast `system`, `light` och `dark` används som temapreferens. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Etikett:** temaväljaren har en synlig, programmässigt kopplad etikett. **Verifiering:** Automatiserad.
- **T2 — Tangentbord:** temaväljaren kan användas med tangentbord. **Verifiering:** Automatiserad.
- **T3 — Synligt fokus:** tangentbordsfokus visas tydligt i båda temana. **Verifiering:** Båda.
- **T4 — Sparfel:** fel vid sparande meddelas hjälpmedel. **Verifiering:** Automatiserad.

## Krav — felhantering (F)

- **F1 — Bevarat val:** om cookie inte kan sparas visas ett begripligt fel och det aktiva valet ändras inte. **Verifiering:** Automatiserad.
