import { elements } from './base';

//-------------------------------------------------------------
export const renderCard = (card) => {
    
    const markup = `
        <div class="card__inner">
            <div class="card__inner__character">
                <h1 class="character">${card.symbol}</h5>
            </div>
            <div class="card__inner__answer">
                <button class="btn btn-showAnswer">
                    Show Answer
                </button>
                <div class="card__inner__answer__showAnswer hidden">
                    <h5 class="pinYin">${card.pinYin}</h6>
                    <h5 class="meaning">(${card.meaning})</h6>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.card__face--front').insertAdjacentHTML('afterbegin', markup);    
}

//-------------------------------------------------------------
export const clearCard = () => {
    if(document.querySelector('.card__face--front').firstElementChild) document.querySelector('.card__face--front').firstElementChild.parentElement.removeChild(document.querySelector('.card__face--front').firstElementChild);
}

//-------------------------------------------------------------
export const renderNewCard = (card) => {
    
    const markup = `
        <div class="card__inner">
            <div class="card__inner__character">
                <h1 class="character">${card.symbol}</h5>
            </div>
            <div class="card__inner__answer">
                <div class="card__inner__answer__showAnswer">
                    <h5 class="pinYin">${card.pinYin}</h6>
                    <h5 class="meaning">(${card.meaning})</h6>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.card__face--front').insertAdjacentHTML('afterbegin', markup);    
}

