import { elements } from './base';

//-------------------------------------------------------------
export const clearAppInnerUI = () => {
    elements.appInner.innerHTML = '';
};

//-------------------------------------------------------------
export const renderTemplate = (sessionID, type) => {

    let markup = '';

    if(type === 'setup'){
        markup = `
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
                    <div class="card__ratingButtons">
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

        elements.appInner.innerHTML = markup;
    
    } else if (type === 'practice'){
        markup = `
            <div class="card__ratingButtons__container">
                <button class="btn btn-rating btn-rating--cross">&#10006;</a>
                <button class="btn btn-rating btn-rating--line">&#9866</a>
                <button class="btn btn-rating btn-rating--check">&#10004;</a>
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
export const renderSummaryCard = () => {
    document.querySelector('.card__flag').parentElement.removeChild(document.querySelector('.card__flag'));
    document.querySelector('.card__ratingButtons').parentElement.removeChild(document.querySelector('.card__ratingButtons'));
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
export const updateCardFlag = (index, length, task) => {
    if (task === 'renderNextPracticeCharacter'){
        document.querySelector('.card__flag--numberInSet').innerHTML = `${index + 1} / ${length}`;
    } else if (task === 'renderNextIntroduceCharacter') {
        document.querySelector('.card__flag--newCard').innerHTML = `NEW CARD&nbsp&nbsp&nbsp${index + 1} / ${length}`;
    }
};





