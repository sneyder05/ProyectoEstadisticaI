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
            return 'De los hogares encuestados, el numero de personas promedio es {VAL}'.replace(/\{VAL\}/g, val);
        },
        Moda: function(val){
            return 'De los hogares encuestados, el numero mas frecuente de personas es {VAL}'.replace(/\{VAL\}/g, val);
        }
    }
};