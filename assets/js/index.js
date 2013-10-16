/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
$(function(){
    var progressBar = $('<div/>').appendTo('#main_panel').tbProgressbar({
        value: 10,
        complete: function(){
            $('#modal_panel').hide();
            progressBar.tbProgressbar('destroy');
        }
    });
});


