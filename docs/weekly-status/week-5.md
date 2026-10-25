# Veckostatus — vecka 5 (19–25 oktober 2026)

## Planerat

- Planera en lokal Next.js/TypeScript-app med SQLite, TDD och WCAG 2.2 AA.
- Ta fram krav, komponentstruktur och AI-stöd före implementation.
- Bevara kursens befintliga fork- och PR-flöde.

## Genomfört

- Dokumenterat projektplanen i [planen](../plan.md).
- Skapat specfiler för gemensamma komponenter: Button, TextInput, Textarea, Select, StatusBadge och Notification.
- Skapat feature-specfiler för IssueForm, IssueList, IssueCard och IssueDetail.
- Skapat sidspecfiler för startsidan och `/issues/[id]`.
- Delat upp krav i enskilda, verifierbara kriterier. Krav-ID numreras per komponent och kravtyp; ett test kan verifiera flera krav.
- Dokumenterat laddningsskelett, tillgängligt statusmeddelande, reducerad rörelse och separata tomlägen för ärendelistan.
- Skapat AI-instruktioner för projektet, specfiler, tester, veckostatus och andra AI-konfigurationsfiler:
  - [Projektinstruktioner](../../.github/copilot-instructions.md)
  - [Specinstruktion](../../.github/instructions/component-specs.instructions.md)
  - [Testinstruktion](../../.github/instructions/tests.instructions.md)
  - [Veckostatusinstruktion](../../.github/instructions/weekly-status.instructions.md)
  - [AI-konfigurationsinstruktion](../../.github/instructions/ai-customization.instructions.md)
- Lagt till grundläggande [.gitignore](../../.gitignore) och behållit tomma projektkataloger med `.gitkeep`.

## Verifierat

- Kontrollerat krav-ID:n och lokala Markdown-länkar i samtliga 12 specfiler.
- Validerat YAML-frontmatter och `applyTo` för de fyra filspecifika instruktionerna.
- `git diff --check` passerade.
- Ingen applikationskod, CI eller automatiserade tester finns ännu; därför har ingen app-build eller testsuite körts.

## Osäkert eller ofärdigt

- Kategorier och prioritetsvärden behöver bekräftas innan SQLite-schemat fastställs.
- SQL-schema, idempotent seed-data, applikation och användarmanual återstår.
- Automatiserade tester och CI-kontroll för att varje krav-ID har test saknas.
- README behöver ersättas med bidrags- och körinstruktioner utan att tappa kursens fork-/PR-anvisningar.

## Nästa steg och ansvarig

- Bekräfta ärendefält, kategorier, prioriteter och valideringsgränser — ansvarig: teamet utser en person.
- Färdigställ och granska kravspecifikationerna samt definiera SQLite-schema och seedningsregler — ansvarig: teamet utser ansvariga.
- Börja implementation testdrivet när kraven och teststrategin är överenskomna — ansvarig: teamet utser ansvariga per feature.
