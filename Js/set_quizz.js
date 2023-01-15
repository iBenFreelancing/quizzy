this.addEventListener('load', () => {
    let category = new MultiOption(['QLbeginner','QLintermediate','QLadvance'],'QLbeginner',applySettings);
    let answers = new MultiOption(['anso1','anso2','anso3','anso4']);
})

function applySettings(icid){
    alert(icid)
}