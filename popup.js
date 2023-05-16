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
  
    // Function to save the selected elements to storage
    function saveSelectedElements(selectedElements) {
      chrome.storage.sync.set({ selectedElements: selectedElements });
    }
  
    // Function to load the selected elements from storage and update the checkboxes
    function loadSelectedElementsAndUpdateCheckboxes() {
      chrome.storage.sync.get({ selectedElements: [] }, function (data) {
        const selectedElements = data.selectedElements;
        const checkboxes = document.getElementsByName('element');
        checkboxes.forEach(checkbox => {
          checkbox.checked = selectedElements.includes(checkbox.value);
        });
      });
    }
  
    // Load the selected elements and update the checkboxes when the popup is opened
    loadSelectedElementsAndUpdateCheckboxes();
  
    // Save the selected elements when the Apply button is clicked
    document.getElementById('applyButton').addEventListener('click', function () {
      const selectedElements = [];
      const checkboxes = document.getElementsByName('element');
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          selectedElements.push(checkbox.value);
        }
      });
      saveSelectedElements(selectedElements);
    });
  });
  