/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
var Index;
$(function(){
    Index = {
        pp: {
            progressBar: null
        },
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            this.pp.progressBar = $('<div/>').appendTo('#main_panel').tbProgressbar({
                value: 10,
                complete: function(){
                    $('#modal_panel').hide();
                    Index.pp.progressBar.tbProgressbar('destroy');
                }
            });
            
            $.DB.create({
                onCreated: this.behaviors.DB.onCreated,
                me: this
            });
        },
        events: function(){
            $(document).delegate('#main_menu a', 'click', this.behaviors.general.onSelectView);
        },
        behaviors: {
            general: {
                onSelectView: function(){
                    var link = $(this);
                    link.parent().addClass('active').siblings().removeClass('active');
                    
                    if(link.data('for') === 'index'){
                        $('#main_panel div.lead').html('');
                    }
                    else{
                        $('#main_panel div.lead').load('views/' + link.data('for'));
                    }
                }
            },
            DB: {
                onCreated: function(){
                    try{
                        if($.DB.error.getLast() !== null){
                            throw $.DB.error.getLast();
                        }
                        else{
                            this.pp.progressBar.tbProgressbar('option','value',100);
                        }
                    }
                    catch(err){
                        alert('Error:\n' + err);
                    }
                }
            }
        }
    };
    
    Index.init();
});