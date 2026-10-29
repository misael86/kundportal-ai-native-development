---
name: assignment-intake
description: "Använd före större projektuppdrag: läs krav, planera, granska eller implementera. Red ut beslut och invänta godkänd plan och prompt före arbete."
---

# Uppdragsstart

Använd vid nya, större projektuppdrag. Hoppa över vid enkla faktafrågor, små förtydliganden eller om användaren uttryckligen ber att gå förbi flödet.

## 1. Undersök och grilla

1. Läs relevanta instruktioner, krav, kod och valideringsskript. Ta reda på fakta själv; fråga användaren om beslut.
2. Kartlägg beslut och beroenden. Ställ alla avgörande frågor som går att besvara nu i en numrerad omgång. Ge högst tre alternativ per fråga, rekommendera ett och formulera så att ”ja” godtar rekommendationen.
3. Vänta på svar. Uppdatera kartan och fråga igen först när nya beslut låsts upp.
4. Planera eller utför inte medan avgörande frågor är öppna. Säg uttryckligen när alla är lösta.

Intervjumetoden inspireras av [grill-me](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) och arbetsflödet `grilling`.

## 2. Få planen godkänd

Visa en kort plan med mål, omfattning/undantag, berörda filer, acceptanskriterier, validering och återstående risker/antaganden. Lös avgörande antaganden före godkännandet.

Be användaren godkänna eller ändra planen. Stanna och vänta. Börja inte arbeta utan uttryckligt godkännande.

## 3. Få exekveringsprompten godkänd

Gör planen till en komplett prompt. Bevara mål, beslut, gränser, acceptanskriterier och valideringskommandon. Visa hela prompten; be användaren godkänna eller ändra den. Stanna och vänta. Godkännandet gäller denna fullständiga prompt.

## 4. Komprimera och utför

Efter godkänd prompt: använd [caveman-prompt-compact](../caveman-prompt-compact/SKILL.md), jämför mot originalet och skicka den komprimerade prompten direkt till körning. Fråga inte om separat godkännande av Caveman-versionen.

- Bevara krav, negationer, exakta sökvägar, ID:n, kommandon, begränsningar och validering.
- Om komprimering skapar tvetydighet eller tappar krav: återställ detaljen; fråga om nytt beslut behövs.
- Lägg inte till omfattning eller ändra godkänt beteende. Pausa och återgå till grillen om arbetet kräver ett nytt avgörande beslut.
- Rapportera ändringar, faktiska valideringsresultat och kvarstående brister. Påstå aldrig att en okörd kontroll passerade.
