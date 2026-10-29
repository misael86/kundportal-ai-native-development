---
name: assignment-intake
description: "Använd före större projektuppdrag: läs krav, planera, granska eller implementera. Red ut beslut och invänta ett godkännande av komplett exekveringsprompt före arbete."
---

# Uppdragsstart

Använd vid nya, större projektuppdrag. Hoppa över vid enkla faktafrågor, små förtydliganden eller om användaren uttryckligen ber att gå förbi flödet.

## 1. Undersök och grilla

1. Läs relevanta instruktioner, krav, kod och valideringsskript. Ta reda på fakta själv; fråga användaren om beslut.
2. Kartlägg beslut och beroenden. Ställ alla avgörande frågor som går att besvara nu i en numrerad omgång. Ge högst tre alternativ per fråga, rekommendera ett och formulera så att ”ja” godtar rekommendationen.
3. Vänta på svar. Uppdatera kartan och fråga igen först när nya beslut låsts upp.
4. Planera eller utför inte medan avgörande frågor är öppna. Säg uttryckligen när alla är lösta.

Intervjumetoden inspireras av [grill-me](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) och arbetsflödet `grilling`.

## 2. Få uppdraget godkänt

När alla avgörande beslut är låsta, presentera en komplett exekveringsprompt som också innehåller planen. Ta med mål, omfattning/undantag, berörda filer, acceptanskriterier, validering och återstående risker/antaganden. Lös avgörande antaganden före godkännandet.

Be användaren godkänna eller ändra den fullständiga prompten. Detta är uppdragets enda godkännandegrind. Stanna och vänta; börja inte arbeta före uttryckligt godkännande.

## 3. Komprimera och utför

Efter godkänd prompt: använd [caveman-prompt-compact](../caveman-prompt-compact/SKILL.md), jämför mot originalet och skicka den komprimerade prompten direkt till körning. Be inte om separat godkännande av planen eller Caveman-versionen.

- Bevara krav, negationer, exakta sökvägar, ID:n, kommandon, begränsningar och validering.
- Om komprimering skapar tvetydighet eller tappar krav: återställ detaljen; fråga om nytt beslut behövs.
- Lägg inte till omfattning eller ändra godkänt beteende. Pausa och återgå till grillen om arbetet kräver ett nytt avgörande beslut.
- Rapportera ändringar, faktiska valideringsresultat och kvarstående brister. Påstå aldrig att en okörd kontroll passerade.

## 4. Avsluta och fånga kunskap

Vid avslut av varje substantiell uppgift, ange tydligt om återanvändbar kunskap hittades eller om inget verkar värt att spara.

- Vid träff: sammanfatta om det gäller krav, projektfakta, arbetssätt eller annat; föreslå lämplig plats i projektets filer.
- Fråga användaren innan något sparas eller AI-filer ändras. Spara aldrig automatiskt.
