
let CreateResultDiv = (arrResultItems) => {
    let divs = [];
    for(let resultX of arrResultItems){
        divs.push(CreateDivComponent(resultX));
    }
    return divs
}


// {courseId: "", courseName: "JavaScript", b:254, i:173, a:127}
function CreateDivComponent(singleResult) {
    return (`
        <div class="item-x">
            <span class="course">${singleResult.courseName} / ${singleResult.b + singleResult.i + singleResult.a}</span>
            <div class="q-options">
                <span class="b-l" title="beginner" data-cid = "${singleResult.courseId}-${singleResult.courseName}-Beginner" onclick="SetUserSelection(this.dataset.cid)"><img src="/Images/appleBlue.png" width="70px" height="auto" alt="beginner"> <small>${singleResult.b}</small></span>
                <span class="i-l" title="intermediate" data-cid = "${singleResult.courseId}-${singleResult.courseName}-Intermediate" onclick="SetUserSelection(this.dataset.cid)"><img src="/Images/appleGrey.png" width="70px" height="auto" alt="intermediate"><small>${singleResult.i}</small></span>
                <span class="a-l" title="advance" data-cid = "${singleResult.courseId}-${singleResult.courseName}-Advance" onclick="SetUserSelection(this.dataset.cid)"><img src="/Images/appleGrey.png" width="70px" height="auto" alt="advance"> <small>${singleResult.a}</small></span>
            </div>
        </div> 
    `);
}

function AppendSearchResult(availableData){
    let searchResult = GetResult(availableData);
    let parentDiv = document.querySelector('#searchResult');
    parentDiv.innerHTML ="";
    
    parentDiv.innerHTML = `<h3>Search Result</h3> ${CreateResultDiv(searchResult).join("")}`;
    if(searchResult.length === 0){
        parentDiv.innerHTML = `<h3>Search Result</h3><h3>Opps!!! No results were found</h3><br/><u><h4 onclick ="AppendSearchResult(Result)">Click here to see a list of all available courses</h4></u>`;
    }
    parentDiv.scrollIntoView({behavior:'smooth', block:'start'});
}

this.addEventListener('load', () => {
    document.querySelector('#search').addEventListener('change', () => {AppendSearchResult(Result)});
    AppendSearchResult([Result[0], Result[1], Result[2]]);
    document.querySelector('#search').scrollIntoView({behavior:'smooth', block:'center'});
})

function GetResult(database){
    let keyword = document.querySelector('#search').value;
    document.querySelector('#search').value = "";
    return (
        database.filter((itemx) => {
            return itemx.courseName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
            
        })
    )
}

// store user selection in the local storage to be used by other pages
// {courseId:'', courseName:'', level: ''}
function SetUserSelection(selection) {
    selection = selection.split("-");
    sessionStorage.setItem('course', JSON.stringify(
        { id: selection[0], name: selection[1], level: selection[2]}
    ));
    document.querySelector('#navtoConfirm').click();
}

function NewPage(pageName) {
    window.location.href += pageName;
}