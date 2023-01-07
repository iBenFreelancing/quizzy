/*
...........parameters of Showit class............
description
this class simply hides or displays an element

arguments
1. eventType: event that will cause the element to be shown/hidden. eg click, hover, keyup etc
2. triggerId: array of id of elements whose eventype will toggle display
3. targertId: id of element to be shown/hidden
4. targetDefaultDisplayNone: states where the target is hidden by default. true for hidden by difault and false for otherwise 

*/

class ShowIt {
    constructor(eventType, triggerId, targetId, targetHiddenByDefault ){
        this.sID = [... triggerId];
        this.tID = targetId;
        this.eType = eventType;
        this.displayNone = targetHiddenByDefault;
        this.#bindAll();   
    }

    #bindIt = (theID) => {
       
        document.querySelector('#' + theID).addEventListener(this.eType, () => {
            let elm = document.querySelector('#' + this.tID);
            if(this.displayNone){
                elm.classList.remove('hideit');
                this.displayNone = false;
                return
            }            
            elm.classList.add('hideit');
            this.displayNone = true;
        })
       
    }

    #bindAll = () => {for(let id of this.sID){ this.#bindIt(id); }}
}