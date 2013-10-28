/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
var Edad;
$(function(){
    Edad = {
        pp: {
            progressBar: null
        },
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            this.behaviors.DB.getData();
        },
        events: function(){
            
        },
        behaviors: {
            DB: {
                getData: function(){
                    console.log('gettig data');
                    $.DB.execute({
                        sql: 'SELECT EDAD FROM DATOS_EST',
                        onSuccess: function(SQLTr, SQLRs){
                            if(SQLRs.rowsAffected > 0){
                                
                            }
                            else{
                                alert('No hay datos para analizar');
                            }
                        }
                    });
                }
            }
        }
    };
    
    Edad.init();
});