export const stringInitials = (str: string) =>
  str
    .split(" ")
    .reduce((prev, val) => `${prev[0]}${val[0]}`)
    .toUpperCase()
    .substr(0, 2);

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getUrlParameter = (sParam: string) => {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split("&");
  let sParameterName: string[];

  for (let i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? ""
        : decodeURIComponent(sParameterName[1]);
    }
  }

  return "";
};

export const validURL = (str: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i",
  );
  return !!pattern.test(str);
};

export const checkForURL = (str: string) => {
  let hasURL = false;

  str.split(" ").forEach((word) => {
    hasURL = validURL(word);
  });

  return hasURL;
};

interface IReplaceVowelCombinations {
  word: string;
  vowel: string;
  similars: object;
  excludes: string[];
  combinations?: string[];
}
const replaceVowelCombinations = (params: IReplaceVowelCombinations) => {
  const { word, vowel, similars, combinations = [], excludes = [] } = params;
  const similarKeys = Object.keys(similars);
  const newCombinations = [...combinations];

  // * Set the original word with only the main vowel replaced
  // * this is for getting only the pair combinations
  // * i.e. ae ai ao au ei eo eu etc...
  const wordWithMainVowelReplaced = word.replace(vowel, similars[vowel]);

  Object.keys(similars).forEach((letter) => {
    if (letter === vowel || excludes.includes(letter)) return;

    if (wordWithMainVowelReplaced.includes(letter)) {
      newCombinations.push(
        wordWithMainVowelReplaced.replace(letter, similars[letter]),
      );
    }
  });

  // * if it's the last similar vowel, return all combinations
  if (vowel === similarKeys[similarKeys.length - 1]) {
    return newCombinations;
  }

  // * if not, run the iteration for next vowels updating
  // * the combinations and the excludes
  return replaceVowelCombinations({
    ...params,
    vowel: similarKeys[similarKeys.indexOf(vowel) + 1],
    combinations: newCombinations,
    excludes: [...excludes, vowel],
  });
};
export const getFoulWords = () => {
  // * This will generate all the profanity words from a base pool
  const basePool = [
    "fuck",
    "shit",
    "cock",
    "faggot",
    "nigger",
    "cunt",
    "asshole",
  ];

  let foulsWords = [...basePool];

  // * Replace letters with similar
  const similars = {
    a: "4",
    e: "3",
    i: "1",
    o: "0",
    u: "v",
  };
  let similarWords = [];
  foulsWords.forEach((word) => {
    const addedLetters = [];
    Object.keys(similars).forEach((letter) => {
      // * This is for getting all the vowels combinations that are 3+
      // * i.e. aei aeio aeiou
      let combinedVowels = word;
      let vowelsQuantity = 0;

      if (word.includes(letter)) {
        vowelsQuantity++;

        // * replace single vowels
        similarWords.push(word.replace(letter, similars[letter]));

        // * all vowels combinations pair combinations
        similarWords = [
          ...similarWords,
          ...replaceVowelCombinations({
            word,
            vowel: letter,
            similars,
            excludes: addedLetters,
          }),
        ];
        addedLetters.push(letter);

        // * all the vowels 3+ combinations
        combinedVowels = combinedVowels.replace(letter, similars[letter]);
        if (vowelsQuantity > 2) {
          similarWords.push(combinedVowels);
        }
      }
    });
  });
  foulsWords = [...foulsWords, ...similarWords];

  // * Permute all letters except the first and last

  // * Remove letters until 2 remain between the first and last

  return foulsWords;
};
