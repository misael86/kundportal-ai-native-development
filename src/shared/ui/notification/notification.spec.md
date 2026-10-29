# Notification

**Typ:** gemensam UI-komponent
**Användning:** bekräftelser och felmeddelanden efter åtgärder, till exempel när ett ärende har skapats eller ändrats.
**Storybook:** ja

## Krav — funktionella (K)

- **K1 — Meddelandetext:** visar den text som skickas in av anroparen. **Verifiering:** Automatiserad.
- **K2 — Variant:** stödjer framgångs- och felmeddelanden med visuellt särskiljbara varianter. **Verifiering:** Automatiserad.
- **K3 — Avfärda:** användaren kan stänga en notifiering utan att ändra det sparade ärendet. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Framgångsmeddelande:** framgång meddelas med en statusregion som annonseras artigt av hjälpmedel. **Verifiering:** Automatiserad.
- **T2 — Felmeddelande:** fel meddelas med en alertregion som hjälpmedel annonserar direkt. **Verifiering:** Automatiserad.
- **T3 — Avfärdningsknapp:** stängningskontrollen har tillgängligt namn, synlig fokusmarkering och fungerar med tangentbord. **Verifiering:** Båda.
- **T4 — Text och ikon:** betydelsen går att förstå utan färg; ikon förstärker texten och är dekorativ för hjälpmedel. **Verifiering:** Automatiserad.

## Krav — felhantering (F)

- **F1 — Ingen falsk bekräftelse:** misslyckad åtgärd visas inte som framgångsnotifiering. **Verifiering:** Automatiserad.

## Beteende

- Notifieringen ligger kvar tills användaren stänger den; stängning påverkar inte sparad data.
- Anroparen ansvarar för meddelandets innehåll och visar framgång först efter bekräftad serverrespons.
