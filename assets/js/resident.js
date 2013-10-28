/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
var Resident;
$(function(){
    Resident = {
        pp: {
            progressBar: null
        },
        init: function(){
            this.load();
            this.events();
        },
        load: function(){
            $('*[data-toggle]').tooltip({container: 'body'});
            
            this.pp.progressBar = $('<div/>').prependTo('#main_panel').tbProgressbar({
                value: 10,
                complete: function(){
                    $('#modal_panel').hide();
                    Resident.pp.progressBar.tbProgressbar('destroy');
                }
            });
            
            this.behaviors.DB.getITC();
        },
        events: function(){
            
        },
        behaviors: {
            DB: {
                getITC: function(){
                    $.DB.execute({
                        sql: 'SELECT SUM(RESIDENT) AS XN, COUNT(RESIDENT) AS N, SUM(RESIDENT)/COUNT(RESIDENT) AS MEDIA FROM DATOS_EST',
                        onSuccess: function(SQLTr, SQLRs){
                            if(SQLRs.rowsAffected > 0){
                                var row = SQLRs.rows.item(0);
                                $('#txtMedia').val((row.XN / row.N).toFixed(Global.NFIX)).next().children('a').attr('data-original-title', Int.Residen.Media(row.MEDIA)).html(row.MEDIA);
                            }
                            else{
                                alert('No hay datos para analizar');
                            }
                            
                            Resident.pp.progressBar.tbProgressbar('option','value',20);
                            
                            $.DB.execute({
                                sql: 'SELECT RESIDENT,COUNT(RESIDENT) AS MODA FROM DATOS_EST GROUP BY RESIDENT HAVING COUNT(RESIDENT) = (SELECT COUNT(RESIDENT) FROM DATOS_EST GROUP BY RESIDENT LIMIT 1)',
                                onSuccess: function(SQLTr, SQLRs){
                                    if(SQLRs.rowsAffected > 0){
                                        var row = SQLRs.rows.item(0);
                                        $('#txtModa').val(row.RESIDENT).next().children('a').attr('data-original-title', Int.Residen.Moda(row.RESIDENT)).html(row.MODA);
                                    }
                                    else{
                                        alert('No hay datos para analizar');
                                    }
                                    Resident.pp.progressBar.tbProgressbar('option','value',100);
                                }
                            });
                        }
                    });
                }
            }
        }
    };
    
    Resident.init();
});