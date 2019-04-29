import { elements } from "./base";

export const renderPractice = () => {
    const markup = `
        <div class="setContainer">
            <div class="sets">
                <div class="set">
                    <div class="setHeader setHeader--active">
                        SET 1
                    </div>
                    <button class="btn btn-startSession" data-itemid="1">
                        Start Session 5   
                    </button>
                </div>
                <div class="set">
                    <div class="setHeader">
                        SET 2
                    </div>
                    <button class="btn btn-locked">
                        Locked  
                    </button>
                </div>
                <div class="set">
                    <div class="setHeader">
                        SET 3
                    </div>
                    <button class="btn btn-locked">
                        Locked 
                    </button>
                </div>
                <div class="set">
                    <div class="setHeader">
                        SET 4
                    </div>
                    <button class="btn btn-locked">
                        Locked  
                    </button>
                </div>
                <div class="set">
                    <div class="setHeader">
                        SET 5
                    </div>
                    <button class="btn btn-locked">
                        Locked   
                    </button>
                </div>
                <div class="set">
                    <div class="setHeader">
                        SET 6
                    </div>
                    <button class="btn btn-locked">
                        Locked  
                    </button>
                </div>
                <div class="set">
                    <div class="setHeader">
                        SET 7
                    </div>
                    <button class="btn btn-locked">
                        Locked   
                    </button>
                </div>
                <div class="set">
                    <div class="setHeader">
                        SET 8
                    </div>
                    <button class="btn btn-locked">
                        Locked   
                    </button>
                </div>
            </div>
        </div>
    `;

    elements.appInner.innerHTML = markup;  
}


