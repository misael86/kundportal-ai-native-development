---
name: caveman-prompt-compact
description: "Använd endast när användaren uttryckligen ber att komprimera en namngiven prompt; inte som rutin efter godkännande."
disable-model-invocation: true
---

# Komprimera prompt på begäran

Använd bara när användaren uttryckligen ber om komprimering av en prompt. Detta ändrar uppgiftstext, inte assistentens svarsstil. Ändra inte kod eller kör den komprimerade prompten.

Bevara omfattning, beslut, undantag, acceptanskriterier, negationer, exakta sökvägar/ID:n/kommandon och validering. Korta genom att ta bort upprepningar och bakgrund som inte påverkar kraven.

Leverera bara den kortare prompten. Ändra inte dess innebörd eller skicka den till annan provider.
