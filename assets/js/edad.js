/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
var Edad;
$(function(){
    Edad = {
        pp: {
            progressBar: null,
            intervaloClase: 0,
            anchoClase: 0,
            limiteInferior: 0,
            intervalos: [],
            intervaloModal: null,
            intervaloAnteriorModal: null,
            n: 1
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
                    Edad.pp.progressBar.tbProgressbar('destroy');
                }
            });
            
            this.behaviors.DB.getITC_IV();
        },
        events: function(){
            $(document).delegate('#btnViewEdadTable', 'click', this.behaviors.general.onClickViewTable);
        },
        behaviors: {
            general: {
                onClickViewTable: function(){
                    console.log(Edad.pp.intervalos);
                    
                    var html = '<div class="panel panel-default">' +
                                    '<table class="table">' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>N&deg; Int</th>' +
                                                '<th>Int. Clase</th>' +
                                                '<th>X<sub>i</sub></th>' +
                                                '<th>n<sub>i</sub></th>' +
                                                '<th>h<sub>i</sub></th>' +
                                                '<th>N<sub>i</sub></th>' +
                                                '<th>H<sub>i</sub></th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tbody>';
                    
                    var niTotal = 0;
                    $.each(Edad.pp.intervalos, function(i, row){
                        var Ni = row.Ni;
                        var Hi = row.Hi;
                        var hi = row.hi;
                        
                        html += '<tr>' +
                                    '<td>' + (i + 1) + '</td>' +
                                    '<td>[' + (row.lim_inf + '-' + row.lim_sup)  + ')</td>' +
                                    '<td>' + row.Xi + '</td>' +
                                    '<td>' + row.ni +'</td>' +
                                    '<td>' + ((hi < 1 ? hi.toFixed(1) : hi.toFixed(1)) + '%') +'</td>' +
                                    '<td>' + Ni + '</td>' +
                                    '<td>' + ((Hi < 1 ? Hi.toFixed(1) : Hi.toFixed(1)) + '%') + '</td>' +
                                '</tr>';
                        
                        niTotal += row.ni;
                    });
                    
                    html += '<tr>' +
                                '<th colspan="3">Total</th>' +
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
                        width: '40%',
                        me: Edad
                    });
                }
            },
            DB: {
                getITC_IV: function(){
                    var getPearson = function(media, mediana, desviacionEst){
                        Edad.pp.progressBar.tbProgressbar('option','value',80);
                        
                        var pearson = (3 * (media - mediana)) / desviacionEst;
                        $('#txtCoeficientePearson').val(pearson).next().children('a').attr('data-original-title', Int.Edad.CoeficientePearson(pearson)).html(pearson.toFixed(Global.NFIX));
                        
                        Edad.behaviors.DB.drawGraphics();
                    };
                    
                    var getCoeficienteVariacion = function(desviacionEst, media){
                        Edad.pp.progressBar.tbProgressbar('option','value',70);
                        
                        var coeficiente = (desviacionEst / media) * 100;
                        $('#txtCoeficienteVariacion').val(coeficiente).next().children('a').attr('data-original-title', Int.Edad.CoeficienteVariacion(coeficiente.toFixed(0))).html(coeficiente.toFixed(0) + '%');
                        
                        getPearson($('#txtMedia').val(), $('#txtMediana').val(), $('#txtDesviacionEstandar').val());
                    };
                    
                    var getDesviacionEstandar = function(varianza){
                        Edad.pp.progressBar.tbProgressbar('option','value',60);
                        
                        var desviacion = Math.sqrt(varianza);
                        $('#txtDesviacionEstandar').val(desviacion).next().children('a').attr('data-original-title', Int.Edad.DesviacionEstandar(desviacion.toFixed(0))).html(desviacion.toFixed(0));
                        
                        getCoeficienteVariacion(desviacion, $('#txtMedia').val());
                    };
                    
                    getVarianza = function(media){
                        Edad.pp.progressBar.tbProgressbar('option','value',50);
                        
                        var varianza = 0;
                        $.each(Edad.pp.intervalos, function(i, intervalo){
                            varianza += intervalo.ni * Math.pow((intervalo.Xi - media), 2);
                        });
                        
                        varianza = varianza / (Edad.pp.n - 1);
                        
                        $('#txtVarianza').val(varianza).next().children('a').attr('data-original-title', 'No tiene interpretacion').html(varianza.toFixed(Global.NFIX));
                        
                        getDesviacionEstandar(varianza);
                    };
                    
                    var getMediana = function(){
                        Edad.pp.progressBar.tbProgressbar('option','value',45);
                        
                        var int_modal = Edad.pp.intervaloModal;
                        var int_ant_modal = Edad.pp.intervaloAnteriorModal;
                        
                        if(!$.isEmpty(int_modal) && !$.isEmpty(int_ant_modal)){
                            var mediana = int_modal.lim_inf + ((((Edad.pp.n / 2) - int_ant_modal.Ni) / int_modal.ni) * Edad.pp.anchoClase);
                            $('#txtMediana').val(mediana).next().children('a').attr('data-original-title', Int.Edad.Mediana(mediana.toFixed(0))).html(mediana.toFixed(0));
                        }
                        
                        getVarianza($('#txtMedia').data('media'));
                    };
                    
                    var getModa = function(){
                        Edad.pp.progressBar.tbProgressbar('option','value',40);
                        
                        var int_modal = Edad.pp.intervaloModal;
                        
                        if(!$.isEmpty(int_modal)){
                            $('#txtModa').val('[' + int_modal.lim_inf + '-' + int_modal.lim_sup + ')').next().children('a').attr('data-original-title', Int.Edad.Moda(int_modal.lim_inf, (int_modal.lim_sup - 1))).html(int_modal.lim_inf + '-' + (int_modal.lim_sup - 1));
                        }
                        
                        getMediana();
                    };
                    
                    var getMedia = function(){
                        Edad.pp.progressBar.tbProgressbar('option','value',35);
                        
                        var media = 0, n = 0;
                        $.each(Edad.pp.intervalos, function(i, row){
                            media += row.Xi * row.ni;
                            n += row.ni;
                        });
                        
                        media = media / (n <= 0 ? 1: n);
                        Edad.pp.n = (n <= 0 ? 1: n);
                        
                        $('#txtMedia').val(media).data('media', media).next().children('a').attr('data-original-title', Int.Edad.Media(media.toFixed(0))).html(media.toFixed(0));
                        
                        getModa();
                    };
                    
                    var getNis = function(){
                        Edad.pp.progressBar.tbProgressbar('option','value',30);
                        
                        var Hi = 0, Ni = 0;
                        $.each(Edad.pp.intervalos, function(i, intervalo){
                            $.DB.execute({
                                sql: 'SELECT COUNT(EDAD) AS NI,((COUNT(EDAD) * 100.0) / (SELECT COUNT(EDAD) FROM DATOS_EST)) AS HI FROM DATOS_EST WHERE EDAD >= ? AND EDAD < ?',
                                data: [intervalo.lim_inf, intervalo.lim_sup],
                                onSuccess: function(SQLTr, SQLRs){
                                    if(SQLRs.rows.length > 0){
                                        var row = SQLRs.rows.item(0);
                                        Edad.pp.intervalos[i].ni = row.NI;
                                        Edad.pp.intervalos[i].hi = row.HI;
                                        
                                        Hi += row.HI;
                                        Ni += row.NI;
                                        
                                        Edad.pp.intervalos[i].Hi = Hi;
                                        Edad.pp.intervalos[i].Ni = Ni;
                                        
                                        if(Hi > 50 && Edad.pp.intervaloModal === null){
                                            Edad.pp.intervaloModal = Edad.pp.intervalos[i];
                                            Edad.pp.intervaloAnteriorModal  = i === 0 ? Edad.pp.intervalos[i] : Edad.pp.intervalos[i-1];
                                        }
                                    }
                                    
                                    if(i === Edad.pp.intervalos.length - 1){
                                        getMedia();
                                    }
                                }
                            });
                        });
                    };
                    
                    var getIntervalos = function(){
                        Edad.pp.progressBar.tbProgressbar('option','value',25);
                        
                        for(var i = 0; i < Edad.pp.intervaloClase; i++){
                            var intervalo = {
                                lim_inf: (Edad.pp.limiteInferior + (Edad.pp.anchoClase * i)),
                                lim_sup: (Edad.pp.limiteInferior + (Edad.pp.anchoClase * (i + 1))),
                                Xi: ((Edad.pp.limiteInferior + (Edad.pp.anchoClase * i)) + (Edad.pp.limiteInferior + (Edad.pp.anchoClase * (i + 1)))) / 2
                            };
                            
                            Edad.pp.intervalos.push(intervalo);
                        }
                        
                        getNis();
                    };
                    
                    var getRango = function(){
                        Edad.pp.progressBar.tbProgressbar('option','value',20);
                        
                        $.DB.execute({
                            sql: 'SELECT MAX(EDAD) - MIN(EDAD) AS RANGO, MIN(EDAD) AS LIM_INF FROM DATOS_EST',
                            onSuccess: function(SQLTr, SQLRs){
                                if(SQLRs.rows.length > 0){
                                    var row = SQLRs.rows.item(0);
                                    $('#txtRango').val(row.RANGO).next().children('a').attr('data-original-title', Int.Residen.Rango(row.RANGO)).html(row.RANGO);
                                    
                                    var anchoClase = row.RANGO / Edad.pp.intervaloClase;
                                    anchoClase = anchoClase.toFixed(0);
                                    
                                    $('#txtAnchoClase').val(anchoClase).next().children('a').attr('data-original-title', Int.Edad.AnchoClase(anchoClase)).html(anchoClase);
                                    Edad.pp.anchoClase = anchoClase;
                                    Edad.pp.limiteInferior = row.LIM_INF;
                                }
                                else{
                                    alert('No hay datos para analizar');
                                }
                                
                                getIntervalos();
                            }
                        });
                    };
                    
                    $.DB.execute({
                        sql: 'SELECT COUNT(EDAD) AS N FROM DATOS_EST',
                        onSuccess: function(SQLTr, SQLRs){
                            if(SQLRs.rows.length > 0){
                                var row = SQLRs.rows.item(0);
                                var intClase = 1 + (3.3 * (Math.log(row.N) / Math.LN10));
                                intClase = intClase.toFixed(0);
                                
                                $('#txtIntClase').val(intClase).next().children('a').attr('data-original-title', Int.Edad.IntervaloClase(intClase)).html(intClase);
                                Edad.pp.intervaloClase = intClase;
                            }
                            else{
                                alert('No hay datos para analizar');
                            }
                            
                            getRango();
                        }
                    });
                },
                drawGraphics: function(){
                    Edad.pp.progressBar.tbProgressbar('option','value',85);
                    
                    var histogramCategories = [], histogramSeries = [], polygonCategories = [], polygonSeries = [], ojivaCategories = [], ojivaSeries = [];
                    
                    polygonCategories.push('');
                    polygonSeries.push(0);
                    ojivaSeries.push(0);
                    ojivaCategories.push('');
                    
                    $.each(Edad.pp.intervalos, function(i, intervalo){
                        histogramCategories.push('[' + intervalo.lim_inf + '-' + intervalo.lim_sup + ')');
                        histogramSeries.push(intervalo.hi);
                        
                        polygonCategories.push(intervalo.Xi);
                        polygonSeries.push(intervalo.hi);
                        
                        ojivaCategories.push(intervalo.lim_inf);
                        ojivaSeries.push(intervalo.Hi);
                    });
                    
                    polygonCategories.push('');
                    polygonSeries.push(0);
                    ojivaSeries.push(100);
                    ojivaCategories.push('');
                    
                    var has100 = false;
                    
                    var chart = new Highcharts.Chart({
                        chart: {
                                renderTo:'graphic_1',
                                defaultSeriesType:'column',
                                borderWidth:1,
                                borderColor:'#ccc'
                            },
                            credits: {
                                enabled:false
                            },
                            exporting: {
                                enabled:false
                            },
                            title: {
                                text: 'Histograma de frecuecias de la edad en a&ntilde;os de las personas en el hogar',
                                useHTML: true
                            },
                            subtitle: {
                                text: 'Fte: Investigacion en clase de estadistica y probabilidad'
                            },
                            tooltip:{
                                enabled: false
                            },
                            plotOptions:{
                                column:{
                                    shadow:false,
                                    borderWidth:1,
                                    borderColor:'#17080F',
                                    pointPadding:0,
                                    groupPadding:0,
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function(){
                                            return (this.y < 1 ? this.y.toFixed(1) : this.y.toFixed(0)) + '%';
                                        }
                                    }
                                }
                            },
                            xAxis:{
                                categories: histogramCategories,
                                labels:{
                                    rotation:-45,
                                    x:12,
                                    style: {
                                        fontSize:'9px',
                                        fontWeight:'bold',
                                        color:'#333'
                                    }
                                }
                            },
                            yAxis:{
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
                            series: [{
                                name:'Edad',
                                data: histogramSeries
                            }]
                        });
                        
                    Edad.pp.progressBar.tbProgressbar('option','value',90);
                        
                    $('#graphic_2').highcharts({
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Pol&iacute;gono de frecuecias de la edad en a&ntilde;os de las personas en el hogar',
                            useHTML: true
                        },
                        subtitle: {
                            text: 'Fte: Investigacion en clase de estadistica y probabilidad'
                        },
                        xAxis: {
                            categories: polygonCategories
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'hi'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            enabled: false
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true,
                                    formatter: function(){
                                        return this.y === 0 ? '' : (this.y < 1 ? this.y.toFixed(1) : this.y.toFixed(0)) + '%';
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Edad',
                            data: polygonSeries
                        }]
                    });
                    
                    Edad.pp.progressBar.tbProgressbar('option','value',95);
                    
                    $('#graphic_3').highcharts({
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Ojiva de frecuecias de la edad en a&ntilde;os de las personas en el hogar',
                            useHTML: true
                        },
                        subtitle: {
                            text: 'Fte: Investigacion en clase de estadistica y probabilidad'
                        },
                        xAxis: {
                            categories: ojivaCategories
                        },
                        yAxis: {
                            min: 0,
                            max: 100,
                            title: {
                                text: 'Hi'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            enabled: false
                        },
                        plotOptions: {
                            line: {
                                dataLabels: {
                                    enabled: true,
                                    formatter: function(){
                                        has100 = this.y === 100 && !has100 ? true : false;
                                        return this.y === 0 || has100 ? '' : (this.y < 1 ? this.y.toFixed(1) : this.y.toFixed(0)) + '%';
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Edad',
                            data: ojivaSeries
                        }]
                    });
                    
                    Edad.pp.progressBar.tbProgressbar('option','value',100);
                }
            }
        }
    };
    
    Edad.init();
});