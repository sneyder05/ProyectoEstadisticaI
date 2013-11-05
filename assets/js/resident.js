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
            
            this.behaviors.DB.getITC_IV();
        },
        events: function(){
            
        },
        behaviors: {
            DB: {
                getITC_IV: function(){
                    var getPearson = function(media, mediana, desviacionEst){
                        Resident.pp.progressBar.tbProgressbar('option','value',80);
                        
                        var pearson = (3 * (media - mediana)) / desviacionEst;
                        $('#txtCoeficientePearson').val(pearson).next().children('a').attr('data-original-title', Int.Residen.CoeficientePearson(pearson)).html(pearson.toFixed(Global.NFIX));
                        
                        Resident.behaviors.DB.drawGraphics();
                    };
                    
                    var getCoeficienteVariacion = function(desviacionEst, media){
                        Resident.pp.progressBar.tbProgressbar('option','value',70);
                        
                        var coeficiente = (desviacionEst / media) * 100;
                        $('#txtCoeficienteVariacion').val(coeficiente).next().children('a').attr('data-original-title', Int.Residen.CoeficienteVariacion(coeficiente.toFixed(0))).html(coeficiente.toFixed(0) + '%');
                        
                        getPearson($('#txtMedia').val(), $('#txtMediana').val(), $('#txtDesviacionEstandar').val());
                    };
                    
                    var getDesviacionEstandar = function(varianza){
                        Resident.pp.progressBar.tbProgressbar('option','value',60);
                        
                        var desviacion = Math.sqrt(varianza);
                        $('#txtDesviacionEstandar').val(desviacion).next().children('a').attr('data-original-title', Int.Residen.DesviacionEstandar(desviacion.toFixed(0))).html(desviacion.toFixed(0));
                        
                        getCoeficienteVariacion(desviacion, $('#txtMedia').val());
                    };
                    
                    var getVarianza = function(media){
                        Resident.pp.progressBar.tbProgressbar('option','value',50);
                        
                        $.DB.execute({
                            sql: 'SELECT SUM((RESIDENT - ?) * (RESIDENT - ?)) / (SELECT COUNT(RESIDENT) FROM DATOS_EST) AS VARIANZA FROM DATOS_EST',
                            data: [media, media],
                            onSuccess: function(SQLTr, SQLRs){
                                if(SQLRs.rows.length > 0){
                                    var row = SQLRs.rows.item(0);
                                    $('#txtVarianza').val(row.VARIANZA).next().children('a').attr('data-original-title', 'No tiene interpretacion').html(row.VARIANZA.toFixed(Global.NFIX));
                                }
                                else{
                                    alert('No hay datos para analizar');
                                }
                                
                                getDesviacionEstandar($('#txtVarianza').val());
                            }
                        });
                    };
                    
                    var getRango = function(){
                        Resident.pp.progressBar.tbProgressbar('option','value',40);
                        
                        $.DB.execute({
                            sql: 'SELECT MAX(RESIDENT) - MIN(RESIDENT) AS RANGO FROM DATOS_EST',
                            onSuccess: function(SQLTr, SQLRs){
                                if(SQLRs.rows.length > 0){
                                    var row = SQLRs.rows.item(0);
                                    $('#txtRango').val(row.RANGO).next().children('a').attr('data-original-title', Int.Residen.Rango(row.RANGO)).html(row.RANGO);
                                }
                                else{
                                    alert('No hay datos para analizar');
                                }
                                
                                getVarianza($('#txtMedia').data('media'));
                            }
                        });
                    };
                    
                    var getMediana = function(){
                        Resident.pp.progressBar.tbProgressbar('option','value',30);
                        
                        $.DB.execute({
                            sql: 'SELECT RESIDENT,(SELECT COUNT(RESIDENT) FROM DATOS_EST) AS TN FROM DATOS_EST ORDER BY RESIDENT ASC',
                            onSuccess: function(SQLTr, SQLRs){
                                if(SQLRs.rows.length > 0){
                                    var mediana = null;
                                    try{
                                        var row = SQLRs.rows.item(0);
                                        var tamanoN = row.TN;

                                        if(tamanoN % 2 === 0){
                                            var Xn2 = SQLRs.rows.item((tamanoN / 2) - 1);
                                            var Xn2_1 = SQLRs.rows.item((tamanoN / 2));

                                            mediana = (Xn2.RESIDENT + Xn2_1.RESIDENT) / 2;
                                        }
                                        else{
                                            mediana = SQLRs.rows.item(((tamanoN + 1) / 2) - 1).RESIDENT;
                                        }
                                    }
                                    catch(err){
                                        mediana = 0;
                                    }
                                                                        
                                   $('#txtMediana').val(mediana).next().children('a').attr('data-original-title', Int.Residen.Mediana(mediana)).html(mediana);
                                }
                                else{
                                    alert('No hay datos para analizar');
                                }
                                
                                getRango();
                            }
                        });
                    };
                    
                    var getModa = function(){
                        Resident.pp.progressBar.tbProgressbar('option','value',20);
                        
                        $.DB.execute({
                            sql: 'SELECT RESIDENT,COUNT(RESIDENT) AS MODA FROM DATOS_EST GROUP BY RESIDENT HAVING COUNT(RESIDENT) = (SELECT COUNT(RESIDENT) FROM DATOS_EST GROUP BY RESIDENT LIMIT 1)',
                            onSuccess: function(SQLTr, SQLRs){
                                if(SQLRs.rows.length > 0){
                                    var row = SQLRs.rows.item(0);
                                    $('#txtModa').val(row.RESIDENT).next().children('a').attr('data-original-title', Int.Residen.Moda(row.RESIDENT)).html(row.MODA);
                                }
                                else{
                                    alert('No hay datos para analizar');
                                }
                                
                                getMediana();
                            }
                        });
                    };
                    
                    $.DB.execute({
                        sql: 'SELECT SUM(RESIDENT) AS XN, COUNT(RESIDENT) AS N, SUM(RESIDENT)/COUNT(RESIDENT) AS MEDIA FROM DATOS_EST',
                        onSuccess: function(SQLTr, SQLRs){
                            if(SQLRs.rows.length > 0){
                                var row = SQLRs.rows.item(0);
                                $('#txtMedia').val((row.XN / row.N).toFixed(Global.NFIX)).data('media', row.MEDIA).next().children('a').attr('data-original-title', Int.Residen.Media(row.MEDIA)).html(row.MEDIA);
                            }
                            else{
                                alert('No hay datos para analizar');
                            }
                            
                            getModa();
                        }
                    });
                },
                drawGraphics: function(){
                    Resident.pp.progressBar.tbProgressbar('option','value',10);
                    
                    $.DB.execute({
                        sql: 'SELECT RESIDENT, COUNT(RESIDENT) AS XI, ((COUNT(RESIDENT) * 100.0) / (SELECT COUNT(RESIDENT) FROM DATOS_EST)) AS HI FROM DATOS_EST GROUP BY RESIDENT ORDER BY RESIDENT',
                        onSuccess: function(SQLTr, SQLRs){
                            if(SQLRs.rows.length > 0){
                                var categories = [], series = [];
                                
                                for(var i = 0; i < SQLRs.rows.length; i++){
                                    var row = SQLRs.rows.item(i);
                                    var resident = row.RESIDENT;
                                    var xi = row.XI;
                                    var hi = row.HI;
                                    
                                    categories.push(resident);
                                    series.push(hi);
                                }
                                
                                $('#graphic_1').highcharts({
                                    chart: {
                                        type: 'column'
                                    },
                                    title: {
                                        text: 'Titulo'
                                    },
                                    subtitle: {
                                        text: 'Subtiulo'
                                    },
                                    xAxis: {
                                        categories: categories
                                    },
                                    yAxis: {
                                        min: 0,
                                        title: {
                                            text: null
                                        }
                                    },
                                    tooltip: {
                                        enabled: false
                                    },
                                    plotOptions: {
                                        column: {
                                            pointPadding: 0.2,
                                            borderWidth: 0
                                        }
                                    },
                                    series: [{
                                        name: 'Numero de personas en el hogar',
                                        data: series

                                    }]
                                });
                            }
                            else{
                                alert('No hay datos para graficar');
                            }
                            
                            Resident.pp.progressBar.tbProgressbar('option','value',100);
                        }
                    });
                }
            }
        }
    };
    
    Resident.init();
});