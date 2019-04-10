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





