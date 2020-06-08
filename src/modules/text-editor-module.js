// usuwa niepotrzbne nawiasy z tekstu
export function editText(text) {
  const edited = text.replace(/\[|\]/g, '');
  return edited;
}

// dzieli tekst na krótsze kawałki
export function sliceLongString(text) {
  const arrayOfSingleWords = text.split(' ');
  if (arrayOfSingleWords.length < 13) {
    const preparedSentence = arrayOfSingleWords.join().replace(/,/g, ' ');
  } else if (arrayOfSingleWords.length < 26) {
    const preparedSentence1 = arrayOfSingleWords.slice(0, 13).join().replace(/,/g, ' ');
    const preparedSentence2 = arrayOfSingleWords.slice(13, 26).join().replace(/,/g, ' ');
    text = [preparedSentence1, preparedSentence2];
  } else {
    const preparedSentence1 = arrayOfSingleWords.slice(0, 13).join().replace(/,/g, ' ');
    const preparedSentence2 = arrayOfSingleWords.slice(13, 26).join().replace(/,/g, ' ');
    const preparedSentence3 = arrayOfSingleWords.slice(26, 39).join().replace(/,/g, ' ');
    text = [preparedSentence1, preparedSentence2, preparedSentence3];
  }
  return text;
}
