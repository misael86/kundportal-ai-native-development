---
description: "Use when creating or editing Copilot instructions, file instructions, prompts, or agents. Keep AI customization files concise, focused, correctly scoped, and free of duplicate rules."
applyTo:
  - ".github/copilot-instructions.md"
  - ".github/instructions/**/*.instructions.md"
  - ".github/prompts/**/*.prompt.md"
  - ".github/agents/**/*.agent.md"
---

# AI-konfigurationsfiler

- Skriv på svenska, kortfattat och med punktlistor. Ta bara med regler som hjälper AI:n att fatta ett annat eller bättre beslut.
- Sikta på högst cirka 60 rader per fil. Dela bara upp när ämnen, målgrupper eller aktiveringsvillkor skiljer sig.
- En fil ska ha ett tydligt syfte. Lägg inte allmänna projektregler i filspecifika instruktioner.
- Välj rätt filtyp: `copilot-instructions.md` för regler som gäller det mesta arbetet; `.instructions.md` för ett ämne eller filurval; `.prompt.md` för en återanvändbar uppgift; `.agent.md` för en särskild agentroll.
- Begränsa `applyTo` till berörda filer. Använd beskrivning för uppgiftsstyrda instruktioner; använd inte global matchning av slentrian.
- Skriv en kort, sökbar `description` som börjar med när instruktionen ska användas.
- Lägg bara till YAML-frontmatter som filtypen behöver. Citatmarkera beskrivningar och värden med specialtecken; använd korrekt indrag och inga tabbar.
- Sök efter befintliga regler innan du lägger till nya. Länka till en källa i stället för att kopiera eller motsäga den.
- Undvik vaga råd, självklarheter, upprepningar, långa bakgrundsavsnitt och regler som redan upprätthålls av verktyg.
- Följ projektets preferens om korta, tydliga svar även när instruktionen gäller AI-filer.
- Efter ändring: kontrollera filens målgrupp, `applyTo`, frontmatter och att regeln inte dupliceras i andra instruktioner.
