export const excludeNonCharacterSymbols = (input) => input.replace(/\p{Emoji}/gu, '');
