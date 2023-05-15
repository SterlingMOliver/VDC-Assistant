// Function to toggle the visibility of the selected elements
function toggleSelectedElements(selectedElements) {
    const elements = document.querySelectorAll('.stat-column'); // Select all the elements with class 'stat-column'
    elements.forEach(element => {
      const title = element.querySelector('.stat-title').textContent; // Get the text content of the 'stat-title' element
      if (selectedElements.includes(title)) {
        element.style.display = ''; // Show the element
      } else {
        element.style.display = 'none'; // Hide the element
      }
    });
  }
  
  // Listen for messages from the extension popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.toggleSelectedElements) {
      toggleSelectedElements(request.selectedElements);
    }
  });