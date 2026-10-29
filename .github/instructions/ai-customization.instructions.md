---
description: "Använd när du skapar eller ändrar Copilot-instruktioner, prompts, agenter eller skills. Håll AI-filer korta, avgränsade och utan dubblerade regler."
applyTo:
  - ".github/copilot-instructions.md"
  - ".github/instructions/**/*.instructions.md"
  - ".github/prompts/**/*.prompt.md"
  - ".github/agents/**/*.agent.md"
  - ".github/skills/**/SKILL.md"
---
# AI-konfigurationsfiler
# AI-konfigurationsfiler

- Skriv kort på svenska. Ta bara med regler som ändrar AI:ns beslut.
- Sikta på högst cirka 60 rader per fil. Dela bara när syfte, målgrupp eller aktivering skiljer sig.
- En fil = ett tydligt syfte. Lägg inte globala regler i filspecifika instruktioner.
- Välj rätt fil: `copilot-instructions.md` för generella regler; `.instructions.md` för ämne/filer; `.prompt.md` för återanvändbar uppgift; `.agent.md` för roll; `SKILL.md` för behovsstyrt arbetsflöde.
- Begränsa `applyTo` till berörda filer. Använd uppgiftsbeskrivning vid behov; undvik slentrianmässig global matchning.
- Skriv kort, sökbar `description` som anger när filen används.
- Lägg bara till filtypens nödvändiga frontmatter. Citatmarkera specialvärden; använd korrekt YAML-indrag, aldrig tabbar.
- Sök efter befintliga regler. Länka till källan i stället för att kopiera eller motsäga den.
- Undvik vaga råd, självklarheter, upprepning, lång bakgrund och regler som verktyg redan upprätthåller.
- Efter ändring: kontrollera målgrupp, `applyTo`, frontmatter och duplicerade regler.
