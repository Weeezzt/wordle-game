import fetch from "node-fetch";

const API = "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json";

export default async function getWordList() {
    const res = await fetch(API);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    } else {
        const data = await res.json();
        const words = Object.keys(data);
        return words;
    }
}
