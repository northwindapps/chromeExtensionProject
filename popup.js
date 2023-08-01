
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
        const result = await fetch('http://18.182.46.190/dictionary', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        //JSON.stringify({key: 'value'})
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
    word = word.replace(/\W/g, ' ');
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(word);
    const language = document.getElementById("lang").value;
    utterThis.lang = "en-US";
    if(typeof language !== 'undefined'){
        utterThis.lang = language;
    }
    const voices = synth.getVoices();
    for (let index = 0; index < voices.length; index++) {
        if (typeof voices[index].lang !== "undefined") {
            if(voices[index].lang === utterThis.lang){
                utterThis.voice = voices[index]
            } 
        }
        
    }
    console.log(utterThis.voice);
    console.log(utterThis.lang);
    utterThis.pitch = 1.0;
    synth.speak(utterThis);
}


