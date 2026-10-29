# Kundserviceportalen — Grupp 7

Lokal demoapp för att registrera, visa och hantera kundärenden. Projektet byggs med Next.js och TypeScript, SQLite och testdriven utveckling. Använd endast fiktiva uppgifter. Appen ska köras lokalt och inte publiceras.

> **Projektstatus:** En första Next.js-grund, delade UI-komponenter och Storybook finns. Ärendeflöden, SQLite, E2E och CI är fortfarande planerade.

## Dokumentation

- [Projektplan](docs/plan.md)
- [Öppna beslut och uppföljning](docs/todo.md)
- [UI-riktlinjer](docs/ui-guidelines.md)
- [Manuella tillgänglighetskontroller](docs/accessibility-manual-checks.md)
- [Komponentspecifikationer](src/shared/ui/)
- [Feature-specifikationer](src/features/issues/components/)
- [Sidspecifikationer](src/app/)
- [Veckostatus](docs/weekly-status/)

## Kom igång lokalt

1. Installera Node.js `24.22.2` och pnpm `10.30.1` enligt `.nvmrc` och `packageManager`.
2. Klona teamets fork och gå till projektmappen.
3. Installera beroenden med `pnpm install --frozen-lockfile`.
4. Starta appen med `pnpm dev` eller Storybook med `pnpm storybook`.
5. Öppna adressen som visas i terminalen, vanligtvis `http://localhost:3000` respektive `http://localhost:6006`.

Appen är avsedd för lokal körning av teamet och läraren. Den ska inte driftsättas eller publiceras.
Storybook visar delade UI-komponenter under `Shared/` och ärendefeature-komponenter under `Issues/`; ärendekomponenterna är inte delade komponenter. Använd verktygsfältets temaväljare för att granska båda temana. Appens färgtema följer systeminställningen tills ett manuellt val sparas i en cookie.

## SQLite och demodata

- SQLite-databasen ska lagras lokalt under `data/` och finnas kvar efter omstart.
- Vid första start ska databasschemat skapas och syntetiska demoärenden seedas automatiskt om databasen är tom.
- Seedning ska vara idempotent: omstart får inte skapa dubbletter eller skriva över ändrade ärenden.
- Testerna ska använda en separat temporär databas, aldrig den lokala demo-databasen.
- Databasschema, seed- och återställningskommando dokumenteras här när de har implementerats. Ta inte bort den lokala databasen för att felsöka innan du kontrollerat om du behöver spara demoändringar.

## Tester och kvalitetskontroller

Följ TDD: skriv test före implementation. Varje krav märks `Automatiserad`, `Manuell` eller `Båda` och verifieras enligt märkningen. CI-kontroll av kravspårning är planerad men ännu inte implementerad.

Tillgängliga kontroller:

| Kontroll | Kommando |
|---|---|
| Enhets- och komponenttester | `pnpm test` |
| Täckningsrapport | `pnpm test:coverage` |
| ESLint | `pnpm lint` |
| TypeScript | `pnpm typecheck` |
| Next.js produktionsbuild | `pnpm build` |
| Storybook utvecklingsläge | `pnpm storybook` |
| Storybook produktionsbuild | `pnpm build-storybook` |

End-to-end-tester, SQLite och CI läggs till när motsvarande delar implementeras.

Målet är 100 % line-, statement-, function- och branch-täckning av testbar produktionskod. Täckning är ett kvalitetsmål, inte ett skäl att skriva tester utan meningsfulla påståenden. Tester ska verifiera verkligt beteende och får inte mocka centrala delar som testas eller använda framgångsstubbar som alltid ger grönt. Fasta test-fixtures är tillåtna som indata. Om återstående kod saknar meningsfull testmöjlighet ska den och skälet dokumenteras för teamets beslut; sänk inte målet tyst. Se [testinstruktionen](.github/instructions/tests.instructions.md).

## Bidra

1. Läs relevant kravspecifikation och AI-instruktioner innan du börjar.
2. Bekräfta eller komplettera krav före implementation. Placera varje komponents eller sidas `.spec.md` bredvid dess kod.
3. Arbeta i en egen branch och gör små, fokuserade commits.
4. Skriv tester först. Kör relevanta tester och kontroller före PR.
5. Öppna en intern PR till teamets `main`. Be en teammedlem granska ändringen och invänta grön CI innan merge.
6. Uppdatera veckostatusen och länka den från kursens löpande PR.

Krav-ID:n är lokala per komponent och kravtyp (`K`, `D`, `T`, `F`). Dela upp sammansatta krav i separata, verifierbara kriterier. Ett test får verifiera flera krav. Se [instruktionen för kravspecifikationer](.github/instructions/component-specs.instructions.md) och [testinstruktionen](.github/instructions/tests.instructions.md).

## Kursens fork, PR och inlämning

- En teammedlem skapar en publik fork av [kursens repository](https://github.com/Technigo/kundportal-ai-native-development) och bjuder in övriga som collaborators. Hela teamet arbetar i den forken.
- Öppna och behåll kursens löpande PR från teamets forks `main` till kursrepots `main` under hela projektperioden. Den PR:n används för uppföljning och examination; merga den inte under arbetet.
- Vid PR till kursrepot: välj `Technigo/kundportal-ai-native-development` som base repository, `main` som base, teamets fork som head repository och dess `main` som compare. Välj **compare across forks** om det behövs.
- Interna arbets-PR:er går från feature-branch till teamets egen `main`. Kontrollera noga att rätt repository är valt som PR-mål.
- Uppdatera den löpande PR:n varje vecka med en länk till veckans status. Bevara tidigare veckor.
- Lägg slutversionens commit-länk i den löpande PR:n enligt kursens instruktioner.
- Individuell redovisning lämnas som Markdown-fil i studentens egen inlämning i Disco; lägg den inte i teamets repository.

Läs uppgift, veckoförväntningar och deadlines i [Disco](https://technigo.disco.co/p/fall-2026-ai-native-development/collection/Q29sbGVjdGlvbjozNzg3Ng==?u=25dab1f8-7abb-463e-a19e-d379efb7caae&drawerTab=comments). Se även [GitHubs guide till PR från en fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork).
