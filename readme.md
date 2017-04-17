# Google Cloud Console Production Warning - Chrome Plugin #

This is a simple Chrome plugin that checks the name of the current project open in the Google Cloud Console and if it is
a production project then it shows a big red "PRODUCTION" watermark over the page.

A project is considered a production project if it matches any of the patterns configured in the options. By default
this is any project that matches the pattern `^.*-prod$`

The text and color of the watermark can also be configured in the options ("PRODUCTION" and red by default).

The plugin runs on the following pages:

- `http://console.cloud.google.com`
- `https://*.appspot.com/_ah/datastore_admin*`

Note: the second URL is necessary to match the built in Datastore Admin Python module.

![Screenshot](app/images/screenshot.png)

## Options ##

The options can be changed by going to `chrome://extensions` and clicking "Options" on this extension.

## Installation via the Chrome web store ##

Install from here: https://chrome.google.com/webstore/detail/google-cloud-console-prod/dpihknlpffbpjaegjocpbgdickpjiohl

## Manual installation ##

- Clone this repository
- Open Chrome and navigate to chrome://extensions
- Ensure "Developer mode" is enabled
- Click "Load unpacked extension..."
- Select the directory where this repository is cloned to

The extension will run automatically whenever you have the Google Cloud Console open.
