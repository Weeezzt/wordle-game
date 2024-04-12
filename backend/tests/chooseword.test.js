import { chooseWord } from "../scripts/start-game";

// Tests so that the function gets the owrd of correct length
test("tests that it choses word of correct length", () => {
    expect(chooseWord(["KATT", "HUNDEN", "FISKEN", "HÄSTEN", "KANIN"], 4, false)).toBe("KATT");
});

// Tests so it gets correct length and only with unique letters
test("tests so that it choose correct length and only with unique letters", () => {
    expect(chooseWord(["HUND", "MATTE", "TÄNDER", "LEJON"], 5, true)).toBe("LEJON");
});

// Tests so that it chooses a word from the backup list if no word from the list is working
test("tests what happens if no word is working from the list", () => {
    expect(["SPRINT", "TRÄDGA", "FLYKTA", "SKYLTA", "PRICKA", "LUFTIG"]).toContain(
        chooseWord(["KATT", "MEGATRON", "LEGOLAS", "GANDALF", "MAN"], 6, false)
    );
});
