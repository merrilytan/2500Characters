import { characterDataJSON } from '../data.js';
import Card from './Card';

export default class Deck {
    constructor(deckID) {
       
        //Assign deck's ID
        this.deckID = deckID;

        //Create array for deck's sessions
        this.deckSessions = [];

        //Create property to save index of last session shown
        this.IDLastSessionShown = 0;

        //Create property to save index of last card that has been introduced
        this.indexLastCardIntroduced = -1;

        //Set number of cards in a Deck
        this.numOfCards = 100;
    }

    //----------------------------------------------------------------
    createDeckCards() {
        const characterDataObj = JSON.parse(characterDataJSON).data;
        this.deckCards = characterDataObj.map((el, index) => {
            return new Card(el, index+1);
        });
    }

    //----------------------------------------------------------------
    updateDeckSessions(sessionToAddCard, cardToAdd) {
        //Add Card's index in deckCards to deckSessions
        this.deckSessions[sessionToAddCard] ? this.deckSessions[sessionToAddCard].push(cardToAdd) : this.deckSessions[sessionToAddCard]=[cardToAdd];
        console.log('deckSessions', this.deckSessions);
    }
}