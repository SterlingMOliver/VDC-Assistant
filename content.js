// Function to toggle the visibility of the selected elements
function toggleSelectedElements(selectedElements) {
    const elements = document.querySelectorAll('.stat-column');
    // Select all elements with class 'stat-column'
  
    const shortlistSection = document.querySelector('#shortlist-section');
    // Get the element with class 'shortlist-section'
  
    elements.forEach(element => {
      const title = element.querySelector('.stat-title').textContent;
      // Get the text content of the 'stat-title' element
  
      if (selectedElements.includes(title)) {
        element.style.display = 'none'; // Hide the element
      } else {
        element.style.display = ''; // Show the element
      }
    });
  
    if (selectedElements.includes('shortlist-section')) {
      shortlistSection.style.display = 'none'; // Hide the 'shortlist-section' element
    } else {
      shortlistSection.style.display = ''; // Show the 'shortlist-section' element
    }
  }
  
  
  // Function to load the selected elements from storage and apply them
  function loadSelectedElementsAndApply() {
    chrome.storage.sync.get({ selectedElements: [] }, function (data) {
      const selectedElements = data.selectedElements;
      toggleSelectedElements(selectedElements);
    });
  }
  
  // Listen for messages from the extension popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.toggleSelectedElements) {
      toggleSelectedElements(request.selectedElements);
    }
  });
  
  // Load the selected elements and apply them when the page is loaded
  loadSelectedElementsAndApply();

  //
  //
  //"view" button below - 
  
  console.log('Script started');

// Select all 'file-details-box' elements
Array.from(document.querySelectorAll('.file-details-box')).forEach(fileDetailsBox => {
  console.log('Processing a file details box:', fileDetailsBox);

  // Get the filename element
  let filenameElement = fileDetailsBox.querySelector('.file-details-box-filename');
  console.log('Filename element:', filenameElement);

  // Extract the filename text and convert to lower case
  let filename = filenameElement.textContent.toLowerCase();
  console.log('Filename:', filename);

  // Check if the filename contains '.docx', '.doc', or '.txt'
  if (filename.includes('.docx') || filename.includes('.doc') || filename.includes('.txt')) {
    console.log('The filename contains .docx, .doc, or .txt.');

    // Get the link element
    let linkElement = fileDetailsBox.querySelector('.file-details-box-links a');
    console.log('Link element:', linkElement);

    // Create the view button
    let button = document.createElement('button');
    button.innerText = 'View';
    button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('View button clicked.');

      chrome.storage.sync.get('viewer', function(data) {
        let viewer = data.viewer || 'google';
        console.log('Viewer:', viewer);
        chrome.runtime.sendMessage({ action: 'openTab', viewer: viewer, fileUrl: linkElement.href });
        console.log('Message sent to open the file.');
      });
    });

    // Add the view button next to the download link
    linkElement.parentNode.insertBefore(button, linkElement.nextSibling);
    console.log('View button added next to the download link.');
  } else {
    console.log('The filename does not contain .docx, .doc, or .txt.');
  }
});

console.log('Script completed');
