// console log shortenner
function lg(o){console.log(o)}

/*

document.getElementById('goLeft').addEventListener('click', () => {ScrollIt(false)})
document.getElementById('goRight').addEventListener('click', () => {ScrollIt(true)})
let scrollStep = 300, currentScroll = 0;

function ScrollIt(bool) {   // false scrolls leftward and true rightward   
    if (bool){currentScroll += scrollStep} else{currentScroll -= scrollStep}
    let elm = document.querySelector('.h-scrollable');
    if (currentScroll > elm.scrollWidth){ currentScroll = elm.scrollWidth}
    if (currentScroll < 0){ currentScroll = 0}
    elm.scroll({top:0, left: currentScroll, behavior:'smooth'});
}

function ResultsPerPage(bool){ // true steps up while false steps down
document.querySelector("#rppOut").innerText = parseInt(document.querySelector("#rppOut").innerText) + (bool==true?5:-5);
}

document.querySelector('#decreaseR').addEventListener('click', () => { ResultsPerPage(false);})
document.querySelector('#increaseR').addEventListener('click', () => {ResultsPerPage(true);})

function ShowIt(classArr,bool) {
    if(bool){
        for(let cl of classArr){document.getElementById(cl).classList.remove('hideit')}
        return
    }
    for(let cl of classArr){document.getElementById(cl).classList.add('hideit')}
}

let menuOn = 0;
document.querySelector('#menuI').addEventListener('click', () => {
    menuOn = (menuOn+1)%2; 

    ShowIt(['menuWrapper'],menuOn);
})

document.querySelector('#closeMenu').addEventListener('click', () => {
    document.querySelector('#menuI').click();
})
*/