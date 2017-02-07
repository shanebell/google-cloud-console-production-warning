console.log('Google Cloud Console extension');

var href = '';

function watchHref() {
	setTimeout(function () {

		// if href has changed, check the cloud project name
		if (href != document.location.href) {
			href = document.location.href;
			checkCloudProject(href);
		}

		// continue the loop
		watchHref();

	}, 2000);
}

function checkCloudProject(href) {
  if (isProductionProject(href)) {
	  showMessage();
  } else {
	  hideMessage();
  }
}

function isProductionProject(href) {

	var projectName = '';

	// A Cloud Project URL looks like this:
	// https://console.cloud.google.com/appengine?project=PROJECT_NAME
	if (href.startsWith('https://console.cloud.google.com')) {

		var matches = /project=([\w-]+)/.exec(href);
        projectName = matches[1] || '';
	}

    // An AppEngine datastore admin URL looks like this:
    // https://ah-builtin-python-bundle-dot-PROJECT_NAME.appspot.com/_ah/datastore_admin
	else if (href.startsWith("https://ah-builtin-python-bundle")) {

		var matches = /ah-builtin-python-bundle-dot-([\w-]+)\.appspot\.com/.exec(href);
        projectName = matches[1] || '';
	}

	return projectName && projectName.endsWith('-prod');
}

function showMessage() {

	if (!document.getElementById('production-warning-message')) {

		var div = document.createElement('div');
		div.id = 'production-warning-message';
		div.style['position'] = 'fixed';
		div.style['top'] = '50vh';
		div.style['width'] = '100%';
		div.style['text-align'] = 'center';
		div.style['margin'] = '0 auto';
		div.style['z-index'] = '1000';

		var innerDiv = document.createElement('div');
		innerDiv.style['color'] = 'red';
		innerDiv.style['font-weight'] = 'bold';
		innerDiv.style['font-size'] = '100px';
		innerDiv.style['opacity'] = '0.1';
		innerDiv.style['pointer-events'] = 'none';
		innerDiv.style['transform'] = 'translateY(-50%)';

		var message = document.createTextNode("PRODUCTION");

		innerDiv.appendChild(message);

		div.appendChild(innerDiv);

		document.body.appendChild(div);
	}
}

function hideMessage() {
	var div = document.getElementById('production-warning-message');

	if (div) {
		document.body.removeChild(div);
	}
}

watchHref();
