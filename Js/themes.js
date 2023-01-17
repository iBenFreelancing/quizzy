function Themes(index, returnAll = false){
let allThemes = [
    {
        name: 'dark',
        bodyBg: 'rgb(6, 5, 21)',
        bodyBgImage: 'none',
        textColorDefault: 'rgb(189, 215, 238)',
        textColorDim: 'rgb(127, 127, 127)',
        textColorBold: 'rgb(255, 217, 102)',
        menuBg: 'rgb(30, 37, 46)',
        bannerBg: 'rgba(6, 5, 21, 0.7)',
        classWrongBg: 'rgb(95, 0, 0)',
        classRightBg: 'rgb(0, 114, 154)',
        classDefaultBg: 'rgb(127, 127, 127)',
        btnColorDefault: 'rgb(0, 0, 0)'
    },
    {
        name: 'light',
        bodyBg: 'rgb(200, 200, 230)',
        bodyBgImage: 'none',
        textColorDefault: 'rgb(0, 0, 0)',
        textColorDim: 'rgb(89, 89, 89)',
        textColorBold: 'rgb(0, 32, 96)',
        menuBg: 'rgb(208, 206, 206)',
        bannerBg: 'rgba(200, 200, 200, 0.7)',
        classWrongBg: 'rgb(255, 0, 0)',
        classRightBg: 'rgb(0, 176, 240)',
        classDefaultBg: 'rgb(217, 217, 217)',
        btnColorDefault: 'rgb(0, 0, 0)'
    },
    {
        name: 'blue',
        bodyBg: 'rgb(6, 5, 21)',
        bodyBgImage: 'url("/Images/bg.jpg")',
        textColorDefault: 'rgb(189, 215, 238)',
        textColorDim: 'rgb(127, 127, 127)',
        textColorBold: 'rgb(255, 217, 102)',
        menuBg: 'rgb(30, 37, 46)',
        bannerBg: 'rgba(13, 43, 82, 0.7)',
        classWrongBg: 'rgb(95, 0, 0)',
        classRightBg: 'rgb(0, 114, 154)',
        classDefaultBg: 'rgb(127, 127, 127)',
        btnColorDefault: 'rgb(0, 0, 0)'
    }

];
if(returnAll){return allThemes}
return allThemes[index];
}

function ApplyTheme(theme) {
    let r = document.querySelector(':root');  
    let themePropertyNames = ['bodyBg', 'bodyBgImage', 'textColorDefault', 'textColorDim', 'textColorBold', 'menuBg', 'bannerBg', 'classWrongBg', 'classRightBg', 'classDefaultBg'];
    for(let p of themePropertyNames){
        r.style.setProperty("--" + p, theme[p]);
    }
    SaveUserTheme(theme.name);
}

this.addEventListener('load', () => {
    document.querySelector('#darkTheme').addEventListener('click', () => {ApplyTheme(Themes(0))})
    document.querySelector('#lightTheme').addEventListener('click', () => {ApplyTheme(Themes(1))})
    document.querySelector('#blueTheme').addEventListener('click', () => {ApplyTheme(Themes(2))})
})


// store user selection in the local storage to be used by other pages
// {courseId:'', courseName:'', level: ''}
function SetUserSelection(selection) {
    selection = selection.split("-");
    sessionStorage.setItem('course', JSON.stringify(
        { id: selection[0], name: selection[1], level: selection[2]}
    ));
    document.querySelector('#navtoConfirm').click();
}

function SaveUserTheme(themeName) {
    localStorage.setItem('theme', themeName);
}

function GetUserTheme() {
    let userTheme = localStorage.getItem('theme');
    lg(userTheme)
    if(userTheme === null) {return}
    let availableThemes = Themes(0, true)
    for(let theme of availableThemes){
        if(theme.name === userTheme){
            ApplyTheme(theme);
            break;
        }
    }
}
