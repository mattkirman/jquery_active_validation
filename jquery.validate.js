/**
 * jQuery ActiveValidation Plugin
 *
 * Author: Matt Kirman <matt@mattkirman.com>
 * Copyright: 2010 Imagen Technology <http://imagentech.com>, Matt Kirman <matt@mattkirman.com>
 * License: GPLv2 <http://www.opensource.org/licenses/gpl-2.0.php>
 *
 * Version: 1.0.beta
 * Requires: jQuery 1.4 or later
 *
 *
 * An extraction from Fidjit, this plugin provides clientside ActiveModel style
 * evented input validation.
 * Usage:
 *
 *    $( element ).validate( validations, callback );
 *
 *
 * Validations are passed as a required hash to the validate method. Current
 * options are:
 *
 *    - minimum_length
 *        An integer value specifying the minimum character count of the <input/>
 *        value. Values shorter than this integer will cause the validations to fail.
 *
 *    - maximum_length
 *        An integer value specifying the maximum character count of the <input/>
 *        value. Values longer than this integer will cause the validations to fail.
 *
 *    - format
 *        A regular expression that the <input/> value must match.
 *
 *
 * The plugin uses events in order to return the status of the validations. So you
 * don't have to bind your function to these events we provide a 'callback' parameter
 * on the main validate method. This is then bound to the 'didFinishValidation' event.
 *
 * As a a courtesy we trigger the 'didStartValidation' event whenever we start
 * validating. No data is returned with this event, but it may be useful for
 * cancelling any AJAX calls that may be validating your data.
 *
 * The most important event is 'didFinishValidation'. We pass a hash of results
 * with this event, with values:
 *
 *    - value       [string]
 *        The original value passed to the validator.
 *
 *    - isValid     [boolean]
 *        True if the validations passed successfully, otherwise false.
 * 
 */
(function($, undefined){
  
  var kValidations;
  
  $.fn.validate = function(validations, callback){
    kValidations = validations;
    $(this).keyup(do_validations);
    
    if (callback !== undefined) {
      $(this).bind('didFinishValidation', callback);
    }
  };
  
  
  var do_validations = function(){
    var value = $(this).attr('value');
    var v = {};
    
    $(this).trigger('didStartValidation');
    
    v.min_length = (kValidations.minimum_length !== undefined) ? validates_minimum_length_of(value) : true;
    v.max_length = (kValidations.maximum_length !== undefined) ? validates_maximum_length_of(value) : true;
    v.format = (kValidations.format !== undefined) ? validates_format_of(value, kValidations.format) : true;
    
    var isValid = true;
    for (var i in v) {
      if (v[i] === false) isValid = false;
    }
    
    $(this).trigger('didFinishValidation', {
      value: value,
      isValid: isValid
    });
  };
  
  
  var validates_minimum_length_of = function(value){
    return (value.length >= kValidations.minimum_length);
  };
  
  
  var validates_maximum_length_of = function(value){
    return (value.length <= kValidations.maximum_length);
  };
  
  
  var validates_format_of = function(value, regexp){
    return (value.match(regexp)[0] == value);
  };
  
})(jQuery);