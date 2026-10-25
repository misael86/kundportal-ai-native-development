---
description: "Use when creating or updating weekly project status reports in docs/weekly-status. Covers week 5–8 reports, evidence, links, and preserving history."
applyTo: "docs/weekly-status/**/*.md"
---

# Veckostatus

- Skriv en separat fil per kursvecka, `week-5.md` till `week-8.md`. Behåll tidigare veckors filer oförändrade när en ny vecka rapporteras.
- Använd ISO-veckonummer och ange datumintervallet. Vecka 5 år 2026 är 19–25 oktober; vecka 8 är 9–15 november.
- Använd korta punktlistor under exakt dessa rubriker:
  - `## Planerat`
  - `## Genomfört`
  - `## Verifierat`
  - `## Osäkert eller ofärdigt`
  - `## Nästa steg och ansvarig`
- Håll planerat och genomfört åtskilda: rapportera vad som faktiskt slutfördes, inte vad som bara påbörjades eller planerades.
- Länka genomfört arbete till relevanta PR:er, filer eller commits när sådana finns.
- Ange verifieringskommandon och verkliga resultat. Säg tydligt när tester/build inte körts; anta inte att de passerat.
- Redovisa osäkerheter, öppna beslut och ofärdiga krav utan att formulera dem som levererade.
- Ange ansvarig endast när den är känd. Annars skriv att teamet behöver utse ansvarig; hitta inte på namn.
- Ta med nästa konkreta steg och ansvarig.
- Statusen ska jämföra faktiskt läge med veckans förväntningar. Länka rapporten från teamets löpande PR.
