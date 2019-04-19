import { characterDataJSON } from '../data.js';
import Character from './Character';
import axios from 'axios';

export default class Set {
    
    constructor(setID, app) {

        const setState = app.setStates[setID -1];

        //Set's ID
        this.id = setID;
        //Set's Character Data (temporarily stored)
        this.characters = this.getCharacters(app);
        //Num of Characters in a Set
        this.numOfCharacters = 100;

        if(setState){
            //Set's Status (-1 locked, 0 ongoing, 1 completed)
            this.status = setState.status;
            //Set's Character IDs (used to populate this.characters)
            this.characterIDs = setState.characterIDs;
            //Index of most recent Character introduced from Set.characters 
            this.indexLastCharacterIntroduced = setState.indexLastCharacterIntroduced;
            //Array of Character IDs to be practiced in future Sessions (Set.sessionCharacters[0] is for Session.id=1)
            this.sessionCharacters = setState.sessionCharacters;
            //Index of last Session completed
            this.idLastSessionCompleted = setState.idLastSessionCompleted;
            //Index of last session practiced
            this.idLastSessionPracticed = setState.idLastSessionPracticed;
        } else {
            //Set's Status (-1 locked, 0 ongoing, 1 completed)
            this.status = -1;
            //Set's Character IDs (used to populate this.characters)
            this.characterIDs = Array.from({length: 100}, (v, i) => i + this.numOfCharacters * (setID-1));
            //Index of most recent Character introduced from Set.characters 
            this.indexLastCharacterIntroduced = -1;
            //Array of Character IDs to be practiced in future Sessions (Set.sessionCharacters[0] is for Session.id=1)
            this.sessionCharacters = [];
            //Index of last Session completed
            this.idLastSessionCompleted = 0;
            //Index of last session practiced
            this.idLastSessionPracticed = 0;
        }
    }

    //----------------------------------------------------------------
    getCharacters(app) {
        const characterDataObj = JSON.parse(characterDataJSON).data;

        const characters = characterDataObj.map((el) => {
            let level, favourite, nextSessionID;
            if(app.characterStates[el.characterID - 1]){
                ({level, favourite, nextSessionID} = app.characterStates[el.characterID - 1]);
            } else {
                ([level, favourite, nextSessionID] = [0, 0, 0]);
            }
            return new Character(el.characterID, el.symbol, el.pinYin, el.meaning, level, favourite, nextSessionID);
        }); 

        return characters;

        //this.characters = JSON.parse(characterDataJSON).data;
        
        // try {
        //     this.characters = await axios(`http://localhost:27017/characters/get-set/${setID}`);

        //     //const characterDataObj = await axios(`http://localhost:27017/characters/get-deck/${deckID}`);
        //     /* console.log('characterDataObj', characterDataObj.data);
        //     this.deckCards = characterDataObj.data.map((el, index) => {
        //         return new Card(el, index+1);
        //     }); */

        // } catch (error) {
        //     console.log(error);
        //     alert('Something went wrong :(');
        // }

        //        await this.getCharacters()
        //     .then(val => {
        //         this.characters = val 
        //     })
        //     .catch(err => {
        //         alert('Error retrieving Character data from database!')
        //         console.log(err);
        //     });

        // console.log(this.characters);
    }

    //----------------------------------------------------------------
    updateCharacters(session) {
        session.characterRatings.forEach(el => {
            const characterID = el[0]; 
            const rating = el[1];
            this.characters[characterID -1].updateLevel(rating);
            this.characters[characterID -1].updateNextSessionID(session.id);
            console.log(characterID, ':', rating, ':', this.characters[characterID -1].level, ':', this.characters[characterID -1].nextSessionID);
        });
    }

    //----------------------------------------------------------------
/*     updateSessionCharacters(sessionToAddCharacter, characterToAdd) {
        //Add Card's index in deckCards to deckSessions
        this.sessionCharacters[sessionToAddCharacter] ? this.sessionCharacters[sessionToAddCharacter].push(characterToAdd) : this.sessionCharacters[sessionToAddCharacter]=[characterToAdd];
    } */

    //----------------------------------------------------------------
    updateSessionCharacters(session) {
        console.log('session.characterRatings', session.characterRatings);
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
}