// Test: Test all so the functions work together
import { chooseWord, feedback} from "../scripts/start-game";
import getWordList from "../scripts/get-word";

describe("Test all the functions", () => {
    test("Test all so the functions work together", async () => {
        const wordList = await getWordList();
        const word = chooseWord(wordList, 4, true);
        const result = feedback(word, 'teas');

        expect(Array.isArray(result)).toBe(true);

        expect(result.length).toBe(4);

        result.forEach(item => {
            expect(item).toHaveProperty('letter');
            expect(item).toHaveProperty('result');
        });
    })
});