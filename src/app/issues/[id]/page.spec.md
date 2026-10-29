# Ärendedetalj

**Route:** `/issues/[id]`
**Sida:** visar valt ärende och ger tillgång till redigering och statusändring.

## Krav — funktionella (K)

- **K1 — Öppna valt ärende:** giltigt ID visar motsvarande ärendedetaljer enligt [IssueDetail-specifikationen](../../../features/issues/components/issue-detail/issue-detail.spec.md). **Verifiering:** Automatiserad.
- **K2 — Spara statusändring:** sidan låter användaren spara statusändring för valt ärende. **Verifiering:** Automatiserad.
- **K3 — Tillbaka till listan:** sidan har navigerbar länk tillbaka till ärendeöversikten. **Verifiering:** Automatiserad.

## Krav — tillgänglighet (T)

- **T1 — Sidrubrik:** sidan har en tydlig huvudrubrik som beskriver detalj- eller redigeringsvyn. **Verifiering:** Automatiserad.
- **T2 — Responsiv layout:** innehåll och kontroller fungerar vid 320 CSS-pixlars bredd utan horisontell sidscroll. **Verifiering:** Båda.

## Krav — felhantering (F)

- **F1 — Ogiltigt ID:** ogiltigt ärende-ID visar begripligt fel. **Verifiering:** Automatiserad.
- **F2 — Ärende saknas:** ID utan motsvarande ärende visar begripligt besked om att det inte hittades. **Verifiering:** Automatiserad.
- **F3 — Fel vid statusändring:** misslyckad statusändring presenteras inte som lyckad. **Verifiering:** Automatiserad.
