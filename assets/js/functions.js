/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */

jQuery.isEmpty = function(){
    var count = 0;
    $.each(arguments, function(i, data){
        if(data !== null && data !== undefined && data !== '' && typeof(data) !== 'undefined')
            count ++;
        else
            return false
    });
    return (arguments).length === count ? false : true;
};