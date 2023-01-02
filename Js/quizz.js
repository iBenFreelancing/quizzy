var Q = [
    {
    q: "which of the following is not a JavasSript data type?",
    o1: "String",
    o2: "Logic",
    o3: "Number",
    o4: "script",
    ans: ['o2','o4']
},
{
    q: "Which of the following is a JavaScript declearation keyword?",
    o1: "const",
    o2: "let",
    o3: "vars",
    o4: "function",
    ans: ['o1','o2','o4']
},
{
    q: "What will the code below return? function (){return void}",
    o1: "undefined",
    o2: "null",
    o3: "err",
    o4: "the function itself",
    ans: ['o2']
},
{
    q: "what will be logged onto the console. { let x = 3; function twist() {(x=5); x += 2;} console.log(x--)}",
    o1: "3",
    o2: "2",
    o3: "7",
    o4: "6",
    ans: ['o2']
},
{
    q: "How do you select an element with id 'txt' using vanilla JavaScript? ",
    o1: "document.getElementById('txt')",
    o2: "document.getElementByAttribute(id = 'txt')",
    o3: "DOM.getElementByAttribute(id = 'txt')",
    o4: "document.querySelector('#txt')",
    ans: ['o1','o4']
}
];
var qo = {
    quizz: "question",
    o1: "option A",
    o2: "option B",
    o3: "option C",
    o4: "option D",
    ans: ['o2']
};

// bg: array of objects {id:'id', cl:'class added'}
class Test {
    constructor(){
        this.data = {
            q: [], // array of questions that user attempted
            currentQuizz: {id:-1, ans:[], answered: false, userChoice: [], bg:[]},

        }

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
        this.btno1.addEventListener('click', function(){
           that.setUserChoice([this.id.slice(4)]);
        })
    }

    setQuizz = (qz) => {
        this.quizz.innerHTML = qz.q;
        this.o1.innerHTML = qz.o1;
        this.o2.innerHTML = qz.o2;
        this.o3.innerHTML = qz.o3;
        this.o4.innerHTML = qz.o4;
    }
    setColors = (bool, l) => {
        if(!bool) {return}
        if(l.length <= 0) {return}
        for(let c of l){
            this[c.id].classList.add(c.cl)
           // this.data.currentQuizz.bg.push({id: c.id, cl: c.cl});
        }
    }

    clearColors = (l) => {
        if(l.length <=0){return}
       lg(l)
        for(let c of l ){
           this[c.id].classList.remove(c.cl);
        }
        this.data.currentQuizz.bg = [];
    }

    getQuizz = (nextIndex) => {
        if(nextIndex >= Q.length) {return false}
        return Q[nextIndex]
    }

    createBtn = (id) => {
        let btn = document.createElement('button');
        btn.id = "navBtn"+id;
        btn.innerText = id;
        btn.addEventListener('click', () => {this.loadOldQuizz(btn.id.slice(6))})
        document.querySelector('#hScroll').appendChild(btn);
    }

    loadNewQuizz = () => {
        let newIndex = this.data.currentQuizz.id + 1;
        let newQuizz = this.getQuizz(newIndex);
        if(!newQuizz){alert('No further question'); return}
        this.data.q.push({... this.data.currentQuizz}); 
        this.data.currentQuizz.id += 1; 
        this.data.currentQuizz.ans = [... newQuizz.ans]; 
        this.clearColors(this.data.currentQuizz.bg);
        this.setQuizz(newQuizz);
        for(let c of newQuizz.ans){
            this.data.currentQuizz.bg.push({id: 'btn'+ c,cl: 'right'} )
        }

        //this.setColors(true, this.data.currentQuizz.bg);
        document.querySelector('#qCount').innerText = (newIndex+1) + " of " + Q.length;
        this.createBtn(newIndex+1);
    }

    loadOldQuizz = (oldID) => {
        //get old quizz id
        let oldq = this.data.q[oldID-1];
        // clear current formating
        this.clearColors(this.data.currentQuizz.bg);
        //load old quizz
        this.setQuizz(Q[oldID-1]);
        if(!oldq.answered){return}
       
       // this.data.currentQuizz.bg = [... oldq.bg];
       // this.data.currentQuizz.ans = [... oldq.ans];
       // this.data.currentQuizz.answered = oldq.answered;
        this.setColors(true, oldq.bg)
        
    }

    setUserChoice = (uc) => {
        //get user choice
        this.data.currentQuizz.userChoice = [... uc];
        this.data.currentQuizz.answered = true;
        let uac = uc.filter((i) => {return this.data.currentQuizz.ans.indexOf(i) < 0;},this.data.currentQuizz.ans)
        
        if(uac.length>0){
            for(let ck of uac) {                
                this.data.currentQuizz.bg.push( { id:"btn"+ck, cl:'wrong' } );
            }
        }
        // call next quizz
        this.loadNewQuizz();
    }

}


let tx;

this.addEventListener('load', () => {
   
    tx = new Test();
    
    document.querySelector('#nextq').addEventListener('click', () => {
        tx.loadNewQuizz();
    })

})
