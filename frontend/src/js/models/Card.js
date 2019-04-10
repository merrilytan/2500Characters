export default class Card {
    constructor(characterDataObj, cardID) {
        this.symbol = characterDataObj.symbol;
        this.pinYin = characterDataObj.pinYin;
        this.meaning = characterDataObj.meaning;
        this.level = 0;
        this.nextSession = 0;
        this.cardID = cardID;
    }

    //----------------------------------------------------------------
    updateLevel(result){
        //L0-8 ; Unintroduced cards are L0

        //Update Card level according to result
        if(result === 'cross'){
            this.level = 1;
            //console.log('Level: ', this.level, 'Next Session: ', this.nextSession);
        } else if(result === 'line'){
            if(this.level >= 3) this.level = 3;
            //console.log('Level: ', this.level, 'Next Session: ', this.nextSession);
        } else if(result === 'check'){
            this.level = this.level++;
            //console.log('Level: ', this.level, 'Next Session: ', this.nextSession);
        } else if(result === 'gotIt'){
            this.level = 1;
        }
    }

    //----------------------------------------------------------------
    updateNextSession(currentSessionID){
        //L0: unintroduced card
        //L1-L3: every session
        //L4: every 2 sessions
        //L5: every 5 sessions
        //L6: every 10 sessions
        //L7: every 20 sessions
        //L8: Mastery (random)

        if(this.nextSession === 0) this.nextSession = currentSessionID;

        let sessionsToAdd;

        switch (this.level){
            case 1:
            case 2:
            case 3:
                sessionsToAdd = 1;
                break;
            case 4:
                sessionsToAdd = 2;
                break;
            case 5:
                sessionsToAdd = 5;
                break;
            case 6:
                sessionsToAdd = 10;
                break;  
            case 7:
                sessionsToAdd = 20;                
        }

        return this.nextSession += sessionsToAdd;
    }
}