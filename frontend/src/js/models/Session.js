export default class Session {
    constructor(sessionID) {

        //Session's ID
        this.id = sessionID;

        //Characters to practice in Session
        this.practiceCharacters = [];

        //Characters to introduce in Session
        this.introduceCharacters = [];

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
/*     addPracticeCharacters(setCharacters, setSessionCharacters) {
        if(setSessionCharacters){
            setSessionCharacters.forEach(el => {
                this.practiceCharacters = [...this.practiceCharacters, ...practiceCharacters.slice(el, el+1)];
            });
        }
    } */

    //----------------------------------------------------------------
    addIntroduceCharacters(setCharacters, indexLastCharacterIntroduced, numOfSetCharacters) {
        //Add unintroduced cards to session by copying cards from setCharacters
        if(indexLastCharacterIntroduced <= numOfSetCharacters-1) {
            let start, end;
        
            //Determine start index to copy characterIDs from setCharacters
            indexLastCharacterIntroduced === -1 ? start = 0 : start = (indexLastCharacterIntroduced + 1);
            
            //Determine end index to copy characterIDs from setCharacters
            indexLastCharacterIntroduced <= numOfSetCharacters - 5 ? end = (start + 5) : end = (numOfSetCharacters - indexLastCharacterIntroduced);

            //Copy array from start to end, and push Character Ids to introduceCharacters
            const charactersToAdd = setCharacters.slice(start, end);
            const characterIDsToAdd = charactersToAdd.map(el => {
                return el.characterID;
            })

            this.introduceCharacters = [...this.introduceCharacters, ...characterIDsToAdd];

            return end - 1;
        }
    }

    //----------------------------------------------------------------
/*     getNextCharacter(length, characterIDs, setCharacters) {
        let returnValue;

        if(this.indexLastCharacterShown + 1 < length){
            this.indexLastCharacterShown++;
            returnValue = characterIDs[this.indexLastCharacterShown];
        } else {
            returnValue = 0;
        }

        return returnValue;
    } */
}