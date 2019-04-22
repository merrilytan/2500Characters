export default class App {

    constructor(userID) {
        const result = 0;

        if(result){
            //States of all Sets in app (App.setStates[0] is for Set.id=1)
            this.setStates = result.setStates;
            //Status of all Sets in app (-1 locked, 0 ongoing, 1 completed)
            this.setStatus = result.setStatus;
            //States of all Characters in app (App.characterStates[0] is for Character.id=1)
            this.characterStates = result.characterStates;
        } else {
            //States of all Sets in app (App.setStates[0] is for Set.id=1)
            this.setStates = [];
            //Status of all Sets in app (-1 locked, 0 ongoing, 1 completed)
            this.setStatus = new Array(25).fill(-1);
            //States of all Characters in app (App.characterStates[0] is for Character.id=1)
            this.characterStates = [];
        }
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
                meaning: set.characters[el.id - 1].meaning,
                level:set.characters[el.id - 1].level,
                favourite: set.characters[el.id - 1].favourite,
                nextSessionID: set.characters[el.id - 1].nextSessionID
            }
        });
    }

    //----------------------------------------------------------------
    saveAppState(){
        //const characterDataObj = await axios(`http://localhost:27017/characters/${this.id}`);

        // Send a POST request
        axios({
            method: 'post',
            url: `${window.location.origin}/`,
            data: data,
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            document.querySelector('.message').innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    You are registered and can now log in!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            
        }) .catch(function (error) {
            if(error.response){
                document.querySelector('.message').innerHTML = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${error.response.data.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
            } else {
                document.querySelector('.message').innerHTML = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        Something went wrong :(
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
            }


        }); 
    }
}