import App from './models/App';
import Set from './models/Set';
import Session from './models/Session';
import Character from './models/Character';
import * as appView from './views/appView';
import * as sessionView from './views/sessionView';
import * as characterView from './views/characterView';
import { elements } from './views/base';

/** App Notes
 *  - Each Set contains 100 Characters
 *  - Each Set contains Sessions numbered 1 onwards
 *  - 5 new Characters are introduced at each Session until all 100 Characters in Set has been introduced
 */

/** Global state of the app 
 *  - App object
 *  - Set object
 *  - Session object
 *  - Character object
 */

const state = {};

/**
 * App CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlApp = async (userID) => {
  
    if(!state.app) {
        userID = 1;
        state.app = new App(userID); 
    }

    if(state.app.setStatus[0]===-1){
        state.app.setStatus[0] = 0;

    }  

    console.log('state.app', state.app);

    //Render appropriate views based on URL
    const view = window.location.hash.replace('#', '');

    if(view === ''){
        window.location.hash = '#practice';
    } else if (view === 'practice'){
        appView.renderPractice();
    } else if (view === 'characters') {

    } else if (view === 'about') {

    } else if (view.startsWith('set')){
        const res = view.split('-');
        //Check that Set is unlocked
        if(state.app.setStatus[res[1]-1]!==-1){
            controlSet(res[1]);
        }
        //***need page that says set isa locked */
    }

    elements.appInner.addEventListener('click', e => {
        if (e.target.closest('.btn-startSession')) {
          const id = e.target.getAttribute('data-itemid');
          window.location.hash = `#set-${id}`;
        }
    });   
}

/**
 * Set CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlSet = async (setID) => {

    /* //TESTING PURPOSES
        state.app.setStates[setID -1] = {
        //Set's Status (-1 locked, 0 ongoing, 1 completed)
        status: 5,

        //Set's Character IDs (used to populate this.characters)
        characterIDs: [0,3],

        //Set's Character Data (temporarily stored)
        characters: [],

        //Index of most recent Character introduced from Set.characters 
        indexLastCharacterIntroduced: -1,

        //Array of Character IDs to be practiced in future Sessions (Set.sessionCharacters[0] is for Session.id=1)
        sessionCharacters: [],

        //Index of last Session completed
        idLastSessionCompleted: 100,

        //Index of last session practiced
        idLastSessionPracticed: 0
    } 
    */
   
    /*  TESTINGPURPOSES 
        state.app.characterStates[0] = {
        level: 100,
        favourite: 100,
        nextSessionID: 100
        } */

    state.set = new Set(setID, state.app); 
    await state.set.getCharacters(state.app);
    console.log('state.set', state.set);

/*         try {
            //Retrieve data from API to create state.set.characters
            await state.set.getCharacters(id);
        } catch (err) {
            console.log(err);
            alert('Error creating set!');
        }
    } */

    controlSession('beginSession');
}

/**
 * Character CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlCharacter = (() => 
    
  ({
    // updateCharacter: (result) => {
    //     console.log('shhh', state.character);
    //     //Update Characters level in state.app.characterStates
    //     state.app.characterStates[state.character.id-1].updateLevel(result);
    //     //Update Character's nextSessionID
    //     return state.app.characterStates[state.character.id-1].updateNextSessionID(state.session.id);
    // },

    removeCharacter: () => {
        characterView.clearCharacter();
    },

    renderNextCharacter: (index, length, task) => {
        sessionView.updateCardFlag(index, length, task);
        if (task === 'renderNextPracticeCharacter'){
            characterView.renderCharacter(state.character, 'practice');
        } else if (task === 'renderNextIntroduceCharacter'){
            characterView.renderCharacter(state.character, 'introduce');
        }
    }
  })
)();

/**
 * Session CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlSession = (task, nextStep) => {

    if (task === 'renderNextPracticeCharacter' || task === 'renderNextIntroduceCharacter') {
        let length, characterIDs, action;

        if (task === 'renderNextPracticeCharacter'){
            length =  state.session.practiceCharacters.length;
            characterIDs = state.session.practiceCharacters;
            action = 'introduceCharacters';
        } else if (task === 'renderNextIntroduceCharacter'){
            length =  state.session.introduceCharacters.length;
            characterIDs = state.session.introduceCharacters;
            action = 'saveProgress';
        }

        state.character = state.session.getNextCharacter(length, characterIDs, state.set);

        if (state.character) {
            //Render Next Session Character
            controlCharacter.renderNextCharacter(state.session.indexLastCharacterShown, length, task);
        } else {
            controlSession(action);
        }
    } 
    
    //--------------------------------------------------------------------------------------------------------------------
    else if (task === 'cross' || task === 'line' || task === 'check' || task === 'gotIt') {

        //Clear Character from UI
        controlCharacter.removeCharacter();

        //Save Character rating
        state.session.saveCharacterRating(state.character, task);

        if (task === 'cross' || task === 'line' || task === 'check') {
            controlSession('renderNextPracticeCharacter');
        } else if (task === 'gotIt') {
            controlSession('renderNextIntroduceCharacter');       
        }
    } 

    //--------------------------------------------------------------------------------------------------------------------
    else if (task === 'beginSession'){

        //Create new Session 
        state.session = new Session(state.set.idLastSessionCompleted+1, state.set);
        state.set.updateIdLastSessionPracticed(state.session);
        //console.log('state.session', state.session);
        
        //Render Template with general elements (to setup event listeners)
        sessionView.renderTemplate(state.session.id, 'setup');

        if (state.session.practiceCharacters.length !== 0){
            //Render Template for 'practice' Characters
            sessionView.renderTemplate(state.session.id, 'practice');

            //Event Listener
            document.querySelector('.card__ratingButtons').addEventListener('click', e => {
                event.preventDefault();
            
                if (e.target.matches('.btn-rating--cross')) {
                    controlSession('cross');
                } else if (e.target.matches('.btn-rating--line')) {
                    controlSession('line');
                } else if (e.target.matches('.btn-rating--check')) {
                    controlSession('check');
                }
            });

            document.querySelector('.card__face--front').addEventListener('click', e => {
                if (e.target.closest('.btn-showAnswer')) {
                    event.preventDefault();
                    document.querySelector('.btn-showAnswer').classList.add('disappear');
                    document.querySelector('.card__inner__answer__showAnswer').classList.add('appear');
                }
            });   

            //Render first 'practice' Character
            controlSession('renderNextPracticeCharacter');

        } else {
            controlSession('introduceCharacters');
        }
    } 

    //--------------------------------------------------------------------------------------------------------------------
    else if (task === 'introduceCharacters'){ 
        state.session.indexLastCharacterShown = -1;

        if (state.session.introduceCharacters.length != 0) {
            //Render Template for 'introduce' Character
            sessionView.renderTemplate(state.session.id, 'introduce');

            //Event Listeners
            document.querySelector('.card__ratingButtons').addEventListener('click', e => {
                event.preventDefault();
            
                if (e.target.matches('.btn-gotIt')) {
                    controlSession('gotIt');
                } 
            });

            document.querySelector('.session-header').addEventListener('click', e => {
                if (e.target.matches('.btn-exitSession') && !state.session) {
                    controlSession('endSession', 'home');
                } else if (e.target.matches('.btn-exitSession')) {
                    event.preventDefault();
                    document.querySelector('.cd-popup').classList.add('is-visible');
                }
            });
        
            document.querySelector('.cd-popup').addEventListener('click', e => {
                if (e.target.matches('.btn-exitSessionExitAlert') || e.target.matches('.btn-popupNo')){
                    event.preventDefault();
                    document.querySelector('.cd-popup').classList.remove('is-visible');
                } else if (e.target.matches('.btn-popupYes')){
                    event.preventDefault();
                    controlSession('cancelSession');
                } 
            });
        
            document.querySelector('.navbar').addEventListener('click', e => {
                if ((e.target.matches('.nav-link') || e.target.matches('.navbar-brand')) && state.session) {
                event.preventDefault();
                document.querySelector('.cd-popup').classList.add('is-visible');
                }
            });

            //Render first 'introduce' Character
            controlSession('renderNextIntroduceCharacter');

        } else {
            controlSession('saveProgress');
        }
    }

    //--------------------------------------------------------------------------------------------------------------------
    else if (task === 'saveProgress'){

        //Update state.set.characters
        const numMasteredSession = state.set.updateCharacters(state.session);

        //Update state.session.sessionCharacters
        state.set.updateSessionCharacters(state.session);

        //Update state.set.indexLastCharacterIntroduced
        state.set.updateIndexLastCharacterIntroduced(state.session);

        //Update last session completed
        state.set.updateIdLastSessionCompleted(state.session);

        //Check if end of set and render appropriate summary card
        let completed;
        if(!state.set.checkSetCompleted()){
            completed = 0;

        } else {
            completed = 1;
            state.set.updateStatus('complete');
            state.app.setStatus[state.set.id - 1] = 1;
            //Unlock next set
            state.app.setStatus[state.set.id] = 0;
        }

        sessionView.renderSummaryCard(completed, numMasteredSession, state.set);
        console.log('progress state.set', state.set);

        
        //Save Set and Character states to App
        state.app.saveSetStates(state.set);
        state.app.saveCharacterStates(state.set);

        console.log('progress state.app', state.app);
        
        state.session = '';
        state.character = '';

        document.querySelector('.card__face--back').addEventListener('click', e => {
            if (e.target.matches('.btn-nextSession')) {
                controlSession('endSession', 'next');
            } else if (e.target.matches('.btn-home')) {
                controlSession('endSession', 'home');
            }
        }); 
    } 

    //--------------------------------------------------------------------------------------------------------------------
    else if (task === 'cancelSession'){     
        //Rollback state.set.indexLastCharacterIntroduced
        state.set.indexLastCharacterIntroduced -= state.session.introduceCharacters.length;
        state.session = '';
        state.character = '';
        controlSession('endSession', 'home');
    }

    //--------------------------------------------------------------------------------------------------------------------
    else if (task === 'endSession', nextStep){     
        sessionView.clearAppInnerUI();
        console.log('end state.app', state.app);
        if (nextStep === 'next'){
            controlSession('beginSession');
        } else if (nextStep === 'home') {
            state.session = '';
            window.location.hash = '#practice';
        } 
    }
}

/**
 * Event Listeners //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlApp));