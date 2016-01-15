(function(){

  document.addEventListener('deviceready', onDeviceReady, false);
  
  function onDeviceReady() {
  
      // Mock device.platform property if not available
      if (!window.device) {
          window.device = { platform: 'Browser' };
      }
  
      handleExternalURLs();
  }
  
  function handleExternalURLs() {
      
      // Handle click events for all external URLs
      if ( device.platform.toUpperCase() === 'ANDROID' ) {
          // TODO not require jQuery
          // http://stackoverflow.com/questions/14677019/emulate-jquery-on-with-selector-in-pure-javascript
          //
          $(document).on('click', 'a[href^="http"]', function (e) {
              var url = $(this).attr('href');
              navigator.app.loadUrl(url, { openExternal: true });
              e.preventDefault();
          });

      }
      else if ( device.platform.toUpperCase() === 'IOS' ) {
          $(document).on('click', 'a[href^="http"]', function (e) {
              var url = $(this).attr('href');
              window.open(url, '_system');
              e.preventDefault();
          });
	  }
      else {
          // Leave standard behaviour
	  }
  }
  
})();