export default class App {

    constructor(userID) {
        //App's ID
        this.id = userID;
        
        const result = 0;

        if(result){
            //States of all Sets in app (App.setStates[0] is for Set.id=1)
            this.setStates = result.setStates;
            //States of all Characters in app (App.characterStates[0] is for Character.id=1)
            this.characterStates = result.characterStates;
        } else {
            //States of all Sets in app (App.setStates[0] is for Set.id=1)
            this.setStates = [];
            //States of all Characters in app (App.characterStates[0] is for Character.id=1)
            this.characterStates = [];
        }
    }

    //----------------------------------------------------------------
    // saveSetStates(set) {
    //     this.setStates[set.id - 1] = set;
    // }
}