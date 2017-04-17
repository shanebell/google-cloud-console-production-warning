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

function loadOptions() {
    loadOptionsFromStorage(function(options) {
        setOptions(options);
    })
}

function setOptions(options) {

    console.log("Setting options: %o", options);

    $("#message").val(options.message);

    $("#color").val(options.color);

    $(".pattern").remove();
    _.forEach(options.patterns, function(projectPattern) {
        addPatternInput(projectPattern);
    });
}

function saveOptions() {

    resetForm();

    // form is valid until proven otherwise
    var formValid = true;

    var options = defaultOptions();

    var messageElement = $("#message");
    if (isValidMessage(messageElement)) {
        options.message = messageElement.val();
    } else {
        formValid = false;
        markAsInvalid(messageElement);
    }

    var colorElement = $("#color");
    if (isValidColor(colorElement)) {
        options.color = colorElement.val();
    } else {
        formValid = false;
        markAsInvalid(colorElement);
    }

    options.patterns = [];
    $(".pattern input").each(function() {
        var patternElement = $(this);
        if (isValidPattern(patternElement)) {
            options.patterns.push(patternElement.val());
        } else {
            formValid = false;
            markAsInvalid(patternElement);
        }
    });

    if (formValid) {
        saveOptionsToStorage(options, function() {
            var confirmationMessage = $("#confirmation-message");
            confirmationMessage.fadeIn(500);
            setTimeout(function() {
                confirmationMessage.fadeOut(500);
            }, 1500);
        });
    } else {
        $("#error-message").fadeIn(500);
    }

}

function addPatternInput(value) {

    // create the input element
    var input = $("<input type='text' maxlength='50'>");
    input.val(value || "");

    // create a link to delete the input
    var a = $("<a href='#' class='remove-pattern'>x</a>");

    // wrap them both in a div
    var div = $("<div class='pattern'></div>");
    div.append(input);

    if ($(".pattern").length > 0) {
        div.append(a);
    }

    // append the div to the list
    var projectPatterns = $("#patterns");
    projectPatterns.append(div);

    // remove the whole div when the link is clicked
    a.on("click", function() {
        div.remove();
    });
}

function isValidMessage(messageElement) {
    var value = _.trim(messageElement.val());
    return !_.isEmpty(value);
}

function isValidColor(colorElement) {
    var value = _.trim(colorElement.val());
    return !_.isEmpty(value);
}

function isValidPattern(patternElement) {
    var value = _.trim(patternElement.val());

    // must be non-empty
    if (_.isEmpty(value)) {
        return false;
    }

    // must be a valid regular expression
    try {
        new RegExp(value);
        return true;
    } catch (e) {
        return false;
    }
}

function markAsInvalid(element) {
    element.addClass("invalid");
}

function resetForm() {
    $("#confirmation-message").hide();
    $("#error-message").hide();
    $("input").removeClass("invalid");
}

function restoreDefaults() {
    console.log("Restore defaults");
    setOptions(defaultOptions());
}

$(document).ready(function() {

    loadOptions();

    $("#save-options").on("click", function() {
        saveOptions();
    });

    $("#add-pattern").on("click", function() {
        addPatternInput("");
    });

    $("#restore-defaults").on("click", function() {
        restoreDefaults();
    });

});
