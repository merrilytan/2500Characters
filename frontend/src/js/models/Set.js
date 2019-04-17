import { characterDataJSON } from '../data.js';
import axios from 'axios';

export default class Set {
    constructor(setID, setState) {
       
        //Set's ID --------------------------------------------------------------------------------------------------- 
        this.id = setID;

        //Retrieve Set data if it was previously saved in app.setStates ---------------------------------------------- 
        if(setState){
            //Set's Status (-1 locked, 0 ongoing, 1 completed)
            this.status = setState.status;

            //Set's Character IDs (used to populate this.characters)
            this.characterIDs = setState.characterIDs;

            //Set's Character Data (temporarily stored)
            this.characters = setState.characters;

            //Index of most recent Character introduced from Set.characters 
            this.indexLastCharacterIntroduced = setState.indexLastCharacterIntroduced;

            //Array of Character IDs to be practiced in future Sessions (Set.sessionCharacters[0] is for Session.id=1)
            this.sessionCharacters = setState.sessionCharacters;

            //Index of last Session completed
            this.idLastSessionCompleted = setState.idLastSessionCompleted;

            //Index of last session practiced
            this.idLastSessionPracticed = setState.idLastSessionPracticed;

        }
        //Create new Set as Set data has not been previously saved in app.setStates ------------------------------------
        else {
            //Set's Status (-1 locked, 0 ongoing, 1 completed)
            this.status = -1;

            //Set's Character IDs (used to populate this.characters)
            this.characterIDs = [];

            //Set's Character Data (temporarily stored)
            this.characters = [];

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
    /* async getCharacters(setID) {

        const characterDataObj = JSON.parse(characterDataJSON).data;
       
        this.characters = characterDataObj.data.map((el) => {
            return new Character(el.characterID, el.symbol, el.pinYin, el.meaning);
        }); 
 */
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
  //  }

    //----------------------------------------------------------------
    updateSessionCharacters(sessionToAddCharacter, characterToAdd) {
        //Add Card's index in deckCards to deckSessions
        this.sessionCharacters[sessionToAddCharacter] ? this.sessionCharacters[sessionToAddCharacter].push(characterToAdd) : this.sessionCharacters[sessionToAddCharacter]=[characterToAdd];
    }
}