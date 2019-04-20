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
    updateLevel(rating){
        //L1-8 
        let unMastered = 0;

        //Update Character level according to rating
        if (rating === 'cross' && this.level === 8){
            this.level = 1; 
            unMastered = 1;
        } else if(rating === 'line' && this.level === 8){
            this.level = 3; 
            unMastered = 1;
        } else if(rating === 'cross'){
            this.level = 1;    
        } else if(rating === 'line'){
            if(this.level >= 3) this.level = 3;
        } else if(rating === 'check' && this.level < 9){
            this.level++;
        } else if(rating === 'gotIt'){
            this.level = 1;
        }
        return unMastered;
    }

    //----------------------------------------------------------------
    updateNextSessionID(currentSessionID){
        //L1-L3: every session
        //L4: every 2 sessions
        //L5: every 5 sessions
        //L6: every 10 sessions
        //L7: every 20 sessions
        //L8-9: Mastered (random)

        if(this.nextSessionID === 0) this.nextSessionID = currentSessionID;

        switch (this.level){
            case 1:
            case 2:
            case 3:
            this.nextSessionID += 1;
                break;
            case 4:
            this.nextSessionID += 2;
                break;
            case 5:
                this.nextSessionID += 5;
                break;
            case 6:
                this.nextSessionID += 10;
                break;  
            case 7:
                this.nextSessionID += 20;  
                break;     
            case 8: 
                this.nextSessionID = 'random'; 
                break;
            case 9: 
                this.nextSessionID = 'random1';
        }
        return this.nextSessionID;
    }
}