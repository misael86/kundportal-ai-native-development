# Plan: Kundserviceportal för ärenden

## Problem och föreslagen riktning

Planera en mobilanpassad Next.js-applikation i TypeScript för att skapa, visa, redigera och lista kundserviceärenden. Arbetssättet ska vara testdrivet, tillgängligt enligt WCAG 2.2 AA och stödja granskning via PR och CI. Appen ska köras lokalt av lärare; den ska aldrig publiceras. SQLite används för lokal lagring och förifylls med fiktiva demoärenden så att appen går att utforska direkt. En fristående användarmanual ska göra det möjligt för någon annan än utvecklarna att testköra och demonstrera systemet.

## Föreslagna delar

1. **Grund och arkitektur**
   - Next.js App Router och TypeScript.
   - pnpm som pakethanterare och låsfilskälla.
   - Feature-driven struktur: varje domänfunktion äger sin UI, logik och tester.
   - Gemensamma, återanvändbara baskomponenter i en separat shared-mapp.
   - SQLite för lokal, beständig data.
   - Ingen inloggning i första versionen.

2. **Ärendehantering**
   - Ärende med rubrik, beskrivning, kategori, prioritet, status och skapelsetid.
   - Skapa, lista, läsa och redigera ärenden.
   - Statusar: Nytt, Pågående, Väntar på kund och Avslutat.
   - Kompletterande tjänst: sök ärenden och filtrera på status.
   - Definiera tillåtna värden, validering, tomma listor och fel-/gränsfall i kravspecifikationerna.

3. **Komponenter och kravspecifikationer**
   - Use English URL segments. Place each page specification beside its Next.js route as `page.spec.md`. Known routes: `/` (issue overview) and `/issues/[id]` (issue detail).
   - Sidspecifikationer beskriver sidans sammansättning och navigation; hänvisa till komponenternas specifikationer i stället för att kopiera deras krav.
   - Gemensamma UI-komponenter som redan går att förutse:
     - `Button` för primära och sekundära åtgärder.
     - `TextInput`, `Textarea` och `Select` med etikett-, hjälp- och felvisning.
     - `StatusBadge` som visar status med text, inte bara färg.
     - `Notification` för bekräftelser och fel, till exempel när ärenden skapas eller ändras.
   - Använd `lucide-react` för ikoner. Ikoner är dekorativa när intilliggande text förmedlar samma sak; ikonknappar utan synlig text ska ha ett tillgängligt namn.
   - Ärendefeatures:
     - `IssueForm` för att skapa och redigera ärenden.
     - `IssueList` för lista, filtrering och tomt läge.
     - `IssueCard` för ärendesammanfattning och navigering till detaljer.
     - `IssueDetail` för visning och statusändring av valt ärende.
     - Sökfält och statusfilter som ärendespecifika listkontroller; gör dem delade först om fler features behöver dem.
   - Separera gemensamma komponenter från ärendefeature-komponenter i både källkod och specifikationer.
   - Komponentmappar innehåller respektive komponentkod, testfiler och kravspecifikation bredvid som `<komponent>.spec.md`. Exempel: `src/shared/ui/button/` och `src/features/issues/components/issue-form/`.
   - Gruppera krav per typ i ordningen funktionella (`K`), data/validering (`D`), tillgänglighet (`T`) och felhantering (`F`).
   - Numrera separat inom varje komponent och kravtyp, med start på 1. Ett ID som `K1` får förekomma i flera komponenter, men aldrig två gånger i samma komponent.
   - Varje krav ska beskriva ett enda verifierbart kriterium. Dela upp krav som innehåller flera fält, beteenden eller kvalitetsmål i separata krav. Ett test får verifiera ett eller flera krav.
   - Första komponentinventering och kravförslag finns i respektive komponentmappars `.spec.md`-filer. Krav-ID:n och omfattning ska stämmas av mot minimikraven innan tester/implementation påbörjas.

4. **Databas och demo**
   - Definiera hela SQLite-schemat i en versionshanterad SQL-fil innan databasimplementationen.
   - Första schemat innehåller en `issues`-tabell:
     - `id INTEGER PRIMARY KEY`
     - `title TEXT NOT NULL`, trimmas och begränsas till 1–120 tecken.
     - `description TEXT NOT NULL`, trimmas och begränsas till 1–5000 tecken.
     - `category TEXT NOT NULL`, begränsad till beslutad kategorilista.
     - `priority TEXT NOT NULL`, begränsad till beslutad prioritetslista.
     - `status TEXT NOT NULL`, begränsad till Nytt, Pågående, Väntar på kund eller Avslutat.
     - `created_at TEXT NOT NULL`, ISO-8601-tid satt av systemet.
     - `updated_at TEXT NOT NULL`, uppdateras vid ändring och statusbyte.
   - SQL-constraints ska skydda obligatoriska fält, längdgränser och tillåtna värden även om validering i appen kringgås.
   - Lägg till index för status och skapelsetid om listfrågorna har nytta av dem; sökning kan börja med SQLite `LIKE`.
   - Seedning ska lägga in ett litet urval syntetiska ärenden automatiskt för en tom databas, aldrig duplicera dem vid omstart och inte skriva över användarens ändringar.
   - Använd separat tillfällig/testdatabas för tester och tomt läge. Dokumentera hur läraren återställer en lokal demodatabas.

5. **Kvalitet och tillgänglighet**
   - TDD: skriv relevanta tester före implementation.
   - Komponent-, integrations- och end-to-end-tester för centrala användningsfall.
   - WCAG 2.2 AA som krav för komponenter och flöden; kombinera automatiska kontroller med manuell tangentbords- och skärmläsartestning.
   - Responsiv design och verifiering på små och stora skärmar.
   - Storybook för gemensamma komponenter med tillstånd och tillgänglighetsexempel.

6. **Krav, dokumentation och AI-styrning**
   - Använd kravtyperna `K` (funktion), `D` (data/validering), `T` (tillgänglighet) och `F` (felhantering), grupperade i den ordningen i varje komponent-spec.
   - Krav-ID:n är lokala per komponent och kravtyp. Starta numreringen på 1 för varje typ i varje komponent. ID:n återanvänds alltså mellan komponenter, men får inte dupliceras inom samma komponent.
   - Varje krav beskriver ett enda verifierbart kriterium. Dela upp krav som specificerar flera fält, beteenden eller villkor i separata krav. Ett test kan verifiera ett eller flera krav.
   - Varje test ska referera till ett eller flera krav-ID:n. Varje krav ska ha minst ett automatiserat test kopplat till sig.
   - Lägg inte testspårningslistor i komponenternas `.spec.md`-filer. Placera tester så komponenten går att härleda från testsökvägen; varje test anger krav-ID:n i namn eller metadata.
   - Lägg till ett CI-steg som läser krav-ID:n per typ från varje komponentmapps `.spec.md`, kontrollerar att inga ID:n dupliceras inom komponenten och att varje enskilt krav-ID förekommer i minst ett automatiserat test för komponenten. CI ska rapportera komponent och krav-ID för saknade tester.
   - Användarmanual med förutsättningar, testdata, stegvisa demo-flöden och förväntat resultat.
   - Ersätt befintlig `README.md` med projektets start- och bidragsguide. Behåll och integrera kursens viktiga fork-, löpande PR- och inlämningsinstruktioner så att inget befintligt kursflöde går förlorat.
   - README ska förklara förutsättningar och installation, starta appen lokalt, hur SQLite initieras och seed-data skapas, hur lokal demodata återställs, hur tester/täckning/lint/typkontroll körs samt hur interna PR:er och granskning går till.
   - Skilj utvecklarinstruktioner från lärarens demo-flöde och länka vidare till användarmanual, krav, veckostatus och AI-instruktioner i stället för att duplicera deras innehåll.
   - Veckostatus för vecka 5–8 sparas var för sig i dokumentationen och länkas från den löpande PR:n. Varje status beskriver planerat, genomfört (med länkar), verifierat (kontroller och resultat), osäkert/ofärdigt samt nästa steg och ansvarig.
   - Korta, ämnesindelade AI-instruktioner; undvik duplicerade regler och håll filer omkring 60 rader eller färre där det passar.

7. **GitHub-arbetsflöde**
   - PR:er inom teamets fork går till dess `main`; CI kontrollerar build och tester och kräver grönt resultat före merge.
   - Behåll kursens löpande PR till kursrepot enligt README; CI-ändringen avser teamets interna utvecklingsflöde.
   - Lägg inte till workflow som ändrar kursrepots befintliga inlämningsflöde utan separat beslut.

## Föreslagen ordning

1. Besluta fältgränser, kategorier, prioriteter, statusflöde, SQL-constraints och regler för seedning.
2. Numrera krav, skriv komponent-/feature-specifikationer, SQL-schema, teststrategi och krav-till-test-matris innan implementation.
3. Skapa Next.js/TypeScript-grund, feature-driven struktur, lokal SQLite-initiering och idempotent demodata.
4. Bygg gemensamma komponenter och ärendeflöden stegvis med TDD, WCAG 2.2 AA och responsiv UI.
5. Ersätt README med bidrags- och körguide; lägg till Storybook, CI, användarmanual och veckostatusar; verifiera hela systemet, inklusive beständighet.

## Beslut och hänsyn

- Repo är en kursmall. Dess README beskriver en löpande PR från teamets fork till kursrepot och interna PR:er till teamets `main`; planen behåller det upplägget.
- Appen är endast avsedd att köras lokalt av lärare. Publicering, hosting och online-drift ingår inte.
- Första versionen använder lokal SQLite och saknar autentisering; använd endast fiktiva uppgifter.
- Föreslagna kategorier och prioritetsnivåer ska beslutas och kravsättas innan SQL-schemat låses.
- Använd endast fiktiva kunduppgifter i test- och demodata.

## Minimikrav och testspårbarhet

Minimikraven från uppgiften blir funktionella krav i kravspecifikationen:

- Skapa kundärende och validera obligatoriska uppgifter.
- Behålla ärenden efter omstart.
- Lista ärenden och visa valt ärendes detaljer.
- Ändra status.
- Visa begripligt fel för minst ett felaktigt användningsfall.
- Automatiserade tester för centrala happy paths och error paths.
- Körbar och demonstrerbar lokalt med instruktion.
- Minst en kompletterande funktion: sökning och statusfiltrering.

Planerade testnivåer:

- **Enhetstester:** fältvalidering, tomt värde, gränsvärde, för långt värde, tillåtna enum-värden och felmeddelanden.
- **Databasintegration:** skapa, lista, hämta detaljer, ändra status, constraints och bevara ändringar efter att anslutningen stängts och öppnats igen.
- **Komponent-/API-tester:** fältfel, begripligt fel, tomt resultat, sökning och statusfilter.
- **End-to-end:** lärarens centrala användarflöde i webbläsaren, uppdaterad status, refresh utan dataförlust och beständighet efter omstart av appen.
- **Seed-test:** tom databas får exempelärenden; upprepad initiering skapar inga dubbletter och skriver inte över ändrade ärenden.
- **Test-ID:n:** tester hänvisar till komponentens lokala krav-ID. CI verifierar per komponent varje ID i `.spec.md` mot dess automatiserade tester och rapporterar saknade tester/dubbletter. Ett test får täcka flera krav; ID-nummer kan återanvändas av andra komponenter. Ingen manuell spårningslista i `.spec.md`.
- **WCAG-verifiering:** varje tillgänglighetskrav får automatiserade kontroller där det går; komplettera med dokumenterade manuella tangentbords- och skärmläsartester.
- **Täckning:** mål 100 % statement-, branch-, function- och line-täckning för testbar produktionskod. Om 100 % inte är rimligt, dokumentera kvarvarande kod, motivering och beslutad täckningsnivå; teamet tar ett aktivt beslut om avvikelsen.

## Veckostatus vecka 5–8

Skapa en statusfil per vecka, till exempel `docs/weekly-status/week-5.md` till `week-8.md`. Behåll gamla statusar. Varje fil följer samma korta mall:

- **Planerat**
- **Genomfört** — länkar till PR, dokumentation och ändringar.
- **Verifierat** — kommandon/kontroller och resultat.
- **Osäkert eller ofärdigt**
- **Nästa steg och ansvarig**

Länka varje ny veckostatus från den löpande PR:n och jämför veckans förväntningar med faktiskt läge.
