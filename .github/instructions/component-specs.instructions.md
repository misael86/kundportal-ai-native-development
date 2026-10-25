---
description: "Use when creating, editing, or reviewing component or feature *.spec.md requirement specifications. Covers atomic criteria, scoped IDs, accessibility, validation, and CI test verification."
applyTo: "**/*.spec.md"
---

# Komponentspecifikationer

- Skriv på svenska, kort och konkret. Beskriv krav och observerbart beteende, inte implementation i förtid.
- Projektet är en lokal Next.js/TypeScript-demo med SQLite, utan inloggning eller publicering. Använd bara fiktiva data; ta endast med detta i krav när det berör komponentens beteende.
- En `.spec.md` hör till exakt en komponent eller sida och ligger bredvid dess kod i komponentmappen eller Next.js-route-mappen.
- Håll varje krav till ett verifierbart kriterium. Dela upp krav som kombinerar flera fält, beteenden, tillstånd eller fel.
- Ett test får verifiera ett eller flera krav.
- Gruppera krav i denna ordning: funktionella (`K`), data/validering (`D`), tillgänglighet (`T`), felhantering (`F`). Utelämna tomma grupper.
- Numrera från 1 separat per kravtyp i varje komponent. Exempel: `K1`, `K2`, `D1`, `T1`, `F1`.
- ID:n får återanvändas i andra komponenter, men får inte dupliceras inom samma komponent och typ. Ändra inte ett etablerat ID utan att uppdatera tillhörande tester.
- Ge varje krav ett kort namn och tydliga acceptanskriterier som går att observera och testa.
- Återanvänd relevanta gemensamma krav genom referenser i stället för att kopiera samma kravtext mellan komponenter.
- Data-/valideringskrav anger relevanta obligatoriska fält, tillåtna värden och exakta gränser. Håll klientvalidering och databas/serverregler konsekventa; klienten ersätter inte servervalidering.
- Tillgänglighetskrav beskriver relevanta WCAG 2.2 AA-egenskaper, till exempel etiketter, tangentbord, synlig fokus, kontrast, felkoppling, touchmål och hjälpmedelsstatus.
- Felkrav anger utlösande fel, begripligt användarmeddelande och vilket tillstånd som ska bevaras. Skilj fel från tomt eller lyckat resultat.
- Specificera relevanta happy paths, tomma/laddande lägen, gränsvärden och felutfall, utan att stapla flera acceptanskriterier i samma krav.
- Lägg inte testspårningslistor, testnamn eller påståenden om genomförda tester i `.spec.md`. Testerna refererar till komponentens krav-ID:n.
- CI ska läsa krav-ID per komponent och kravtyp, upptäcka dubbletter och fallera om något krav saknar automatiserat test för komponenten.
- Lägg bara till Storybook-krav när komponenten ska dokumenteras där; Storybook ersätter inte automatiserade tester.
