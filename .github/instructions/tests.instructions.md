---
description: "Använd när du skapar eller ändrar automatiserade tester för komponenter, features, API:er, SQLite eller end-to-end-flöden. Täcker krav-ID, TDD, beständighet, seedning, fel och täckning."
applyTo: "**/*.{test,spec}.{ts,tsx}"
---

# Testinstruktioner

- Skriv/uppdatera test före implementation (TDD).
- Lägg komponenttester bredvid komponenten. Lägg feature-, databas- och E2E-tester i tydlig feature-/testmapp.
- Ange komponentens krav-ID i testnamn eller metadata. Testsökvägen ska identifiera komponent/feature för CI.
- Varje `.spec.md`-krav ska förekomma i minst ett automatiserat test; ett test får täcka flera krav.
- Testa observerbart beteende, inte implementationens detaljer. Varje test ska kunna fallera vid felaktigt beteende.
- Täck relevanta lyckade flöden, fel, tomt/laddande läge, tillåtna värden och gränsen precis under/vid/över.
- Verifiera felmeddelanden och att misslyckande inte ger falsk framgång eller raderar användarens indata.
- Databastest använder och städar separat temporär SQLite per test/svit. Verifiera skapa/läsa/uppdatera, constraints och beständighet efter stängd/öppnad anslutning.
- Testa seedning på tom databas, idempotens och att ändrade data inte skrivs över. Testa tomt läge separat.
- E2E täcker centrala lärarflöden, refresh och omstartsbeständighet där möjligt.
- Tillgänglighetstester täcker relevanta namn, etiketter, tangentbord, fokus, fel/statusregioner och reducerad rörelse. Komplettera manuellt där automation inte räcker.
- Målet är 100 % statements, branches, functions och lines för testbar produktionskod. Täckning får inte motivera test utan värde.
- Mocka inte centralt beteende som testas, exempelvis dess datalager eller tjänst. Mocka endast avgränsade externa beroenden eller nödvändig icke-deterministisk indata.
- Fasta fixtures är tillåtna som indata. Använd inte framgångsstubbar som alltid ger grönt utan att verifiera funktionen.
- Om 100 % kräver meningslösa test: dokumentera otäckt kod, varför meningsfullt test saknas och föreslagen avvikelse för teamets beslut. Sänk inte målet tyst.
- Använd README-dokumenterade täckningskommandon; hitta inte på eller anta scripts.
