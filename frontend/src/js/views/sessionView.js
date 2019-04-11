import { elements } from './base';

//-------------------------------------------------------------
export const addNewCardFlag = () => {
    document.querySelector('.card__flag').classList.add('card__flag--newCard');
}

//-------------------------------------------------------------
export const removeNumberInSetFlag = () => {
    document.querySelector('.card__flag').classList.toggle('card__flag--numberInSet');
}

//-------------------------------------------------------------
export const clearSessionUI = () => {
    document.querySelector('.wrapper').innerHTML = '';
};

//-------------------------------------------------------------
export const renderGotItButton = () => {
    const markup = `    
        <button class="btn btn-gotIt">got it</a> 
    `;
    document.querySelector('.card__resultButtons').innerHTML = markup;
};

//-------------------------------------------------------------
export const renderResultButtons = () => {
    const markup = ` 
        <div class="card__resultButtons__container">
            <button class="btn btn-result btn-result--cross">&#10006;</a>
            <button class="btn btn-result btn-result--line">&#9866</a>
            <button class="btn btn-result btn-result--check">&#10004;</a>
        </div> 
    `;

    document.querySelector('.card__resultButtons').innerHTML = markup;
};

//-------------------------------------------------------------
export const renderSessionTemplate = (sessionID) => {
    const markup = `
        <div class="session-header">
            SESSION ${sessionID}
            <button class="btn-exitSession">&#10006;</button>
        </div>
        <div class="scene">
            <div class="card">
                <div class="card__face card__face--front">
                </div>
                <div class="card__flag card__flag--numberInSet">
                </div> 
                <div class="card__resultButtons">
                </div> 
                <div class="card__face card__face--back">
                </div>
            </div>
        </div>
        <div class="cd-popup" role="alert">
            <div class="cd-popup-container">
                <div class="cd-message">
                    This session's progress won't be saved at exit. &nbspAre you sure you want to exit this session?
                </div>
                <div class="cd-buttons">
                    <button class="btn btn-popupYes">Yes, Exit</button>
                    <button class="btn btn-popupNo">No, Return to Session</button>
                </div>
                <button class="btn-exitSessionExitAlert">&#10006;</button>
                <!--<a href="#0" class="cd-popup-close img-replace">Close</a>-->
            </div> <!-- cd-popup-container -->
        </div> <!-- cd-popup -->
    `;
    elements.wrapper.innerHTML = markup;
};

//-------------------------------------------------------------
export const renderSummaryCard = () => {
    document.querySelector('.card__flag').parentElement.removeChild(document.querySelector('.card__flag'));
    document.querySelector('.card__resultButtons').parentElement.removeChild(document.querySelector('.card__resultButtons'));
    document.querySelector('.card').classList.add('flipped');
    
    document.querySelector('.card__face--back').innerHTML = `
        <div class="summaryHeader">Session Completed!</div>
        <div class="summary__inner">
            <div class="summaryLine"><div class="summaryDesc">Currently learning:</div><div class="summaryNum">5</div></div>
            <div class="summaryLine"><div class="summaryDesc">Mastered in session:</div><div class="summaryNum">5</div></div>
            <div class="summaryLine"><div class="summaryDesc">Mastered in deck:</div><div class="summaryNum">5/100</div></div>
            <div class="summaryLine"><div class="summaryDesc">Mastered in total:</div><div class="summaryNum">5</div></div>
        </div>
        <div class="summary__buttons">
            <button class="btn btn-home">Home</button>
            <button class="btn btn-nextSession">Start Next Session</button>
        </div>
    `;
};

//-------------------------------------------------------------
export const updateCardNumber = (index, length, task) => {
    if (task === 'renderNextSessionCard'){
        document.querySelector('.card__flag--numberInSet').innerHTML = `${index + 1} / ${length}`;
    } else if (task === 'renderNextIntroducedCard') {
        document.querySelector('.card__flag--newCard').innerHTML = `NEW CARD&nbsp&nbsp&nbsp${index + 1} / ${length}`;
    }
};





