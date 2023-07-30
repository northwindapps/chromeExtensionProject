
document.addEventListener("DOMContentLoaded", function() {
    const captureButton = document.getElementById("capture");
    const screenshotContainer = document.getElementById("screenshotContainer");
    const wordList = document.getElementById("wordList");

    captureButton.addEventListener("click", function() {
        chrome.tabs.captureVisibleTab(function(screenshotDataUrl) {
            const screenshotImage = new Image();
            console.log(screenshotImage);
            screenshotImage.src = screenshotDataUrl;
            const getBase64StringFromDataURL = screenshotDataUrl.replace('data:', '').replace(/^.+,/, '');
            //screenshotContainer.appendChild(screenshotImage);
            getWordList(getBase64StringFromDataURL);
        });
    }); 
});

const getWordList = async (data) => {
    if(typeof data !== 'undefined'){
        console.log(data);
        const response = await fetch('https://extension-tips.glitch.me/tips.json');
        const tips = await response.json();
        
        const result = await fetch('http://127.0.0.1:5000/dictionary', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data['result']);
            renderWordList(data['result']);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
};

const renderWordList = (list) => {
    for (let index = 0; index < list.length; index++) {
        let buttonElement = document.createElement('button');
        let word = list[index];
        buttonElement.value = word;
        buttonElement.addEventListener("click", function() {
            speakText(word);
        }, false);
        buttonElement.innerHTML = word;
        let liElement = document.createElement('li');
        liElement.appendChild(buttonElement);
        wordList.appendChild(liElement);
    }
    // console.log(list);
}

const speakText = (word) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(word);
    utterThis.lang = "fr-FR";
    synth.speak(utterThis);
}

