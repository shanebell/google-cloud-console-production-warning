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

	// A Cloud Project URL looks like this:
	// https://console.cloud.google.com/appengine?project=PROJECT_NAME

	// get the project name from the URL
	var matches = /project=([\w-]+)/.exec(href);
	var projectName = matches[1] || '';

	return projectName && projectName.endsWith('-prod');
}

function showMessage() {

	if (!document.getElementById('production-warning-message')) {

		var div = document.createElement('div');
		div.id = 'production-warning-message';
		div.style['position'] = 'absolute';
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
