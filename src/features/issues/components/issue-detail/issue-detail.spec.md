# IssueDetail

**Typ:** ärendefeature-komponent
**Storybook:** ja; exempel visar detaljvy, statusändring och fel.

## Krav — funktionella (K)

- **K1 — Rubrik:** visar det valda ärendets sparade rubrik. **Verifiering:** Automatiserad.
- **K2 — Beskrivning:** visar det valda ärendets sparade beskrivning. **Verifiering:** Automatiserad.
- **K3 — Kategori:** visar det valda ärendets sparade kategori. **Verifiering:** Automatiserad.
- **K4 — Prioritet:** visar det valda ärendets sparade prioritet. **Verifiering:** Automatiserad.
- **K5 — Status:** visar det valda ärendets aktuella status. **Verifiering:** Automatiserad.
- **K6 — Skapelsetid:** visar det valda ärendets skapelsetid. **Verifiering:** Automatiserad.
- **K7 — Ändra status:** användaren kan välja en annan tillåten status. **Verifiering:** Automatiserad.
- **K8 — Spara status:** användaren kan spara vald status. **Verifiering:** Automatiserad.

## Krav — data och validering (D)

- **D1 — Bevara skapelsetid:** statusändring ändrar inte ärendets skapelsetid. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Bekräftelsetext:** lyckad statusändring bekräftas med synlig text. **Verifiering:** Automatiserad.
- **T2 — Tillgängligt bekräftelsemeddelande:** bekräftelsen exponeras som ett statusmeddelande för hjälpmedel. **Verifiering:** Automatiserad.
- **T3 — Statusvalets etikett:** statuskontrollen har en synlig, programmässigt kopplad etikett. **Verifiering:** Automatiserad.

## Krav — felhantering (F)

- **F1 — Ogiltigt ID:** ogiltigt ärende-ID ger ett begripligt fel. **Verifiering:** Automatiserad.
- **F2 — Saknat ärende:** ärende som inte finns ger ett begripligt fel. **Verifiering:** Automatiserad.
- **F3 — Statusfel:** misslyckad statusändring ger ett begripligt fel. **Verifiering:** Automatiserad.
- **F4 — Ingen falsk framgång:** misslyckad statusändring ger inget framgångsbesked. **Verifiering:** Automatiserad.
