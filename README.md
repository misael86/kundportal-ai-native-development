# Kundserviceportalen Grupp 7

Teamets arbete med Kundserviceportalen i kursen AI Native Development: en mindre
fullstacklösning byggd med AI-stöd. Använd bara påhittade kunduppgifter.

**Uppgift, betygskriterier, veckoförväntningar och deadline finns under
Kursexamination i Disco.** Börja där och återvänd dit under arbetet.
[Länk till Disco](https://technigo.disco.co/p/fall-2026-ai-native-development/collection/Q29sbGVjdGlvbjozNzg3Ng==?u=25dab1f8-7abb-463e-a19e-d379efb7caae&drawerTab=comments)

## Projektets dokumentation

Lokal fullstacklösning med **Next.js (App Router) + TypeScript + Prisma + SQLite**.
All gemensam dokumentation finns i [`docs/`](docs/README.md).

| Dokument | Innehåll |
|---|---|
| [Projektplan](docs/project-plan.md) | Omfattning, milstolpar, ansvar, konfliktregler |
| [Specifikation](docs/specification.md) | Datamodell, statusflöde, validering, API-kontrakt, AC |
| [Beslut](docs/decisions/README.md) | ADR:er med alternativ, beslut och konsekvenser |
| [Feature-briefs](docs/features/README.md) | Krav per feature: omfattning, kontrakt, tester, verifiering |
| [AI-arbetssätt](docs/ai-workflow.md) | Hur vi styr AI, gränser, granskning, återkommande moment |
| [AI-verktyg](docs/ai-tooling.md) | En regelfil för alla assistenter; så lägger du till en adapter |
| [Verifieringsplan](docs/verification-plan.md) | Testnivåer, testmatris, resultat, begränsningar |
| [Spårbarhet](docs/traceability.md) | AC → issue → PR → test → bevis |
| [Backlog](docs/backlog.md) | Issues, milstolpar och beroenden |
| [Veckostatus](docs/weekly/week-05.md) | Planerat, genomfört, verifierat, osäkert, nästa steg |
| [Runbook](docs/runbook.md) | Så kör och demonstrerar någon annan lösningen |

Branches, commits och granskning: [CONTRIBUTING.md](CONTRIBUTING.md).
AI-agenter: [AGENTS.md](AGENTS.md).

> Individuella redovisningar lämnas i Disco och ska **inte** läggas i detta
> repository.

## Kom igång

Projektarbetet börjar vecka 5. Frivillig start vecka 4; den veckans fristående
kodövning finns kvar.

1. Läs uppgiften och veckans förväntningar i Disco.
2. **En person skapar en publik fork** från
   [kursens repository](https://github.com/Technigo/kundportal-ai-native-development)
   och bjuder in övriga som **collaborators** via **Settings → Collaborators → Add
   people**. Alla accepterar och kontrollerar att de kan pusha. Koden och underlagen
   är läsbara i den publika forken utan separat inbjudan.
3. Klona teamets fork.
4. Gör en första förändring: beskriv teamet och första planen i dokumentationen.
   Committa och pusha till `main` i forken. Körbar kod krävs inte för att öppna
   PR:n.
5. Öppna teamets löpande PR enligt nästa avsnitt.
6. Fortsätt enligt vecka 5 i Disco.

Ni arbetar i **samma fork** under projektet; det räcker att en person skapar den.
[Hjälp med collaborators](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository).

## Branches och pull requests

Teamets löpande PR går **från `main` i teamets fork till `main` i kursens
repository**.

| Val i GitHub | Ange |
|---|---|
| Base repository | `Technigo/kundportal-ai-native-development` |
| Base | `main` |
| Head repository | Teamets fork |
| Compare | `main` |

Välj **compare across forks** om båda repositories inte visas. Använd teamets namn i
PR-rubriken. Kopiera innehållet i
[PR-mallen för teamets projekt](.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md)
och fyll i det som finns vid starten; resten växer fram.

Håll samma PR öppen under projektperioden. Den används för uppföljning och inlämning
och ska inte mergas till kursens repository. Nya commits på teamets `main` syns i
samma PR.

Inom forken: separata branches för mindre uppgifter, granskade i interna PR:er till
**teamets egen `main`**. Kontrollera målet innan du öppnar en intern PR. Gör
granskningen spårbar: vem granskade, vad kontrollerades, vad ledde återkopplingen
till?

[GitHubs guide för PR från en fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork).

## Er dokumentation

Utforma dokumentationen och styrningen av AI-verktygen utifrån uppgiften i Disco.
Länka underlagen från den löpande PR:n så att arbetet går att följa.

## Slutversion och inlämning

När kod, tester och dokumentation är pushade: kopiera länken till commiten med
slutversionen och lägg den överst i PR-beskrivningen under **Slutversion för
examination**. Kontrollera att länkarna visar den inlämnade versionen i forken.

Varje student lämnar sin individuella redovisning som en **Markdown-fil (.md)** i
sin egen inlämning i Disco. Märk den med ditt namn och länka till teamets fork,
löpande PR, markerad slutversion och det arbete som visar ditt bidrag.

Redovisningen ska inte läggas i teamets repository eller länkas från PR:n. Du
behöver inte dela den med klasskamraterna.

Följ aktuell instruktion och deadline i Disco.
