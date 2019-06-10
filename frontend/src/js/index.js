import App from './models/App';
import Set from './models/Set';
import Session from './models/Session';
import * as appView from './views/appView';
import * as sessionView from './views/sessionView';
import * as characterView from './views/characterView';
import { elements } from './views/base';
import axios from 'axios';

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
const controlApp = async () => {

    if(!state.app) {
        try{
            const userName = await axios(`${window.location.origin}/profile/info`);
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
        state.app = new App(); 
        await state.app.getAppState();
    }

    if(state.app.setStatus[0]===-1){
        state.app.setStatus[0] = 0;
    }  

    //Add popup (added here instead of HTML file to prevent it appearing for a secomd on load)
    const addPopup = 
        `<div class="popupMain" role="alert">
            <div class="popupMain__container">
                <div class="popupMain__message">
                    Are you sure you want to quit?
                </div>
                <div class="popupMain__buttons">
                    <button class="btn btn-popupQuit">Yes, Quit</button>
                    <button class="btn btn-popupRemain">No</button>
                </div>
            </div> 
        </div>`;

    document.querySelector('.app').insertAdjacentHTML('afterend', addPopup);

    //Render appropriate views based on URL
    const view = window.location.hash.replace('#', '');

    //Loop through nav items to highlight active page
    let navLink = document.querySelectorAll('.nav__link');

    navLink.forEach(el => {
        if(el.classList.contains('highlight')) {
            el.classList.remove('highlight');
        }
        if(el.getAttribute('href') == window.location.hash){
            el.classList.add('highlight');
        }
    });

    //Change views based on url
    if(view === ''){
        window.location.hash = '#practice';
    } else if (view === 'practice'){
        appView.renderPractice(state.app);
        document.querySelector('.popupSets').addEventListener('click', e => {
            if (e.target.closest('.btn-exitSetAlert')) {
                document.querySelector('.popupSets').classList.remove('is-visible');
            }
        });
    } else if (view === 'characters') {
        appView.renderCharacters();
    } else if (view === 'about') {
        appView.renderAbout();
    } else if (view.startsWith('set')){
        const res = view.split('-');
        //Check that Set is unlocked
        if(state.app.setStatus[res[1]-1]!==-1){
            controlSet(parseInt(res[1]));
        } 
        //***need page that says set isa locked */
    } else if (view === 'quit') {
        const data = {
            action: 'logout'
        }
        axios({
            method: 'post',
            url: `${window.location.origin}/user/logout`,
            data: data,
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            window.location = `${window.location.origin}/login`;
        }).catch( (error) => {
            alert('Something went wrong :(');
            console.log(error);
        });
    }

    //Event Listeners -------------------------------------------

    elements.appInner.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.closest('.set__icon')) {
            const id = e.target.closest('.set__icon').getAttribute('data-setid');
            console.log('id', id);
            if(state.app.setStatus[id-1] === 0){
                window.location.hash = `#set-${id}`;
            } else { 
                document.querySelector('.popupSets').classList.add('is-visible');
            }
        }
    });   

    document.querySelector('.navBar').addEventListener('click', e => {
        if (e.target.closest('.logout') && !state.session) {
            document.querySelector('.popupMain').classList.add('is-visible');
        } 
    });

    document.querySelector('.popupMain').addEventListener('click', e => {
        if (e.target.closest('.btn-popupQuit')) {
            e.preventDefault();
            window.location.hash = '#quit';
        } else if (e.target.closest('.btn-popupRemain')){
            e.preventDefault();
            document.querySelector('.popupMain').classList.remove('is-visible');
        }  
    });

}

/**
 * Set CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlSet = async (setID) => {

    if(!state.set || (state.set.id !== setID)){
        state.set = new Set(setID, state.app); 
        await state.set.getCharacters(state.app);
    }

    controlSession('beginSession')
}

/**
 * Character CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
const controlCharacter = (() => 
    
  ({
    removeCharacter: () => {
        characterView.clearCharacter();
    },

    renderNextCharacter: (index, length, task) => {
        //sessionView.updateCardFlag(index, length, task);
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
        
        //Render Template with general elements (to setup event listeners)
        sessionView.renderTemplate(state.set.id, state.session.id, 'setup');

        if (state.session.practiceCharacters.length !== 0){
            //Render Template for 'practice' Characters
            sessionView.renderTemplate(state.set.id, state.session.id, 'practice');

            //Event Listener
            document.querySelector('.card__ratingButtons').addEventListener('click', e => {
                event.preventDefault();

                if (e.target.closest('.btn-rating--cross') || e.target.closest('.btn-rating--line') || e.target.closest('.btn-rating--check')){
                    let elem = document.getElementById("myBar");   
                    let myString = elem.style.width;
                    let width = myString.slice(0, -1);
                    let newWidth = parseInt(width);
                    let interval = 100 / (state.session.practiceCharacters.length + state.session.introduceCharacters.length);
                    let reachWidth = newWidth + interval;
                    
                    var id = setInterval(frame, 10);
                
                    function frame() {
                        if (newWidth >= reachWidth) {
                            clearInterval(id);
                        } else {
                            newWidth++; 
                            elem.style.width = newWidth + '%'; 
                        }
                    }
                }
                
                if (e.target.closest('.btn-rating--cross')) {
                    controlSession('cross');
                } else if (e.target.closest('.btn-rating--line')) {
                    controlSession('line');
                } else if (e.target.closest('.btn-rating--check')) {
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

        //Event Listeners
        document.querySelector('.session__header').addEventListener('click', e => {
            if (e.target.closest('.btn-exitSession') && !state.session) {
                controlSession('endSession', 'home');
            } else if (e.target.closest('.btn-exitSession')) {
                event.preventDefault();
                document.querySelector('.popupSession').classList.add('is-visible');
                document.querySelector('.popupSession').setAttribute('data-linkid', 'practice');
            }
        });
    
        document.querySelector('.popupSession').addEventListener('click', e => {
            let navPage = document.querySelector('.navPage');           
            if (navPage.classList.contains('appear')) {
                navPage.classList.remove('appear');
            }

            if (e.target.matches('.btn-popupNo')){
                e.preventDefault();
                document.querySelector('.popupSession').classList.remove('is-visible');
            } else if (e.target.matches('.btn-popupYes')){
                e.preventDefault();
                const link = document.querySelector('.popupSession').getAttribute('data-linkid');
                controlSession('endSession', link);
            } 
        });

        var clickNav = (event) => {
            if (event.target.closest('.nav__link') && state.session) {
                const link = event.target.closest('.nav__link').getAttribute('data-linkid');
                event.preventDefault();
                document.querySelector('.popupSession').classList.add('is-visible');
                document.querySelector('.popupSession').setAttribute('data-linkid', link);
            }
        }
    
        document.querySelector('.navBar').addEventListener('click', clickNav);
        document.querySelector('.navBrand').addEventListener('click', clickNav);
        document.querySelector('.navPage').addEventListener('click', clickNav);
    } 

    //--------------------------------------------------------------------------------------------------------------------
    else if (task === 'introduceCharacters'){ 
        state.session.indexLastCharacterShown = -1;

        if (state.session.introduceCharacters.length != 0) {
            //Render Template for 'introduce' Character
            sessionView.renderTemplate(state.set.id, state.session.id, 'introduce');

            //Event Listeners
            document.querySelector('.card__ratingButtons').addEventListener('click', e => {
                event.preventDefault();
            
                if (e.target.matches('.btn-gotIt')) {
                    let elem = document.getElementById("myBar");   
                    let myString = elem.style.width;
                    let width = myString.slice(0, -1);
                    let newWidth = parseInt(width);
                    let interval = 100 / (state.session.practiceCharacters.length + state.session.introduceCharacters.length);
                    let reachWidth = newWidth + interval;
                    
                    var id = setInterval(frame, 10);
                
                    function frame() {
                        if (newWidth >= reachWidth) {
                            clearInterval(id);
                        } else {
                            newWidth++; 
                            elem.style.width = newWidth + '%'; 
                            //elem.innerHTML = newWidth * 1  + '%';
                        }
                    }
                    controlSession('gotIt');
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
        if((state.session.introduceCharacters.length === 0) && (state.session.practiceCharacters.length === 0)) {
            completed = 2;
        } else if(!state.set.checkSetCompleted()){
            completed = 0;
        } else {
            completed = 1;
            state.set.updateStatus('complete');
            state.app.setStatus[state.set.id - 1] = 1;
            //Unlock next set
            state.app.setStatus[state.set.id] = 0;
        }

        sessionView.renderSummaryCard(completed, numMasteredSession, state.set);
     
        //Save Set and Character states to App
        state.app.saveSetStates(state.set);
        state.app.saveCharacterStates(state.set);

        //Save App state to DB
        state.app.saveAppState();
        
        //Clear Session and Character states
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
    else if (task === 'endSession', nextStep){
        state.session = '';
        state.character = '';     
        sessionView.clearAppInnerUI();
        if (nextStep === 'next'){
            controlSession('beginSession');
        } else {
            document.querySelector('.navBar').removeEventListener('click', clickNav);
            if (nextStep === 'home') {
                window.location.hash = '#practice';
            } else if (nextStep === 'home' || nextStep === 'practice') {
                window.location.hash = '#practice';
            } else if (nextStep === 'characters') {
                window.location.hash = '#characters';
            } else if (nextStep === 'about') {
                window.location.hash = '#about';
            } else if (nextStep === 'logout') {
                window.location.hash = '#quit';
            }
        }
    }
}

/**
 * Event Listeners //////////////////////////////////////////////////////////////////////////////////////////////////////
 */
['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlApp));


let clickDelayTimer;
const handleNavPage = () => {
    let burger = document.querySelector('.burgerMenu__clickRegion');
    let navPage = document.querySelector('.navPage');
    burger.classList.toggle('active');
    navPage.classList.toggle('appear');

    if(!burger.classList.contains('active')) {
        burger.classList.add('closing');
    }

    clickDelayTimer = setTimeout(function () {
        burger.classList.remove('closing');
        clearTimeout(clickDelayTimer);
        clickDelayTimer = null;
    }, 500);
}

document.querySelector('.burgerMenu__clickRegion').addEventListener('click', function () {
    if((elements.appInner.offsetWidth < 700)  || document.querySelector('.burgerMenu__clickRegion').classList.contains('active')) {
        handleNavPage();
    }
});

document.querySelector('.navPage').addEventListener('click', e => {
    if (e.target.closest('.logout') && !state.session) {
        document.querySelector('.popupMain').classList.add('is-visible');
    } else if (e.target.closest('.nav__link') && !state.session) {
        handleNavPage();
    }
});


