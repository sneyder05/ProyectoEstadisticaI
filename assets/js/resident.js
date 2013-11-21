/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
var Resident;
$(function(){
    Resident = {
        pp: {
            progressBar: null,
            tableInfo: []
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
            $(document).delegate('#btnViewResidentTable', 'click', this.behaviors.general.onClickViewTable);
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
                            sql: 'SELECT RESIDENT,COUNT(RESIDENT) AS MODA FROM DATOS_EST GROUP BY RESIDENT ORDER BY COUNT(RESIDENT) DESC',
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
                                var categories = [], series = [], pieSeries = [];
                                
                                var Hi = 0;
                                for(var i = 0; i < SQLRs.rows.length; i++){
                                    var row = SQLRs.rows.item(i);
                                    var resident = row.RESIDENT;
                                    var xi = row.XI;
                                    var hi = row.HI;
                                    
                                    categories.push(resident);
                                    series.push(hi);
                                    pieSeries.push(['' + resident, hi]);
                                    
                                    Resident.pp.tableInfo.push([resident, xi, hi]);
                                }
                                
                                $('#graphic_1').highcharts({
                                    chart: {
                                        type: 'column'
                                    },
                                    title: {
                                        text: 'Diagrama de barras del numero de personas en el hogar'
                                    },
                                    subtitle: {
                                        text: 'Fte: Investigacion en clase de estadistica y probabilidad'
                                    },
                                    xAxis: {
                                        categories: categories
                                    },
                                    yAxis: {
                                        min: 0,
                                        title: {
                                            text: 'hi'
                                        },
                                        labels: {
                                            formatter: function(){
                                                return this.value + '%';
                                            }
                                        }
                                    },
                                    tooltip: {
                                        enabled: false
                                    },
                                    plotOptions: {
                                        column: {
                                            pointPadding: 0.2,
                                            borderWidth: 0,
                                            dataLabels: {
                                                enabled: true,
                                                formatter: function(){
                                                    return (this.y < 1 ? this.y.toFixed(1) : this.y.toFixed(0)) + '%';
                                                }
                                            }
                                        }
                                    },
                                    series: [{
                                        name: 'Numero de personas en el hogar',
                                        data: series
                                    }]
                                });
                                
                                $('#graphic_2').highcharts({
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: null,
                                        plotShadow: false
                                    },
                                    title: {
                                        text: 'Diagrama circular del numero de personas en el hogar'
                                    },
                                    subtitle: {
                                        text: 'Fte: Investigacion en clase de estadistica y probabilidad'
                                    },
                                    tooltip: {
                                        enabled: false
                                    },
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: true,
                                            cursor: 'pointer',
                                            dataLabels: {
                                                enabled: true,
                                                color: '#000000',
                                                connectorColor: '#000000',
                                                formatter: function() {
                                                    return '<b>'+ this.point.name +' Personas</b>: '+ (this.percentage < 1 ? this.percentage.toFixed(1) : this.percentage.toFixed(0)) +' %';
                                                }
                                            }
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        data: pieSeries
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
            },
            general: {
                onClickViewTable: function(){
                    var html = '<div class="panel panel-default">' +
                                    '<table class="table">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>X<sub>i</sub></th>' +
                                                '<th>n<sub>i</sub></th>' +
                                                '<th>h<sub>i</sub></th>' +
                                                '<th>N<sub>i</sub></th>' +
                                                '<th>H<sub>i</sub></th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tbody>';
                    
                    var Ni = 0, Hi = 0;
                    var niTotal = 0;
                    $.each(Resident.pp.tableInfo, function(i, row){
                        Ni += row[1];
                        Hi += row[2];
                        var hi = row[2];
                        
                        html += '<tr>' +
                                    '<td>' + row[0] + '</td>' +
                                    '<td>' + row[1] +'</td>' +
                                    '<td>' + ((hi < 1 ? hi.toFixed(1) : hi.toFixed(1)) + '%') +'</td>' +
                                    '<td>' + Ni + '</td>' +
                                    '<td>' + ((Hi < 1 ? Hi.toFixed(1) : Hi.toFixed(1)) + '%') + '</td>' +
                                '</tr>';
                        
                        niTotal += row[1];
                    });
                    
                    html += '<tr>' +
                                '<th>Total</th>' +
                                '<th>' + niTotal + '</th>' +
                                '<th>100%</th>' +
                                '<th colspan="2">&nbsp;</th>' +
                            '</tr>' +
                            '</tbody>'+
                            '</table>' + 
                            '<div>';
                    
                    $.xBModal({
                        title: 'Tabla de distribuci&oacute;n de frecuencias',
                        content: html,
                        closeThick: true,
                        closeOnEscape: true,
                        width: '30%',
                        me: Resident
                    });
                }
            }
        }
    };
    
    Resident.init();
});