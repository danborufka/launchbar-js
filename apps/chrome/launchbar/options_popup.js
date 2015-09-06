// Saves options to chrome.storage
function save_options() 
{
  chrome.storage.sync.set(
  {
    base_path:          document.getElementById('base_path').value,
    autoload:           document.getElementById('autoload').checked,
    user_command_path:  document.getElementById('user_command_path').value,
    shortcut:           document.getElementById('shortcut').value
  }, 
  function() 
  {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function(){status.textContent = '';}, 750);
  });
}

function restore_options() 
{
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
  {
    base_path:          'https://danborufka.github.io/cdn/launchbar-js/',
    autoload:           true,
    user_command_path:  '',
    shortcut:           'ctrl + space'
  }, 
  function(items) 
  {
    document.getElementById('base_path').value = items.base_path;
    document.getElementById('autoload').checked = items.autoload;
    document.getElementById('user_command_path').value = items.user_command_path;
    document.getElementById('shortcut').value = items.shortcut;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
