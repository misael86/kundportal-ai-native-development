---
name: caveman-prompt-compact
description: "Använd efter godkänd exekveringsprompt. Korta prompten och kör direkt utan separat godkännande; bevara krav, begränsningar, ID:n och verifiering."
---

# Komprimera godkänd prompt

Gör en kort arbetsversion av användarens godkända prompt. Detta komprimerar uppgiftstext; det ändrar inte assistentens svarsstil. Den ursprungliga promptens godkännande täcker även den komprimerade versionen.

## Bevara

- Omfattning, beslut, undantag, acceptanskriterier och önskat resultat.
- Negationer och villkor, inklusive ”inte”, ”endast” och ”om inte”.
- Sökvägar, ID:n, kommandon, URL:er, talgränser och citerad text.
- Teststrategi, validering samt säkerhets- och datahanteringskrav.

## Korta

- Ta bort upprepningar, artighetsfraser och bakgrund som inte påverkar beslut.
- Slå ihop upprepade regler utan att försvaga dem.
- Skriv kort och direkt med punktlistor.
- Ändra inte kod, kommandon, sökvägar, länkar eller exakta kravtexter.

Jämför arbetsversionen med godkänd prompt före körning. Återställ saknade eller tvetydiga krav. När jämförelsen är klar, kör direkt utan separat godkännande. Ställ bara följdfråga om en väsentlig oklarhet eller ett nytt beslut uppstår. Skicka inte prompten till annan provider, spara den inte i fil och ändra inte godkänd omfattning.

Inspirerad av [Caveman](https://github.com/juliusbrussee/caveman). `/caveman` ändrar svarsstil. `/caveman-compress` komprimerar en namngiven fil via konfigurerad modellprovider. Denna skill komprimerar bara godkänd uppgiftsprompt i aktuell session.
