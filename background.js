console.log("Background ready");
chrome.action.onClicked.addListener(() => {
  console.log("clicked");

  let capturing = chrome.tabs.captureVisibleTab();
  capturing.then(onCaptured, onError);
});

function onCaptured(imageUri) {
  console.log(imageUri);
}

function onError(error) {
  console.log(`Error: ${error}`);
}