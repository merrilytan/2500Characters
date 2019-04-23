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
                    <h5 class="pinYin">${character.pinYin}</h6>
                    <h5 class="meaning">(${character.meaning})</h6>
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



