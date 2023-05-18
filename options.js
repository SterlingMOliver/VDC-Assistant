// When the page loads, restore the saved preferences.
window.onload = function() {
    chrome.storage.sync.get('viewer', function(data) {
      document.getElementById('viewer').value = data.viewer || 'google';
    });
  };
  
  // When the "Save" button is clicked, save the current preferences.
  document.getElementById('save').onclick = function() {
    let viewer = document.getElementById('viewer').value;
    chrome.storage.sync.set({ viewer: viewer }, function() {
      alert('Options saved.');
    });
  };
  