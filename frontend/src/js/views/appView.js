import { elements } from "./base";

export const renderPractice = (app) => {

    let markup = `
        <div class="setContainer">
            <div class="sets">
            </div>
        </div>
        <div class="popupSets" role="alert">
            <div class="popupSets__container">
                <button class="btn btn-exitSetAlert">&#10006;</button>
                <div class="popupSets__message"> 
                    Master the previous set to unlock this set!
                </div>
            </div> 
        </div>
        `;

    elements.appInner.innerHTML = markup; 

    console.log('app.setStatus', app.setStatus);
    app.setStatus.forEach((val, index) => {

        let icon, iconColor;

        if(val === -1){
            icon = 'fa-lock';
            iconColor = 'set__icon--grey';
        } else if(val === 0){
            icon = 'fa-play';
            iconColor = 'set__icon--dark';
        } else if(val === 1){
            icon = 'fa-check';
            iconColor = 'set__icon--green';
        }

        markup = `
        <div class="set">
            <button class="btn set__icon ${iconColor}" data-setid="${index + 1}"><i class="fas ${icon} fa-xs"></i></button>
            <div class="set__id">${index + 1}</div>
        </div>    
        `;

        
        document.querySelector('.sets').insertAdjacentHTML('beforeend', markup); 
    });
}


