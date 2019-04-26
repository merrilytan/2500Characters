//-------------------------------------------------------------
export const renderCharacter = (character, type) => {
    
    let addElement = '';
    let addClass = '';

    if(type === 'practice'){
        addElement = `
            <button class="btn btn-showAnswer">
                Pin Yin
            </button>
        `;

        addClass = `hidden`;
    }
    
    const markup = `
        <div class="card__inner">
            <div class="card__inner__character">
                <h1 class="character">${character.symbol}</h5>
            </div>
            <div class="card__inner__answer">
                ${addElement}
                <div class="card__inner__answer__showAnswer ${addClass}">
                    <div class="pinYin">${character.pinYin}</div>
                    <div class="meaning">(${character.meaning})</div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.card__face--front').insertAdjacentHTML('afterbegin', markup); 
}

//-------------------------------------------------------------
export const clearCharacter = () => {
    if(document.querySelector('.card__face--front').firstElementChild) document.querySelector('.card__face--front').firstElementChild.parentElement.removeChild(document.querySelector('.card__face--front').firstElementChild);
}



