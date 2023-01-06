var qo = {
    quizz: "question",
    o1: "option A",
    o2: "option B",
    o3: "option C",
    o4: "option D",
    ans: ['o2']
};
var hider = 'hideit';
// bg: array of objects {id:'id', cl:'class added'}
class Test {
    constructor(){
        this.allQuizz = [];
        this.currentQuizz = {id:'', ans:[], answered: false, userChoice: [], formats:[]};
        this.lastQuizzIndex = -1;
        this.data = {attempt: 0, pass: 0, fail: 0};

        this.on = false;
        this.first = true;
        this.quizzInfoOn = false;
        this.oldQuizz = false;

        this.quizz = document.querySelector('#qz');
        this.o1 = document.querySelector('#qzo1');
        this.o2 = document.querySelector('#qzo2');
        this.o3 = document.querySelector('#qzo3');
        this.o4 = document.querySelector('#qzo4');

        this.btno1 = document.querySelector('#qbtno1');
        this.btno2 = document.querySelector('#qbtno2');
        this.btno3 = document.querySelector('#qbtno3');
        this.btno4 = document.querySelector('#qbtno4');
        this.events();

    }

    events = () => {
        let that = this;
        this.btno1.addEventListener('click', function(){that.analyseAnswer(this.id.slice(4));})
        this.btno2.addEventListener('click', function(){that.analyseAnswer(this.id.slice(4));})
        this.btno3.addEventListener('click', function(){that.analyseAnswer(this.id.slice(4));})
        this.btno4.addEventListener('click', function(){that.analyseAnswer(this.id.slice(4));})
    }

    start = () => {
       
        if(this.on){
            //stop test
            //reset everything   
            alert('text don already start since') ;
            return
        }

        this.on == false?true:false;
        this.quizzManager();
        
    }

    quizzManager = () => {

        let newIndex = this.setNewQIndex();
        if(newIndex === false){
            alert('No quizz, perhaps we have reached the end')
            return
        }
        
        this.saveAnswer();
        this.clearFormats(this.currentQuizz.formats);
        this.clearCurrentQuizz();
        let qz = this.#setQuizz(newIndex);
        this.setFomats([... qz.ans], 'right');
        this.loadQuizz(qz);
        this.#createBtn(newIndex+1);
        this.liveUpdate();        
    }

    clearCurrentQuizz = () => {
        this.currentQuizz = {id:'', ans:[], answered: false, userChoice: [], formats:[]};
    }

    setNewQIndex = () => {
        if(this.first){ this.first = false; return 0}
        if((this.lastQuizzIndex+1) >= Q.length){return false}
        this.oldQuizz = false;
        if(this.quizzInfoOn){
            this.quizzInfoOn = false;
            document.querySelector('#quizzDetails').classList.add(hider);        
        }
        return (this.lastQuizzIndex + 1)
    }

    #setQuizz = (quizzIndex) => {
        let newQuizz = {... Q[quizzIndex]};
        this.lastQuizzIndex += 1;
        this.currentQuizz.id = this.lastQuizzIndex;
        this.currentQuizz.ans = [... newQuizz.ans];
        this.oldQuizz = false;
        return newQuizz
    }

    setFomats = (fm, v) => {
        for(let c of fm){this.currentQuizz.formats.push({id: 'btn'+c, cl: v});}
    }

    loadQuizz = (qz) => {
        this.quizz.innerHTML = qz.q;
        this.o1.innerHTML = qz.o1;
        this.o2.innerHTML = qz.o2;
        this.o3.innerHTML = qz.o3;
        this.o4.innerHTML = qz.o4;
    }

    loadFormat = () => {
        if(this.currentQuizz.formats.length <= 0) {return}
        for(let f of this.currentQuizz.formats){
            this[f.id].classList.add(f.cl)
           // this.data.currentQuizz.bg.push({id: c.id, cl: c.cl});
        }
    }

    #createBtn = (id) => {
        let btn = document.createElement('button');
        btn.id = "navBtn"+id;
        btn.innerText = id;
        btn.addEventListener('click', () => {this.loadOldQuizz(btn.id.slice(6))})
        document.querySelector('#hScroll').appendChild(btn);
    }

    liveUpdate = () => {
        document.querySelector('#qCount').innerText = (this.currentQuizz.id +1) + " of " + Q.length;
    }

    loadLiveUpdate = () => {

    }

    analyseAnswer = (ans) => {
        if(this.currentQuizz.answered){return}
        this.currentQuizz.userChoice = [... [ans]];
        this.currentQuizz.answered = true;
        let btnHint = document.querySelector('#navBtn'+ (this.currentQuizz.id+1));
        btnHint.scrollIntoView({behavior:'smooth', inline:'center', block:'center'});
        this.data.attempt +=1  
        if(this.currentQuizz.ans.indexOf(ans) < 0){ 
            this.setFomats([ans], 'wrong');
            btnHint.classList.add('wrong');
            this.data.fail +=1  
        }else {
             btnHint.classList.add('right');           
             this.data.pass +=1             
        }
        if(this.oldQuizz){
            let nextOldQuizzIndex = this.updateQuizz();
            if(nextOldQuizzIndex === false) { this.quizzManager()}
            else{this.loadOldQuizz(nextOldQuizzIndex+1)}
        }
        else{
            this.saveAnswer(); this.quizzManager();
        }
    }

    saveAnswer = () => {
      
        if(parseInt(this.currentQuizz.id) === this.allQuizz.length){
            lg('we are pushing it');
            this.allQuizz.push({... this.currentQuizz});    
        }
       // lg(this.allQuizz)
    }

    updateQuizz = () => {
        let idx = this.currentQuizz.id;
        this.allQuizz[idx].formats = [... this.currentQuizz.formats];
        this.allQuizz[idx].answered = true;
        //this.clearFormats(this.currentQuizz.formats);
        
        let nextIdx = false;
        for(let i = idx; i< this.allQuizz.length; i++){
            if(this.allQuizz[i].answered === false){
                nextIdx = i; break;
            }
        }
        return nextIdx
    }

    clearFormats = (formats) => {
        if(formats.length <=0){return}
        for(let c of formats ){
           this[c.id].classList.remove(c.cl);
        }
        //this.currentQuizz.formats = [];
    }

    loadOldQuizz = (oldID) => {
        oldID--;
       // let oldQuizz = this.allQuizz[oldID];
        this.saveAnswer();
        // clear format
        this.clearFormats(this.currentQuizz.formats);
        this.clearCurrentQuizz();        
        // load history object
        this.currentQuizz = {... this.allQuizz[oldID]}
        this.oldQuizz = true;
       // lg(this.currentQuizz);
        lg(this.currentQuizz.formats)
        // load quizz on page
        this.loadQuizz(Q[oldID]);
        this.liveUpdate();

        // load format on page
        if(!this.currentQuizz.answered){
            if(this.quizzInfoOn === true){
                document.querySelector('#quizzDetails').classList.add(hider);
            }
            return
        }
        this.loadFormat(this.currentQuizz.formats);
        document.querySelector('#quizzDetails').classList.remove(hider);
        this.quizzInfoOn = true;
       
    }
}


let tx;

// STEPS FOR LOADING MCQ IN AN ERROR PROOF WAY
/*
    ....LOADING....
1. Get quizz and load in current quizz object.
2. Load formats and classes in the active format object
3. load quizz on page
4. apply formats and classes on page

    ...ANALYSING ANSWER...
1. Retrieve answer from gorm
2. anlalyse user choice against correct answer
3. update user data accordingly
4. apply answer base formating on page
5. fetch next question
*/

class ShowIt {
    constructor(eventType, triggerId, targertId, targetDefaultDisplayNone ){
        this.sID = [... triggerId];
        this.tID = targertId;
        this.eType = eventType;
        this.displayNone = targetDefaultDisplayNone;
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


this.addEventListener('load', () => {
   
    tx = new Test();
    let result = new ShowIt('click', ['showScore'], 'liveScore', true)
    let qInfo = new ShowIt('click', ['openInfoWrapper','closeInfoWrapper'], 'infoWrapper', true)
    
    document.querySelector('#nextq').addEventListener('click', () => {
        tx.quizzManager();
    })

    document.querySelector('#startTest').addEventListener('click', () => {
        tx.start();
    })

})