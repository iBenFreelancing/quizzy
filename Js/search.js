
let CreateResultDiv = (arrResultItems) => {
    let divs = [];
    for(let resultX of arrResultItems){
        divs.push(CreateDivComponent(resultX));
    }
    return divs
}

// {courseId: "", courseName: "JavaScript", b:254, i:173, a:127}
function CreateDivComponent(singleResult) {
    pagingInfo.count += 1;
    return (`
        <div class="item-x">
            <span class="course">${pagingInfo.count}. &nbsp ${singleResult.courseName} / ${singleResult.b + singleResult.i + singleResult.a}</span>
            <div class="q-options">
                <span class="b-l" title="beginner" data-cid = "${singleResult.courseId}-${singleResult.courseName}-Beginner" onclick="SetUserSelection(this.dataset.cid)"><img src="/Images/appleBlue.png" width="70px" height="auto" alt="beginner"> <small>${singleResult.b}</small></span>
                <span class="i-l" title="intermediate" data-cid = "${singleResult.courseId}-${singleResult.courseName}-Intermediate" onclick="SetUserSelection(this.dataset.cid)"><img src="/Images/appleGrey.png" width="70px" height="auto" alt="intermediate"><small>${singleResult.i}</small></span>
                <span class="a-l" title="advance" data-cid = "${singleResult.courseId}-${singleResult.courseName}-Advance" onclick="SetUserSelection(this.dataset.cid)"><img src="/Images/appleGrey.png" width="70px" height="auto" alt="advance"> <small>${singleResult.a}</small></span>
            </div>
        </div> 
    `);
}

function AppendSearchResult(pageR){    
    let parentDiv = document.querySelector('#searchResult');
    parentDiv.innerHTML ="";    
    parentDiv.innerHTML = `<h3>Search Result</h3> ${CreateResultDiv(pageR).join("")}`;
    if(pageR.length === 0){
        parentDiv.innerHTML = `<h3>Search Result</h3><h3>Opps!!! No results were found</h3><br/><u><h4 onclick ="GetAllResult()">Click here to see a list of all available courses</h4></u>`;
    }
    parentDiv.scrollIntoView({behavior:'smooth', block:'start'});
}

this.addEventListener('load', () => {
    document.querySelector('#search').addEventListener('change', () => {
        AppendSearchResult(GetResult(Result))
    });
    GetAllResult()
    document.querySelector('#search').scrollIntoView({behavior:'smooth', block:'center'});
    GetUserTheme();
})

function GetResult(database){
    let keyword = document.querySelector('#search').value;
    document.querySelector('#search').value = "";
    batchResult = [];
    batchResult = database.filter((itemx) => { return itemx.courseName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) });
    SetResultPaging();
    return GetOneResultPage(1)
}


/*
determine the number of groups result can be divided into
create buttons that correspond the groups above
attached event listerner to each btn
load btn set of result onclick
*/
batchResult = [1,2,3,2,3,4,4,5,6,7,8,8,9,0];
let pagingInfo = {
    currentPage:"",
    totalPages:"",
    count: 0
}
function SetResultPaging(){
    let rpp = document.querySelector('#searchResultsPerPage').innerText;
    let numberOfPages = Math.floor(batchResult.length/rpp);
    let extraResult = batchResult.length%rpp;
    if(extraResult >= 1){ numberOfPages++; CreateBtn(numberOfPages); pagingInfo.totalPages = numberOfPages; return }
    if(numberOfPages >= 1){ CreateBtn(numberOfPages); pagingInfo.totalPages = numberOfPages;}
}

function CreateBtn(numberOfBtn) {
    let btns = [];
    for(let i = 1; i<=numberOfBtn; i++){
        btns.push(
            `<button onclick = "GetThePage(this.innerText)">${i}</button>`
        )
    }
    document.querySelector('#hScrollable').innerHTML = btns.join("");
}

function GetOneResultPage(pageNumber=1) {
    pageNumber--;
    let rpp = document.querySelector('#searchResultsPerPage').innerText;
    let lowerLimit = (parseInt(rpp)*pageNumber);
    let upperLimit = lowerLimit + (parseInt(rpp) - 1);
    if(upperLimit >= batchResult.length){upperLimit = batchResult.length -1;}
    let resultSet = [];

    for(lowerLimit; lowerLimit <= upperLimit; lowerLimit++){
        resultSet.push(batchResult[lowerLimit]);
    }
    pagingInfo.currentPage = pageNumber+1;
    pagingInfo.count = pageNumber*parseInt(rpp);
    document.querySelector('#resultHint').innerText = `Showing ${pagingInfo.currentPage} of ${pagingInfo.totalPages} pages`;
    return resultSet
}

function GetThePage(pageNo = 1) {
    let rs = GetOneResultPage(pageNo);
    AppendSearchResult(rs);
}

function GetAllResult(){
    batchResult = [... Result];
    SetResultPaging();
    GetThePage(pageNo = 1);
}




