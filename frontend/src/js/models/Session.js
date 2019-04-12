export default class Session {
    constructor(sessionID) {

        //Assign session's ID
        this.sessionID = sessionID;

        //Create array for session's cards
        this.sessionCards = [];

        //Create array for introduced cards
        this.sessionIntroducedCards = [];

        //Create property to save index of last card shown
        this.indexLastCardShown = -1;

        //Set number of cards to introduce at each session
        this.numOfCardsIntroduce = 5;

         //Create property to track if session shown previously
         this.shownAlready = 0;
    }

    //----------------------------------------------------------------
    addDeckSessionCards(deckCards, deckSession) {
        if(deckSession){
            deckSession.forEach(el => {
                this.sessionCards = [...this.sessionCards, ...deckCards.slice(el, el+1)];
            });
        }
    }

    //----------------------------------------------------------------
    addNewCards(deckCards, indexLastCardIntroduced, numOfDeckCards) {
        //Add unintroduced cards to session by copying cards from deckCards
        if(indexLastCardIntroduced <= numOfDeckCards-1) {
            let start, end;
        
            //Determine start index to copy from deckCards
            indexLastCardIntroduced === -1 ? start = 0 : start = (indexLastCardIntroduced + 1);
            
            //Determine end index to copy from deckCards
            indexLastCardIntroduced <= numOfDeckCards - 5 ? end = (start + 5) : end = (numOfDeckCards - indexLastCardIntroduced);

            //Copy array from start to end, and push to sessionCards
            const cardsToAdd = deckCards.slice(start, end);
            this.sessionIntroducedCards = [...this.sessionIntroducedCards, ...cardsToAdd];

            return end - 1;
        }
    }

    //----------------------------------------------------------------
    getNextCard(length, cardSet) {
        let returnValue;

        if(this.indexLastCardShown + 1 < length){
            this.indexLastCardShown++;
            returnValue = cardSet[this.indexLastCardShown];
        } else {
            returnValue = 0;
        }
        return returnValue;
    }

}