export default class Character {
    constructor(characterID, symbol, pinYin, meaning, level, favourite, nextSessionID) {
        this.id = characterID;
        this.symbol = symbol;
        this.pinYin = pinYin;
        this.meaning = meaning;
        this.level = level;
        this.favourite = favourite;
        this.nextSessionID = nextSessionID;
    }

    //----------------------------------------------------------------
    updateLevel(result){
        //L1-8 

        //Update Card level according to result
        if(result === 'cross'){
            this.level = 1;
            //console.log('Level: ', this.level, 'Next Session: ', this.nextSessionID);
        } else if(result === 'line'){
            if(this.level >= 3) this.level = 3;
            //console.log('Level: ', this.level, 'Next Session: ', this.nextSessionID);
        } else if(result === 'check'){
            this.level = this.level++;
            //console.log('Level: ', this.level, 'Next Session: ', this.nextSessionID);
        } else if(result === 'gotIt'){
            this.level = 1;
        }
    }

    //----------------------------------------------------------------
    updateNextSessionID(currentSessionID){
        //L1-L3: every session
        //L4: every 2 sessions
        //L5: every 5 sessions
        //L6: every 10 sessions
        //L7: every 20 sessions
        //L8: Mastered (random)

        //if(this.nextSessionID === 0) this.nextSessionID = currentSessionID;

        let numberSessionsToSkip;

        switch (this.level){
            case 1:
            case 2:
            case 3:
                numberSessionsToSkip = 1;
                break;
            case 4:
                numberSessionsToSkip = 2;
                break;
            case 5:
                numberSessionsToSkip = 5;
                break;
            case 6:
                numberSessionsToSkip = 10;
                break;  
            case 7:
                numberSessionsToSkip = 20;                
        }

        return this.nextSessionID += numberSessionsToSkip;
    }
}