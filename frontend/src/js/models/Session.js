export default class Session {

    constructor(sessionID, set) {
        //Session's ID
        this.id = sessionID;
        //Characters to practice in Session
        this.practiceCharacters = this.addPracticeCharacters(set.sessionCharacters);
        //Characters to introduce in Session
        this.introduceCharacters = this.addIntroduceCharacters(set.characters, set.indexLastCharacterIntroduced, set.numOfCharacters);
        //Index of last Character shown (used for practiceCharacters and introduceCharacters)
        this.indexLastCharacterShown = -1;
        //Number of Characters to introduce at each Session
        this.numOfCharactersIntroduce = 5;
        //Character ratings in Session
        this.characterRatings = [];
        //Session shown previously (0 False, 1 True)
        //this.shownAlready = 0;
    }

    //----------------------------------------------------------------
    addPracticeCharacters(setSessionCharacters) {
        if(setSessionCharacters[this.id -1]){
            const practiceCharacters = [...setSessionCharacters[this.id -1]];
            return practiceCharacters;
        } else {
            return -1;
        }
    }

    //----------------------------------------------------------------
    addIntroduceCharacters(setCharacters, indexLastSetCharacterIntroduced, numOfSetCharacters) {
        //Add unintroduced cards to session by copying cards from setCharacters
        if(indexLastSetCharacterIntroduced <= numOfSetCharacters-1) {
            let start, end;
        
            //Determine start index to copy characterIDs from setCharacters
            indexLastSetCharacterIntroduced === -1 ? start = 0 : start = (indexLastSetCharacterIntroduced + 1);
            
            //Determine end index to copy characterIDs from setCharacters
            indexLastSetCharacterIntroduced <= numOfSetCharacters - 5 ? end = (start + 5) : end = (numOfSetCharacters - indexLastSetCharacterIntroduced);

            //Copy array from start to end, and push Character Ids to introduceCharacters
            const charactersToAdd = setCharacters.slice(start, end);

            const introduceCharacters = charactersToAdd.map(el => {
                return el.id;
            })

            return introduceCharacters;
        } else {
            return -1;
        }
    }

    //----------------------------------------------------------------
    getNextCharacter(length, characterIDs, set) {
        let character;

        if(this.indexLastCharacterShown + 1 < length){
            this.indexLastCharacterShown++;
            character = set.characters[characterIDs[this.indexLastCharacterShown] -1];
        } else {
            character = 0;
        }

        return character;
    }

    //----------------------------------------------------------------
    saveCharacterRating(character, rating) {
        
        this.characterRatings.push([character.id, rating]);
    }
}