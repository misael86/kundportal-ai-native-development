# Ärendeöversikt

**Route:** `/`
**Sida:** startsida med ärendelista och formulär för att skapa ärende.

## Krav — funktionella (K)

- **K1 — Öppna startsida:** `/` visar ärendeöversikten.
- **K2 — Skapa ärende:** sidan ger tillgång till formuläret för att skapa ärende enligt [IssueForm-specifikationen](../features/issues/components/issue-form/issue-form.spec.md).
- **K3 — Visa ärenden:** sidan ger tillgång till listan enligt [IssueList-specifikationen](../features/issues/components/issue-list/issue-list.spec.md).
- **K4 — Visa nyskapat ärende:** efter lyckad skapning visas det nya ärendet i listan utan att användaren behöver ladda om sidan.
- **K5 — Öppna ärendedetalj:** val av ett ärende navigerar till dess detaljsida.

## Krav — tillgänglighet (T)

- **T1 — Sidrubrik:** sidan har en tydlig huvudrubrik som beskriver ärendeöversikten.
- **T2 — Mobil användning:** innehåll och funktioner kan användas vid 320 CSS-pixlars bredd utan horisontell sidscroll.

## Krav — felhantering (F)

- **F1 — Skapandefel:** fel vid skapande visas begripligt; formulärvärden bevaras och listan visar inte ärendet som skapat.
