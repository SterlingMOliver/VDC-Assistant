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
  