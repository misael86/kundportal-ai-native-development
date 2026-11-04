# MVP-featuretickets

Varje ticket är en levererbar vertikal feature. Krav-ID:n är stabila och ska finnas i testnamn eller testbeskrivningar. **Varje krav-ID ska täckas av minst ett automatiserat test.** Ett test får täcka flera krav; en feature kan ha flera tester.

Ticketen är klar när acceptanskriterierna är uppfyllda, kopplade tester finns och passerar, relevanta fel/gränsfall hanteras och dokumentationen är uppdaterad. Faktiska körresultat dokumenteras i verifieringsplanen.

| Ticket | Feature | Beroende | Specifikation |
|---|---|---|---|
| CASE-CREATE | Skapa ärende | Projektskelett | [case-create.md](./case-create.md) |
| CASE-LIST | Lista ärenden | Projektskelett | [case-list.md](./case-list.md) |
| CASE-DETAIL | Visa ärendedetalj | CASE-CREATE | [case-detail.md](./case-detail.md) |
| CASE-STATUS | Ändra status | CASE-DETAIL | [case-status.md](./case-status.md) |
| CASE-NOTE | Hantera intern anteckning | CASE-DETAIL | [case-note.md](./case-note.md) |
| UI-CONSISTENCY | Gemensam UI-stil och felbesked | Projektskelett | [ui-consistency.md](./ui-consistency.md) |

Test-ID:n i specifikationerna ska finnas i testnamn eller beskrivning. Krav som saknar ett existerande och godkänt test innebär att ticketen inte är klar. Aktuell täckning och eventuellt öppna krav finns i verifieringsplanen.

## End-to-end-verifiering

Playwright-flöden i [e2e/portal.spec.ts](../../e2e/portal.spec.ts) kör den verkliga webappen, API:t och en separat SQLite-testdatabas. Återanvändbara selectors och sidåtgärder finns i [CasePortalPage.ts](../../e2e/pages/CasePortalPage.ts). Kravmatris och faktiska resultat finns i [verifieringsplanen](../examination/verification-plan.md). Kör med `npm run test:e2e`; se projektets [README](../../README.md) för första installation av Chromium.
