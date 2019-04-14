export default class App {
    constructor() {
        //Property to save lastUnlockedDeck (current Deck)
        //this.lastUnlockedDeck = 0;

        //Array for app's deck states
        this.appDecksStates = [];

        //Array for app's deck status (-1 locked, 0 ongoing, 1 mastered)
        this.appDecksStatus = [];

        //Array for character status (0 ongoing, 1 mastered)
        this.appCharacterStatus = [];
        
        //Array for favourite words
        this.appFavoriteCharacters = [];
    }

    //----------------------------------------------------------------
    saveDeckStatus(deck) {
        
    }
}