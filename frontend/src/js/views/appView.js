import { elements } from "./base";

//-------------------------------------------------------------
export const renderCharacters = () => {

    let markup = `
        <div class="setContainer">
            <div class="comingSoon">
                Coming Soon!
            </div>
        </div>
    `;

    elements.appInner.innerHTML = markup; 

}

//-------------------------------------------------------------
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

//-------------------------------------------------------------
export const renderAbout = () => {

    let markup = `
        <div class="aboutContainer">

            Learn to read 2500 of the most common Chinese characters. This app
            requires knowledge of pin yin. 

            The 2500 characters are split into 25 sets of 100. Master all of the characters
            in a set to unlock the next set.

            Characters should be practiced in daily sessions. 5 new characters are introduced in each session 
            until all of the set's characters have been introduced. 

            When a character appears, pronounce it out loud. Then, click the Pin Yin button to 
            check if you were correct. Rate yourself using the these buttons at the bottom. A check means
            you got it right with no trouble. A line means you got it right but you were unsure/it took you 
            a lot of time. A cross means you got it wrong.

            When you rate your character with a check, thecharacter progresses to the next level.
            Level 1 - character will be practiced at the next session
            Level 2 - character will be practiced at the next session
            Level 3 - character will be practiced at the next session
            Level 4 - character will be practiced after 1 sessions. 
            Level 5 - character will be practiced after 4 sessions
            Level 6 - character will be practiced after 9 sessions
            Level 7 - character will be practiced after 10 sessions
            Level 8 - character has been mastered and will be practiced randomly until all of the characters in the set has been mastered.
            
            If you mark yourself a line, if the character is in level 1-3, it will stay at the same level. If it is above
            level 3, it will go back down to level 3. If you rate it a cross, character will go back to level 1.


        </div>
    `;

    elements.appInner.innerHTML = markup; 
}
