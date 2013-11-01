/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */

Global = {
    NFIX: 3
};

Int = {
    Residen: {
        Media: function(val){
            return 'De los hogares encuestados, el numero de personas promedio es {VAL}.'.replace(/\{VAL\}/g, val);
        },
        Moda: function(val){
            return 'De los hogares encuestados, el numero mas frecuente de personas es {VAL}.'.replace(/\{VAL\}/g, val);
        },
        Mediana: function(val){
            return 'El 50% de los hogares encuestados tienen menos de {VAL} personas, el otro 50% tiene mas de {VAL} personas.'.replace(/\{VAL\}/g, val);
        },
        Rango: function(val){
            return 'La diferencia entre el valor maximo y el valor minimo de las personas en el hogares encuestados es de {VAL}.'.replace(/\{VAL\}/g, val);
        },
        DesviacionEstandar: function(val){
            return 'En promedio el numero de personas en los hogares encuestados se alejan con respecto a su media en {VAL} personas.'.replace(/\{VAL\}/g, val);
        },
        CoeficienteVariacion: function(val){
            return 'La muestra es ' + (val <= 30 ? 'Homogenea' : 'Heterogenea');
        },
        CoeficientePearson: function(val){
            if(Math.abs(val) >= 0 && Math.abs(val) <= 0.01){
                return 'El conjunto de datos investigado tiene un comportamiento simetrico';
            }
            return 'El conjunto de datos investigado tienen asimetria ' + (val < 0 ? 'negativa' : 'positiva');
        }
    }
};