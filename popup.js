document.addEventListener('DOMContentLoaded', function () {
    // Send a message to the content script to toggle selected elements when the Apply button is clicked
    document.getElementById('applyButton').addEventListener('click', function () {
      const selectedElements = [];
      const checkboxes = document.getElementsByName('element');
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedElements.push(checkbox.value);
        }
      });
      sendToggleSelectedElementsMessage(selectedElements);
    });
  
    // Function to send a message to the content script to toggle selected elements
    function sendToggleSelectedElementsMessage(selectedElements) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          toggleSelectedElements: true,
          selectedElements: selectedElements
        }, function(response) {
          // Handle the response from the content script if needed
        });
      });
    }
  });
  