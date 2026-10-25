# IssueDetail

**Typ:** ärendefeature-komponent
**Storybook:** valfritt; användarflödet verifieras med feature-tester

## Krav — funktionella (K)

- **K1 — Rubrik:** visar det valda ärendets sparade rubrik.
- **K2 — Beskrivning:** visar det valda ärendets sparade beskrivning.
- **K3 — Kategori:** visar det valda ärendets sparade kategori.
- **K4 — Prioritet:** visar det valda ärendets sparade prioritet.
- **K5 — Status:** visar det valda ärendets aktuella status.
- **K6 — Skapelsetid:** visar det valda ärendets skapelsetid.
- **K7 — Ändra status:** användaren kan välja en annan tillåten status.
- **K8 — Spara status:** användaren kan spara vald status.

## Krav — data och validering (D)

- **D1 — Bevara skapelsetid:** statusändring ändrar inte ärendets skapelsetid.

## Krav — tillgänglighet (T)

- **T1 — Bekräftelsetext:** lyckad statusändring bekräftas med synlig text.
- **T2 — Tillgängligt bekräftelsemeddelande:** bekräftelsen exponeras som ett statusmeddelande för hjälpmedel.
- **T3 — Statusvalets etikett:** statuskontrollen har en synlig, programmässigt kopplad etikett.

## Krav — felhantering (F)

- **F1 — Ogiltigt ID:** ogiltigt ärende-ID ger ett begripligt fel.
- **F2 — Saknat ärende:** ärende som inte finns ger ett begripligt fel.
- **F3 — Statusfel:** misslyckad statusändring ger ett begripligt fel.
- **F4 — Ingen falsk framgång:** misslyckad statusändring ger inget framgångsbesked.
