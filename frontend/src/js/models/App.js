import axios from 'axios';

export default class App {

    constructor() {
        //States of all Sets in app (App.setStates[0] is for Set.id=1)
        this.setStates = [];
        //Status of all Sets in app (-1 locked, 0 ongoing, 1 completed)
        this.setStatus = new Array(25).fill(-1);
        //States of all Characters in app (App.characterStates[0] is for Character.id=1)
        this.characterStates = [];
    }

    //----------------------------------------------------------------
    saveSetStates(set){
        this.setStates[set.id - 1] = {
            id: set.id,
            status: set.status,
            characterIDs: set.characterIDs,
            masteredCharacterIDs: set.masteredCharacterIDs,
            indexLastCharacterIntroduced: set.indexLastCharacterIntroduced,
            sessionCharacters: set.sessionCharacters,
            idLastSessionCompleted: set.idLastSessionCompleted,
            idLastSessionPracticed: set.idLastSessionPracticed,
            furthestNextSessionID: set.furthestNextSessionID
        }
    }

    //----------------------------------------------------------------
    saveCharacterStates(set){
        set.characters.forEach(el => {
            this.characterStates[el.id - 1] = {
                level:set.characters[el.id - 1].level,
                favourite: set.characters[el.id - 1].favourite,
                nextSessionID: set.characters[el.id - 1].nextSessionID
            }
        });
    }

    //----------------------------------------------------------------
    saveAppState(){
        const data = {
            setStates: this.setStates,
            setStatus: this.setStatus,
            characterStates: this.characterStates
        }

        // Send a POST request
        axios({
            method: 'post',
            url: `${window.location.origin}/profile/app`,
            data: data,
            headers: { "Content-Type": "application/json" }

        }).then(function (response) {
       
            
        }).catch(function (error) {
            if(error.response){
        
            } else {
    
            }

        }); 
    }

    //----------------------------------------------------------------
    async getAppState(){
        try {
            const appDataObj = await axios.get(`${window.location.origin}/profile/app`);
            
            if(appDataObj.data[0]){
                const appData = appDataObj.data[0];
            
                this.setStates = appData.setStates;
                this.setStatus = appData.setStatus;
                this.characterStates = appData.characterStates;  
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }

        
    }      
}