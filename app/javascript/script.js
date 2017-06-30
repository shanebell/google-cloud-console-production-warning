/**
 * Copyright 2017 Shane Bell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var href = "";

function watchHref(options) {
    setTimeout(function () {

        // if href has changed, check the cloud project name
        if (href != document.location.href) {
            href = document.location.href;
            checkCloudProject(href, options);
        }

        // continue the loop
        watchHref(options);

    }, 2000);
}

function checkCloudProject(href, options) {
  if (isProductionProject(href, options)) {
	  showMessage(options);
  } else {
	  hideMessage();
  }
}

function isProductionProject(href, options) {
	var projectName = "";

	// A Google Cloud Console URL looks like this:
	// https://console.cloud.google.com/appengine?project=PROJECT_NAME
	if (href.startsWith("https://console.cloud.google.com")) {
		var matches = /project=([\w-]+)/.exec(href);
        projectName = matches[1] || "";
	}

    // An AppEngine Datastore Admin URL looks like this:
    // https://ah-builtin-python-bundle-dot-PROJECT_NAME.appspot.com/_ah/datastore_admin
	else if (href.startsWith("https://ah-builtin-python-bundle")) {
		var matches = /ah-builtin-python-bundle-dot-([\w-]+)\.appspot\.com/.exec(href);
        projectName = matches[1] || "";
	}

	// check if the project name matches any of the patterns
	return _.some(options.patterns, function(pattern) {
		return projectName.match(pattern);
	});
}

function showMessage(options) {
    if (!$("#production-warning-message").length) {

        var div = $("<div id='production-warning-message'></div>");
        div.css("position", "fixed");
        div.css("top", "50vh");
        div.css("width", "100%");
        div.css("text-align", "center");
        div.css("margin", "0 auto");
        div.css("z-index", "1000");
        div.css("pointer-events", "none");

        var innerDiv = $("<div></div>");
        innerDiv.text(options.message);
        innerDiv.css("color", options.color);
        innerDiv.css("font-weight", "bold");
        innerDiv.css("font-size", "100px");
        innerDiv.css("opacity", "0.1");
        innerDiv.css("transform", "translateY(-50%)");

        div.append(innerDiv);
        $("body").append(div);
	}
}

function hideMessage() {
	$("#production-warning-message").remove();
}

loadOptionsFromStorage(function(options) {
    watchHref(options);
});
