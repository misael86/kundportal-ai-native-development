---
description: "Använd när du skapar, ändrar eller granskar komponenters/featurers *.spec.md. Täcker atomära krav, ID:n, tillgänglighet, validering och CI-testning."
applyTo: "**/*.spec.md"
---

# Komponentspecifikationer

- Skriv kort och konkret på svenska. Beskriv observerbara krav, inte förtida implementation.
- En `.spec.md` gäller exakt en komponent/sida och ligger bredvid koden.
- Använd bara fiktiva data. Nämn lokal demo, SQLite och avsaknad av inloggning/publicering endast när det påverkar komponentbeteendet.
- Ett krav = ett verifierbart kriterium. Dela upp flera fält, beteenden, tillstånd eller fel. Ett test får täcka flera krav.
- Gruppera i ordning: funktion (`K`), data/validering (`D`), tillgänglighet (`T`), fel (`F`). Utelämna tomma grupper.
- Numrera från 1 per komponent och kravtyp: `K1`, `K2`, `D1`, `T1`, `F1`. ID får återanvändas mellan komponenter, inte inom samma komponent/typ. Ändra inte etablerat ID utan att uppdatera tester.
- Ge varje krav kort namn och observerbara acceptanskriterier. Hänvisa till gemensamma krav i stället för att kopiera dem.
- Ange relevanta obligatoriska fält, tillåtna värden och exakta gränser. Klient- och server/databasvalidering ska överensstämma; klientvalidering ersätter inte servervalidering.
- Beskriv relevanta WCAG 2.2 AA-egenskaper: etiketter, tangentbord, synlig fokus, kontrast, felkoppling, touchmål och hjälpmedelsstatus.
- Felkrav anger utlösare, begripligt meddelande och bevarat tillstånd. Skilj fel från tomt/lyckat resultat.
- Täck relevanta lyckade flöden, tomt/laddande läge, gränser och fel utan att slå ihop flera kriterier.
- Lägg inte in testspårningslistor, testnamn eller påståenden om genomförda tester. Tester hänvisar till lokala krav-ID:n.
- CI läser ID:n per komponent/typ, upptäcker dubbletter och fallerar om något krav saknar test för komponenten.
- Lägg bara till Storybook-krav när Storybook används; det ersätter inte automatiserade tester.
