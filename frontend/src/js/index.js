import Deck from './models/Deck';
import Session from './models/Session';
import * as appView from './views/appView';
import * as sessionView from './views/sessionView';
import * as cardView from './views/cardView';
import { elements } from './views/base';

/** DEV App Notes 
 * Each time Start Session OR Characters accessed, make API call to server for info
*/

/** App Notes
 *  - Each Deck contains 100 Cards numbered 1 onwards
 *  - Each Deck contains Sessions numbered 1 onwards
 *  - 5 new Cards are introduced at each Session until all 100 Cards in set has been introduced
 */

/** Global state of the app -------------------------------------------------------
 *  - App object
 *  - Deck object
 *  - Session object
 *  - Card object
 */

const state = {};

/**
 * App CONTROLLER -------------------------------------------------------
 */
const controlApp = (event) => {

    const view = window.location.hash.replace('#', '');

    console.log('view', view);

    if(view === 'learn'){
      appView.renderLearn();
    } else if (view === 'characters') {

    } else if (view === 'favourites') {

    } else if (view.startsWith('session')){
        const id = view.split('-');
        controlDeck(id[1]);
    }
}

/**
 * Deck CONTROLLER -------------------------------------------------------
 */
const controlDeck = (id) => {

    if(!state.deck) {
      //1. Create new Deck
      state.deck = new Deck(id);

      //2. Get Character Data and create cards in Deck
      state.deck.createDeckCards();
    }

    controlSession('beginSession');
}

/**
 * CARD CONTROLLER -------------------------------------------------------
 */
const controlCard = (() => 
    
  ({
    updateCard: (result) => {
      //Update Card's level 
      state.card.updateLevel(result);
      //Update Card's nextSession
      return state.card.updateNextSession(state.session.sessionID);
    },
    removeCard: () => {
      cardView.clearCard();
    },
    renderNextCard: (index, length, task) => {
      sessionView.updateCardNumber(index, length, task);
      if (task === 'renderNextSessionCard'){
        cardView.renderCard(state.card);
      } else if (task === 'renderNextIntroducedCard'){
        cardView.renderNewCard(state.card);
      }
    }
  })
)();

/**
 * SESSION CONTROLLER -------------------------------------------------------
 */

const controlSession = (task, nextStep) => {

  if (task === 'beginSession'){
      //Create new Session
      if(state.deck.IDLastSessionShown === state.deck.IDLastSessionCompleted){
        state.session = new Session(state.deck.IDLastSessionCompleted+1);
        state.deck.IDLastSessionShown = state.session.sessionID;
      
        //Add cards saved in state.deck.deckSessions
        if (state.session.sessionID != 1) {
          state.session.addDeckSessionCards(state.deck.deckCards, state.deck.deckSessions[state.session.sessionID]);
        }
      }
      //Render Session Template
      sessionView.renderSessionTemplate(state.session.sessionID);

      if (state.session.sessionCards.length !== 0){
        //Render result buttons in UI
        sessionView.renderResultButtons();

        //Render first card
        controlSession('renderNextSessionCard');
      } else {
        controlSession('introduceCards');
      }

      document.querySelector('.card__resultButtons').addEventListener('click', e => {
        event.preventDefault();
      
        if (e.target.matches('.btn-result--cross')) {
          controlSession('cross');
        } else if (e.target.matches('.btn-result--line')) {
          controlSession('line');
        } else if (e.target.matches('.btn-result--check')) {
          controlSession('check');
        } else if (e.target.matches('.btn-gotIt')) {
          controlSession('gotIt');
        } 
      }); 

      document.querySelector('.card__face--front').addEventListener('click', e => {
        if (e.target.closest('.btn-showAnswer')) {
          event.preventDefault();
          document.querySelector('.btn-showAnswer').classList.add('disappear');
          document.querySelector('.card__inner__answer__showAnswer').classList.add('appear');
        }
      });       
    
  } else if (task === 'renderNextSessionCard' || task === 'renderNextIntroducedCard') {
      let length, cardSet, action;

      if (task === 'renderNextSessionCard'){
        length =  state.session.sessionCards.length;
        cardSet = state.session.sessionCards;
        action = 'introduceCards';
      } else if (task === 'renderNextIntroducedCard'){
        length =  state.session.sessionIntroducedCards.length;
        cardSet = state.session.sessionIntroducedCards;
        action = 'renderSummary';
      }

      state.card = state.session.getNextCard(length, cardSet);

      if (state.card) {
        //Render Next Session Card
        controlCard.renderNextCard(state.session.indexLastCardShown, length, task);
      } else {
        controlSession(action);
      }

  } else if (task === 'cross' || task === 'line' || task === 'check' || task === 'gotIt') {
      //Update Card's data 
      const nextSession = controlCard.updateCard(task);

      //Update Deck's deckSessions
      console.log('next session', nextSession, 'state.card.cardID-1', state.card.cardID-1);
      state.deck.updateDeckSessions(nextSession, state.card.cardID-1);

      //Clear card from UI
      controlCard.removeCard();
      if (task === 'cross' || task === 'line' || task === 'check') {
        //Get Next Card
        controlSession('renderNextSessionCard');
      } else {
        //Get Next Card
        controlSession('renderNextIntroducedCard');       
      }

  } else if (task === 'introduceCards'){
      state.session.indexLastCardShown = -1;
      // Introduce new cards
      state.deck.indexLastCardIntroduced = state.session.addNewCards(state.deck.deckCards, state.deck.indexLastCardIntroduced, state.deck.numOfCards);
      if (state.session.sessionIntroducedCards.length != 0) {
        // Remove result buttons and replace with got it button
        sessionView.renderGotItButton();
        // Remove NumberInSetFlag
        sessionView.removeNumberInSetFlag();
        // Add new card flag + Change card number color
        sessionView.addNewCardFlag();
        //Render first card
        controlSession('renderNextIntroducedCard');
      }

  } else if (task === 'renderSummary'){     
    sessionView.renderSummaryCard();
    state.deck.IDLastSessionCompleted++;
    state.session = '';
    state.card = '';
    document.querySelector('.card__face--back').addEventListener('click', e => {
      if (e.target.matches('.btn-nextSession')) {
        controlSession('endSession', 'next');
      } else if (e.target.matches('.btn-home')) {
        controlSession('endSession', 'home');
      }
    });    

  } else if (task === 'endSession', nextStep){     
    sessionView.clearSessionUI();
    if (nextStep === 'next'){
      controlSession('beginSession');
    } else if (nextStep === 'home') {
      window.location.hash = '#learn';
    }
  }
}

document.querySelector('.wrapper').addEventListener('click', e => {
  if (e.target.closest('.btn-startSession')) {
    const id = e.target.getAttribute('data-itemid');
    window.location.hash = `#session-${id}`;
  }
});   

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlApp));

document.querySelector('.wrapper').addEventListener('click', e => {
  if (e.target.matches('.btn-exitSession') && !state.session) {
    controlSession('endSession', 'home');
  } else if (e.target.matches('.btn-exitSession')) {
    event.preventDefault();
    document.querySelector('.cd-popup').classList.add('is-visible');
  } else if (e.target.matches('.btn-exitSessionExitAlert') || e.target.matches('.btn-popupNo')){
    event.preventDefault();
    document.querySelector('.cd-popup').classList.remove('is-visible');
  } else if (e.target.matches('.btn-popupYes')){
    event.preventDefault();
    controlSession('endSession', 'home');
  } 
});

document.querySelector('.navbar').addEventListener('click', e => {
  if ((e.target.matches('.nav-link') || e.target.matches('.navbar-brand')) && state.session) {
    event.preventDefault();
    document.querySelector('.cd-popup').classList.add('is-visible');
  }
});



