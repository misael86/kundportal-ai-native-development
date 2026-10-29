# Manuell tillgänglighetsverifiering

Spåra manuella delar av krav märkta `Manuell` eller `Båda` i komponenternas `.spec.md`. Identifiera varje post med sökväg till specfil och krav-ID, till exempel `src/shared/ui/button/button.spec.md#T4`. Kör inte in en kontroll som godkänd utan att den faktiskt har utförts.

## Resultat

Använd `Godkänd` eller `Underkänd` efter utförd kontroll. Före granskning lämnas resultat, datum och PR/commit tomma; en ofullständig post är inte evidens och ska inte godkännas av CI. Uppdatera stegen med den faktiska kontrollen och plattformen när granskningen utförs.

| Specfil#krav-ID | Kontrollsteg | Resultat | Datum | PR/commit |
|---|---|---|---|---|
| `src/shared/ui/button/button.spec.md#T4` | Kontrollera synlig fokusindikator med tangentbord i normal- och fokuserat läge. |  |  |  |
| `src/app/theme-preference-control.spec.md#T3` | Kontrollera synlig fokusindikator på temaväljaren i ljust och mörkt tema. |  |  |  |
| `src/shared/ui/status-badge/status-badge.spec.md#T2` | Kontrollera textkontrast för alla statusvarianter mot deras faktiska bakgrunder. |  |  |  |
| `src/shared/ui/notification/notification.spec.md#T3` | Navigera till avfärdningsknappen med tangentbord och kontrollera synligt fokus och begripligt namn. |  |  |  |
| `src/features/issues/components/issue-form/issue-form.spec.md#T3` | Genomför skapa- och redigeringsflöde enbart med tangentbord; kontrollera fokusordning och aktivering. |  |  |  |
| `src/app/page.spec.md#T2` | Kontrollera hela startsidan vid 320 CSS-pixlars bredd utan horisontell sidscroll. |  |  |  |
| `src/app/issues/[id]/page.spec.md#T2` | Kontrollera detaljsidan vid 320 CSS-pixlars bredd utan horisontell sidscroll. |  |  |  |
