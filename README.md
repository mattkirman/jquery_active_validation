#jQuery ActiveValidation Plugin


An extraction from Fidjit, this plugin provides basic clientside ActiveModel style evented input validation.


##Usage

    $( element ).validate( validations, callback );


Validations are passed as a required hash to the validate method. Current options are:

   - `minimum_length`  
       An integer value specifying the minimum character count of the `<input/>` value. Values shorter than this integer will cause the validations to fail.

   - `maximum_length`  
       An integer value specifying the maximum character count of the `<input/>` value. Values longer than this integer will cause the validations to fail.

   - `format`  
       A regular expression that the `<input/>` value must match.


##Events

The plugin uses events in order to return the status of the validations. So you don't have to bind your function to these events we provide a `callback` parameter on the main validate method. This is then bound to the `didFinishValidation` event.

As a a courtesy we trigger the `didStartValidation` event whenever we start validating. No data is returned with this event, but it may be useful for cancelling any AJAX calls that may be validating your data.

The most important event is `didFinishValidation`. We pass a hash of results with this event, with values:

   - `value`       string  
       The original value passed to the validator.

   - `isValid`     boolean  
       True if the validations passed successfully, otherwise false.
       