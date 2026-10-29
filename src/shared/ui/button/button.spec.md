# Button

**Typ:** gemensam UI-komponent
**Storybook:** ja

## Krav — funktionella (K)

- **K1 — Åtgärd:** knappen utför den angivna åtgärden vid aktivering. **Verifiering:** Automatiserad.
- **K2 — Aktivering en gång:** en enskild aktivering utför inte åtgärden mer än en gång. **Verifiering:** Automatiserad.
- **K3 — Variant:** primär och sekundär variant behåller knappens semantik. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Inbyggd knapp:** kontrollen exponeras som knapp. **Verifiering:** Automatiserad.
- **T2 — Tillgängligt namn:** knappen har ett tillgängligt namn. **Verifiering:** Automatiserad.
- **T3 — Tangentbordsaktivering:** Enter och mellanslag aktiverar knappen. **Verifiering:** Automatiserad.
- **T4 — Synligt fokus:** tangentbordsfokus visas tydligt. **Verifiering:** Båda.
- **T5 — Touchmål:** klickytan är minst 44 × 44 CSS-pixlar. **Verifiering:** Automatiserad.
- **T6 — Inaktiv knapp:** inaktiv knapp exponerar disabled-tillstånd. **Verifiering:** Automatiserad.
- **T7 — Inaktiv aktivering:** inaktiv knapp kan inte aktiveras. **Verifiering:** Automatiserad.
