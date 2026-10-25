---
description: "Use when creating or editing automated tests for components, features, APIs, SQLite, or end-to-end flows. Covers requirement IDs, TDD, persistence, seed data, errors, and coverage."
applyTo: "**/*.{test,spec}.{ts,tsx}"
---

# Testinstruktioner

- Skriv eller uppdatera test innan motsvarande implementation (TDD).
- Placera komponenttester tillsammans med komponenten; feature-, databas- och end-to-end-tester i en tydlig feature- eller testmapp.
- Referera till varje kravs komponentlokala ID i testnamn eller metadata. Testfilens sökväg ska göra komponent/feature identifierbar för CI.
- Ett test kan verifiera flera krav. Varje krav från `.spec.md` måste finnas i minst ett automatiserat test.
- Testa beteenden och observerbara resultat, inte implementationens interna detaljer.
- Täck relevanta happy paths, felvägar, tomma/laddande lägen, tillåtna värden och gränser (precis på och utanför gränsen).
- Testa felmeddelanden och att misslyckanden inte ger falsk framgång eller raderar användarens inmatning.
- Databastester ska använda en separat temporär SQLite-databas per test eller testsvit och städa upp den efteråt.
- Verifiera SQLite-skapande, läsning, uppdatering, constraints och beständighet efter stängd/återöppnad anslutning.
- Verifiera att seedning fyller tom databas, är idempotent och inte skriver över ändrade data. Testa även tom databas separat.
- End-to-end-tester ska täcka centrala lärarflöden, inklusive refresh och beständighet efter omstart där det är möjligt.
- Tillgänglighetstester ska kontrollera relevanta namn, etiketter, tangentbord, fokus, fel/statusregioner och reducerad rörelse. Komplettera med manuell granskning där automation inte räcker.
- Sikta på 100 % statements, branches, functions och lines för testbar produktionskod. Dokumentera och motivera varje godkänt undantag; sänk inte gränsen tyst.
- Följ projektets täckningskommandon när de finns dokumenterade i `README.md`; hitta inte på eller anta scriptnamn.
