chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openTab') {
      let viewerUrl;
      if (message.viewer === 'google') {
        viewerUrl = `https://docs.google.com/viewer?url=${message.fileUrl}`;
      } else {
        viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${message.fileUrl}`;
      }
      chrome.tabs.create({ url: viewerUrl });
    }
  });

  //right-click context links
  chrome.runtime.onInstalled.addListener(function() {
  // Create a context menu for ko-fi
  chrome.contextMenus.create({
    "id": "supportMe",
    "title": "Support me on ko-fi!",
    "contexts": ["all"]
  });

  // Create a context menu for email feedback
  chrome.contextMenus.create({
    "id": "emailFeedback",
    "title": "Give feedback on new features",
    "contexts": ["all"]
  });
});

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
      if (info.menuItemId === "supportMe") {
        // Open a new tab with your ko-fi page
        chrome.tabs.create({
          url: "https://ko-fi.com/yourpage"
        });
      } else if (info.menuItemId === "emailFeedback") {
        // Open a mailto link
        chrome.tabs.create({
          url: "mailto:sterlingmoliver@gmail.com?subject=VDC%20Assistant%20Feature%20Idea"
        });
      }
    });