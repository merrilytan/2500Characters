import { elements } from './base';

//-------------------------------------------------------------
export const clearAppInnerUI = () => {
    elements.appInner.innerHTML = '';
};

//-------------------------------------------------------------
export const renderTemplate = (setID, sessionID, type) => {

    let markup = '';

    if(type === 'setup'){
        markup = `
            <div class="session">
                <div class="session__header">
                    <div class="session__header__title">${setID}.${sessionID}</div>
                    <button class="btn btn-exitSession"><i class="fas fa-times"></i></button>
                </div>
                <div id="myProgress">
                    <div id="myBar"></div>
                </div>
                <div class="card">
                    <div class="card__face card__face--front">
                    </div>
                    <div class="card__flag card__flag--numberInSet">
                    </div> 
                    <div class="card__ratingButtons">
                    </div> 
                    <div class="card__face card__face--back">
                    </div>
                </div>
            </div>
            <div class="popupSession" role="alert" data-linkid="none">
                <div class="popupSession__container">
                    <div class="popupSession__message">
                        This session's progress won't be saved at exit. &nbspAre you sure you want to exit this session?
                    </div>
                    <div class="popupSession__buttons">
                        <button class="btn btn-popupYes">Yes, Exit</button>
                        <button class="btn btn-popupNo">No, Return to Session</button>
                    </div>
                </div>
            </div>
        `;

        elements.appInner.innerHTML = markup;
        document.getElementById("myBar").style.width = '0%';
    
    } else if (type === 'practice'){
        markup = `
            <div class="ratingButtons">
                <button class="btn btn-rating btn-rating--cross"><i class="fas fa-times"></i></a>
                <button class="btn btn-rating btn-rating--line"><i class="fas fa-minus"></i></a>
                <button class="btn btn-rating btn-rating--check"><i class="fas fa-check"></i></a>
            </div> 
        `;

        document.querySelector('.card__ratingButtons').innerHTML= '';
        document.querySelector('.card__ratingButtons').insertAdjacentHTML('afterBegin', markup);
        if(!document.querySelector('.card__flag').classList.contains('card__flag--newCard')) {
            (document.querySelector('.card__flag').classList.remove('card__flag--newCard'));  
        }

    } else if (type === 'introduce'){
        markup = `<button class="btn btn-gotIt">got it</a>`;
        
        document.querySelector('.card__ratingButtons').innerHTML= '';
        document.querySelector('.card__ratingButtons').insertAdjacentHTML('afterBegin', markup);
        if(!document.querySelector('.card__flag').classList.contains('card__flag--newCard')) {
            (document.querySelector('.card__flag').classList.add('card__flag--newCard'));  
        }
    }
};

//-------------------------------------------------------------
export const renderSummaryCard = (completed, numMasteredSession, set) => {
    document.querySelector('.card__flag').parentElement.removeChild(document.querySelector('.card__flag'));
    document.querySelector('.card__ratingButtons').parentElement.removeChild(document.querySelector('.card__ratingButtons'));
    document.querySelector('.card').classList.add('flipped');
    
    let addContent = '';
    let addElement = '';
    
    if(!completed) {
        addElement = `<button class="btn btn-nextSession">Start Next Session</button>`;
    } else {
        addContent = `Set Completed! 100 characters mastered! Set 3 unlocked!`;
    }
    
    console.log('set.indexLastCharacterIntroduced', set.indexLastCharacterIntroduced);
    console.log('set.masteredCharacterIDs.length', set.masteredCharacterIDs.length);

    document.querySelector('.card__face--back').innerHTML = `
        <div class="summaryHeader">Session Completed!</div>
        <div class="summary__inner">
            <div class="summaryLine"><div class="summaryDesc">Currently learning:</div><div class="summaryNum">${(set.indexLastCharacterIntroduced + 1) - set.masteredCharacterIDs.length}</div></div>
            <div class="summaryLine"><div class="summaryDesc">Mastered in session:</div><div class="summaryNum">${numMasteredSession}</div></div>
            <div class="summaryLine"><div class="summaryDesc">Mastered in set:</div><div class="summaryNum">${set.masteredCharacterIDs.length}/${set.numOfCharacters}</div></div>
        </div>
        <div class="setComplete">
            ${addContent}
        </div>
        <div class="summary__buttons">
            <button class="btn btn-home">Home</button> 
            ${addElement}
        </div>
    `;
};

//-------------------------------------------------------------
export const updateCardFlag = (index, length, task) => {
    if (task === 'renderNextPracticeCharacter'){
        document.querySelector('.card__flag--numberInSet').innerHTML = `${index + 1} / ${length}`;
    } else if (task === 'renderNextIntroduceCharacter') {
        document.querySelector('.card__flag--newCard').innerHTML = `NEW CARD&nbsp&nbsp&nbsp${index + 1} / ${length}`;
    }
};





