
document.addEventListener("DOMContentLoaded", function() {
    const captureButton = document.getElementById("capture");
    const screenshotContainer = document.getElementById("screenshotContainer");
    const wordList = document.getElementById("wordList");

    captureButton.addEventListener("click", function() {
        chrome.tabs.captureVisibleTab(function(screenshotDataUrl) {
            const screenshotImage = new Image();
            screenshotImage.src = screenshotDataUrl;
            //screenshotContainer.appendChild(screenshotImage);
            getWordList(screenshotImage);
        });
    }); 
});

const getWordList = async (data) => {
    if(typeof data !== 'undefined'){
        console.log(data);
        const response = await fetch('https://extension-tips.glitch.me/tips.json');
        const tips = await response.json();
        renderWordList(tips);
    }
};

const renderWordList = (list) => {
    for (let index = 0; index < list.length; index++) {
        let buttonElement = document.createElement('button')
        buttonElement.innerHTML = 'hello';
        let liElement = document.createElement('li');
        liElement.appendChild(buttonElement);
        wordList.appendChild(liElement);
    }
    console.log(list);
}

