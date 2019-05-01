import Character from './Character';
import axios from 'axios';

export default class Set {
    
    constructor(setID, app) {

        const setState = app.setStates[setID -1];

        //Set's ID
        this.id = setID;
        //Set's Character Data (temporarily stored)
        this.characters = [];
        //Num of Characters in a Set
        this.numOfCharacters = 100;

        if(setState){
            //Set's Status (-1 locked, 0 ongoing, 1 completed)
            //this.status = setState.status;
            //Set's Character IDs (used to populate this.characters)
            this.characterIDs = setState.characterIDs;
            //Set's mastered Character IDs 
            this.masteredCharacterIDs = setState.masteredCharacterIDs;
            //Index of most recent Character introduced from Set.characters 
            this.indexLastCharacterIntroduced = setState.indexLastCharacterIntroduced;
            //Array of Character IDs to be practiced in future Sessions (Set.sessionCharacters[0] is for Session.id=1)
            this.sessionCharacters = setState.sessionCharacters;
            //Index of last Session completed
            this.idLastSessionCompleted = setState.idLastSessionCompleted;
            //Index of last session practiced
            this.idLastSessionPracticed = setState.idLastSessionPracticed;
            //Index of furthest nextSessionID
            this.furthestNextSessionID = setState.furthestNextSessionID;
        } else {
            //Set's Status (-1 locked, 0 ongoing, 1 completed)
            //this.status = -1;
            //Set's Character IDs (used to populate this.characters)
            this.characterIDs = Array.from({length: 100}, (v, i) => i + this.numOfCharacters * (setID-1));
            //Set's mastered Character IDs 
            this.masteredCharacterIDs = [];
            //Index of most recent Character introduced from Set.characters 
            this.indexLastCharacterIntroduced = -1;
            //Array of Character IDs to be practiced in future Sessions (Set.sessionCharacters[0] is for Session.id=1)
            this.sessionCharacters = [];
            //Index of last Session completed
            this.idLastSessionCompleted = 0;
            //Index of last session practiced
            this.idLastSessionPracticed = 0;
            //Index of furthest nextSessionID
            this.furthestNextSessionID = 0;
        }
    }

    //----------------------------------------------------------------
    updateStatus(status) {
        if (status === 'locked'){
            this.status = -1;
        } else if (status === 'ongoing'){
            this.status = 0;
        } else {
            this.status = 1;
        }
    }
    //----------------------------------------------------------------
    async getCharacters(app) {
        try {
            const characterDataObj = await axios(`${window.location.origin}/characters/${this.id}`);
            this.characters = characterDataObj.data.map((el) => {
                let level, favourite, nextSessionID;
                if(app.characterStates[el.characterID - 1]){
                    ({level, favourite, nextSessionID} = app.characterStates[el.characterID - 1]);
                } else {
                    ([level, favourite, nextSessionID] = [0, 0, 0]);
                }
                return new Character(el.characterID, el.symbol, el.pinYin, el.meaning, level, favourite, nextSessionID);
            }); 
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }

    //----------------------------------------------------------------
    updateCharacters(session) {
        let numMasteredSession = 0;
        session.characterRatings.forEach(el => {
            const characterID = el[0]; 
            const rating = el[1];

            //Update Character level
            if(this.characters[characterID -1].updateLevel(rating)){
                this.removeFromMasteredCharacterIDs(characterID);
            }

            //Update Character nextSessionID
            const nextSessionID = this.characters[characterID -1].updateNextSessionID(session.id);
            if (nextSessionID == 'random'){
                this.addToMasteredCharacterIDs(characterID);
                numMasteredSession++;
            };
            if ((nextSessionID !== 'random') && (nextSessionID > this.furthestNextSessionID)){
                this.furthestNextSessionID = nextSessionID;
            }
        });
        return numMasteredSession;
    }

    //----------------------------------------------------------------
    updateSessionCharacters(session) {
        session.characterRatings.forEach(el => {
            const characterID = el[0];
            const nextSessionID = this.characters[characterID -1].nextSessionID;
            if (!this.sessionCharacters[nextSessionID-1]){
                this.sessionCharacters[nextSessionID-1] = [characterID];
            } else {
                this.sessionCharacters[nextSessionID-1].push(characterID);
            }
        });
    }

    //----------------------------------------------------------------
    updateIndexLastCharacterIntroduced(session){
        this.indexLastCharacterIntroduced += session.introduceCharacters.length;
    }

    //----------------------------------------------------------------
    updateIdLastSessionPracticed(session){
        this.idLastSessionPracticed = session.id;
    }

    //----------------------------------------------------------------
    updateIdLastSessionCompleted(session){
        this.idLastSessionCompleted = session.id;
    }

    //----------------------------------------------------------------
    addToMasteredCharacterIDs(characterID){
        this.masteredCharacterIDs.push(characterID);
    }

    //----------------------------------------------------------------
    removeFromMasteredCharacterIDs(characterID){
        const index = this.masteredCharacterIDs.indexOf(characterID);
        this.masteredCharacterIDs.splice(index, 1);
    }

    //----------------------------------------------------------------
    checkSetCompleted(){
        let returnValue;
        this.idLastSessionCompleted === this.furthestNextSessionID ? returnValue = 1 : returnValue = 0;
        return returnValue;
    }
}