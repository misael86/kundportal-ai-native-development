# UI-riktlinjer

Det här dokumentet samlar den gemensamma visuella och interaktiva riktningen för kundserviceportalen. Det ska hjälpa oss skapa ett gränssnitt som är lätt att förstå, tillgängligt och modernt utan att lägga till onödig komplexitet.

## Inspirationskällor

Använd produkterna som referenser för specifika principer, inte som mallar att kopiera. Deras publika material är inte bevis på att deras gränssnitt uppfyller våra tillgänglighetskrav.

- [Zendesk](https://www.zendesk.com/service/ticketing-system/) — bekant informationsstruktur och arbetsflöden för supportärenden.
- [Plain](https://www.plain.com/overview) — avskalad, modern B2B-känsla och genomarbetad arbetsyta.
- [GOV.UK Design System](https://design-system.service.gov.uk/) — tillgängliga komponenter, formulär och mönster.

## Designprinciper

- Följ ”Don't make me think”: användaren ska snabbt förstå var den är, vad som är viktigt och vad nästa steg är.
- Gör ärenden lätta att skanna med tydlig visuell hierarki, konsekvent placering och begripligt språk.
- Lyft fram en tydlig primär åtgärd per sammanhang. Håll sekundära val synliga men mindre framträdande.
- Skapa en modern och premium känsla genom omsorgsfull typografi, konsekvent avstånd och återhållsam användning av färg och dekoration — inte genom att offra tydlighet.
- Återanvänd komponenter och mönster så liknande saker fungerar likadant genom hela portalen.

## Ljust och mörkt tema

- Stöd både ljust och mörkt tema.
- Följ operativsystemets temainställning initialt. Om användaren väljer tema manuellt ska valet kommas ihåg.
- Säkerställ läsbar text, begripliga statusar och tillräcklig kontrast i båda temana. Förmedla inte status enbart med färg.
- Exakt palett, färgtokens och var temavalet lagras fastställs när appen implementeras.

## Tangentbord och fokus

- Alla interaktiva delar ska vara användbara med tangentbord och följa en logisk fokusordning.
- Visa en tydlig och konsekvent fokusindikator för tangentbordsnavigation. Den ska fungera i båda temana, ha god kontrast mot omgivningen och inte förlita sig enbart på färg.
- Ta inte bort webbläsarens fokusindikator utan att ersätta den med en minst lika synlig indikator.
- Exakt fokusstil och fokusdesign-token fastställs när komponenterna implementeras.

## Responsivitet och tillgänglighet

- Prioritera de viktigaste uppgifterna och åtgärderna på små skärmar; undvik horisontell sidscroll och onödig visuell täthet.
- Använd WCAG 2.2 AA som riktmärke för kontrast, tangentbord, fokus, formulär och läsbarhet.
- Verifiera faktiska komponenter och flöden; anta inte att de är tillgängliga för att en inspirationskälla använder ett liknande mönster.
- Följ kravspecifikationerna och dokumentera utförda manuella tillgänglighetskontroller i [checklistan](accessibility-manual-checks.md).

## Detaljer att besluta vid implementation

Definiera gemensamma designtokens för färger, typografi, avstånd (inklusive padding och margin) och fokus när appens grund byggs. Återanvänd tokens i hela gränssnittet i stället för att upprepa värden i enskilda komponenter. Fastställ även hur användarens temaval koms ihåg. Verifiera kontrast i båda temana och visa centrala tillstånd i Storybook.
