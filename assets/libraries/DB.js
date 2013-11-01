/* 
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
(function(){
    $.DB = {
        DB: null,
        available: false,
        check: function(){
            if(window.openDatabase){
                this.available = true;
            }
        },
        create: function(options){
            this.check();
            
            if(!this.available){
                this.error.last = this.error.msgs['10'];
            }

            var defaults = {
                name: 'DB_0',
                version: '1.0',
                desc: 'Local database',
                sizeMB: 2,
                onCreated: function(){},
                me: null
            };
            
            var o = $.extend({}, defaults, options);

            this.DB = window.openDatabase(o.name, o.version, o.desc, o.sizeMB);
            
            this.DB.transaction(function(tx){
                tx.executeSql('DROP TABLE IF EXISTS DATOS_EST');
                
                var SQL = 
                    'CREATE TABLE IF NOT EXISTS DATOS_EST (' +
                        'INDIVIDUO INTEGER,' +
                        'EDAD INTEGER,' +
                        'ECIVIL INTEGER,' +
                        'DIRECCN INTEGER,' +
                        'INGRESOS NUMERIC(12,4),' +
                        'CATING INTEGER,' +
                        'COCHE NUMERIC(12,4),' +
                        'CATCOCHE INTEGER,' +
                        'EDUC INTEGER,' +
                        'EMPLEO INTEGER,' +
                        'RETIRO INTEGER,' +
                        'CATEMP INTEGER,' +
                        'SATLAB INTEGER,' +
                        'GENERO VARCHAR(2),' +
                        'RESIDENT INTEGER,' +
                        'INHALAM INTEGER,' +
                        'MULTILIN INTEGER,' +
                        'VOZ INTEGER,' +
                        'BUSCA INTEGER,' +
                        'INTERNET INTEGER,' +
                        'IDI INTEGER,' +
                        'ESPERA INTEGER,' +
                        'TV INTEGER,' +
                        'V�DEO INTEGER,' +
                        'CD INTEGER,' +
                        'ADP INTEGER,' +
                        'PC INTEGER,' +
                        'FAX INTEGER,' +
                        'PERIODI INTEGER,' +
                        'RESPONDE INTEGER' +
                    ');'
                
                tx.executeSql(SQL, [], function(){
                    var insert_rows = [
                        '(1,55,1,12,72,03,36,03,1,23,0,3,5,"M",4,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(2,56,0,29,153,04,77,03,1,35,0,3,4,"H",1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0)',
                        '(3,28,1,9,28,02,14,01,3,4,0,1,3,"M",3,1,0,1,0,0,1,1,1,1,1,1,1,0,1,1)',
                        '(4,24,1,4,26,02,13,01,4,0,0,1,1,"H",3,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1)',
                        '(5,25,0,2,23,01,11,01,2,5,0,2,2,"H",2,0,0,0,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(6,45,1,9,76,04,37,03,3,13,0,2,2,"H",2,0,1,1,1,0,0,0,1,1,1,0,1,0,0,1)',
                        '(7,42,0,19,40,02,20,02,3,10,0,2,2,"H",1,1,1,1,0,1,1,0,1,1,1,0,0,0,0,1)',
                        '(8,35,0,15,57,03,28,02,2,1,0,1,1,"M",1,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(9,46,0,26,24,01,12,01,1,11,0,2,5,"M",2,0,0,1,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(10,34,1,0,89,04,46,03,3,12,0,2,4,"H",6,1,0,1,0,0,1,1,1,1,1,0,0,1,1,0)',
                        '(11,55,1,17,72,03,36,03,3,2,0,1,3,"M",2,1,0,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(12,28,0,3,24,01,12,01,4,4,0,1,5,"H",1,1,0,0,1,1,0,1,1,0,0,0,1,1,1,1)',
                        '(13,31,1,9,40,02,21,02,4,0,0,1,2,"M",4,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1)',
                        '(14,42,0,8,137,04,69,03,3,3,0,1,1,"M",1,1,0,0,0,0,1,0,1,1,1,0,1,0,0,0)',
                        '(15,35,0,8,70,03,34,03,3,9,0,2,4,"H",3,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1)',
                        '(16,52,1,24,159,04,79,03,4,16,0,3,5,"H",2,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1)',
                        '(17,21,1,1,37,02,19,02,3,0,0,1,1,"H",7,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1)',
                        '(18,32,0,0,28,02,14,01,1,2,0,1,4,"M",2,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1)',
                        '(19,42,0,9,109,04,55,03,3,20,0,3,3,"M",1,1,0,0,0,1,0,0,1,1,1,0,1,0,0,1)',
                        '(20,40,1,12,117,04,58,03,2,19,0,3,5,"M",4,1,1,1,0,1,0,0,1,1,1,0,0,0,1,1)',
                        '(21,30,0,3,23,01,12,01,1,3,0,1,3,"H",1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1)',
                        '(22,48,0,14,21,01,10,01,3,2,0,1,3,"H",1,0,0,1,0,0,0,0,1,1,0,0,1,0,1,0)',
                        '(23,39,1,17,17,01,09,01,4,2,0,1,3,"H",5,1,1,1,0,0,1,0,1,1,1,0,1,1,1,1)',
                        '(24,42,1,5,34,02,17,02,2,13,0,2,3,"M",4,0,0,0,0,0,1,0,1,1,1,0,1,0,1,1)',
                        '(25,45,1,12,115,04,57,03,1,27,0,3,4,"M",5,0,0,1,0,0,1,1,1,1,1,0,0,0,0,1)',
                        '(26,51,1,10,47,02,23,02,1,9,0,2,3,"H",3,0,0,0,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(27,39,1,9,33,02,16,02,3,1,0,1,1,"H",4,1,0,0,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(28,49,0,29,135,04,68,03,2,14,0,2,5,"M",1,0,1,0,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(29,52,0,20,272,04,75,03,1,35,0,3,5,"H",1,1,1,1,0,0,1,0,1,1,1,0,0,0,0,1)',
                        '(30,53,1,29,41,02,20,02,1,9,0,2,4,"H",2,1,0,1,0,0,1,1,1,1,1,0,0,0,1,1)',
                        '(31,34,0,10,20,01,10,01,3,0,0,1,1,"M",1,1,1,1,1,9,1,1,1,0,1,1,1,1,1,1)',
                        '(32,47,1,6,22,01,11,01,3,7,0,2,4,"H",2,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(33,58,0,2,60,03,30,02,4,1,0,1,1,"H",1,1,0,0,0,0,1,1,1,1,1,1,1,0,1,1)',
                        '(34,25,1,0,58,03,28,02,3,4,0,1,2,"M",5,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1)',
                        '(35,57,1,28,92,04,46,03,2,25,0,3,5,"M",4,0,1,1,1,0,0,1,1,1,1,0,0,0,0,1)',
                        '(36,30,1,7,21,01,11,01,4,4,0,1,1,"H",2,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1)',
                        '(37,21,0,0,13,01,06,01,3,0,0,1,1,"M",2,0,0,0,0,1,0,0,1,0,0,0,1,0,1,1)',
                        '(38,24,0,5,24,01,12,01,2,2,0,1,3,"M",1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1)',
                        '(39,56,0,7,213,04,82,03,4,30,0,3,4,"M",1,1,0,1,0,0,1,1,1,1,1,1,1,0,1,1)',
                        '(40,24,0,2,19,01,10,01,2,0,0,1,3,"H",1,0,0,0,0,0,1,1,1,1,1,0,0,1,0,0)',
                        '(41,41,0,13,59,03,29,02,3,17,0,3,3,"H",1,1,0,1,1,0,1,1,1,1,1,0,0,1,1,1)',
                        '(42,57,1,30,544,04,83,03,2,39,0,3,2,"M",3,0,1,1,1,0,0,1,1,1,1,0,0,0,0,1)',
                        '(43,32,0,2,32,02,16,02,2,10,0,2,5,"H",6,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1)',
                        '(44,24,0,5,35,02,17,02,4,0,0,1,2,"H",1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1)',
                        '(45,49,1,12,35,02,17,02,1,4,0,1,3,"H",3,0,0,1,1,0,1,1,1,1,1,1,1,1,0,0)',
                        '(46,21,0,0,22,01,11,01,3,0,0,1,1,"M",2,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0)',
                        '(47,33,1,12,39,02,19,02,2,8,0,2,2,"M",5,0,0,1,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(48,56,0,12,134,04,67,03,2,19,0,3,3,"H",1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1)',
                        '(49,54,1,16,103,04,51,03,1,28,0,3,2,"H",6,1,1,1,1,0,1,1,1,1,1,0,0,1,1,0)',
                        '(50,44,1,8,240,04,75,03,4,11,0,2,3,"M",2,1,1,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(51,20,0,1,20,01,10,01,2,0,0,1,2,"H",2,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(52,47,0,15,118,04,60,03,2,26,0,3,5,"H",1,0,1,0,1,0,1,1,1,1,1,0,0,0,0,1)',
                        '(53,48,0,15,78,04,38,03,4,18,0,3,4,"M",1,0,0,1,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(54,25,0,2,68,03,34,03,4,0,0,1,2,"M",3,0,0,0,0,1,0,0,1,1,1,1,1,0,1,1)',
                        '(55,52,0,13,27,02,13,01,1,10,0,2,2,"H",1,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0)',
                        '(56,38,1,0,19,01,09,01,1,1,0,1,1,"M",2,0,0,1,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(57,65,1,5,20,01,10,01,2,10,1,2,3,"H",2,0,0,1,1,0,0,1,1,1,1,0,0,0,0,1)',
                        '(58,28,1,2,31,02,16,02,3,0,0,1,3,"H",2,0,0,1,0,0,1,1,1,1,1,0,0,0,1,1)',
                        '(59,51,1,28,51,03,26,02,2,9,0,2,3,"H",4,0,0,1,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(60,61,1,34,84,04,42,03,2,18,0,3,3,"H",2,0,0,1,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(61,46,1,10,133,04,67,03,5,16,0,3,5,"H",3,1,1,1,0,0,1,1,1,1,1,0,0,0,0,1)',
                        '(62,43,1,8,109,04,55,03,2,20,0,3,3,"M",2,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(63,28,0,7,24,01,13,01,3,2,0,1,2,"H",1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,1)',
                        '(64,39,0,6,57,03,29,02,3,12,0,2,2,"M",1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,1)',
                        '(65,37,0,16,24,01,11,01,3,7,0,2,1,"H",2,0,1,0,0,0,0,1,1,1,1,0,1,0,1,0)',
                        '(66,59,1,35,32,02,16,02,2,0,0,1,1,"H",2,0,1,0,0,0,1,0,1,1,1,0,0,0,0,1)',
                        '(67,55,0,29,65,03,32,03,4,10,0,2,4,"M",1,1,1,1,0,0,1,1,1,1,1,0,1,0,1,1)',
                        '(68,51,1,20,70,03,36,03,3,8,0,2,3,"H",2,0,1,0,0,1,1,1,1,1,1,0,0,0,0,1)',
                        '(69,48,1,28,321,04,66,03,5,11,0,2,4,"H",2,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1)',
                        '(70,40,0,4,71,03,35,03,3,6,0,2,2,"H",3,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(71,28,0,3,35,02,17,02,3,6,0,2,5,"M",1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1)',
                        '(72,39,1,16,85,04,44,03,2,21,0,3,5,"H",6,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(73,30,1,0,20,01,10,01,3,3,0,1,4,"M",4,1,0,1,0,0,1,1,1,1,1,0,1,1,1,1)',
                        '(74,40,1,5,33,02,16,02,3,15,0,3,5,"M",4,0,0,1,0,0,0,1,1,1,1,0,1,0,0,0)',
                        '(75,55,0,18,35,02,17,02,4,2,0,1,2,"M",1,1,1,0,0,0,1,1,1,1,1,1,1,1,0,0)',
                        '(76,48,1,0,50,03,25,02,2,11,0,2,3,"M",4,0,0,0,0,0,1,0,1,1,1,0,0,0,1,0)',
                        '(77,48,1,4,1.116,04,74,03,4,22,0,3,5,"H",4,1,0,1,0,0,1,1,1,1,1,1,0,0,0,1)',
                        '(78,49,1,19,89,04,45,03,2,25,0,3,5,"M",2,0,1,0,0,0,0,1,1,1,1,0,0,0,0,1)',
                        '(79,56,0,34,376,04,65,03,1,35,0,3,5,"M",1,0,1,0,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(80,44,0,22,54,03,27,02,1,21,0,3,3,"H",1,0,0,0,1,0,0,1,1,1,1,0,0,0,1,1)',
                        '(81,43,0,12,68,03,33,03,2,15,0,3,3,"H",2,0,0,0,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(82,61,1,12,117,04,60,03,4,5,0,2,4,"M",3,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1)',
                        '(83,37,0,18,29,02,15,01,5,4,0,1,4,"H",1,0,1,0,0,1,0,0,1,1,1,0,0,0,0,1)',
                        '(84,29,1,2,25,02,13,01,2,10,0,2,2,"H",2,0,0,0,1,0,1,1,1,0,1,0,0,0,0,1)',
                        '(85,30,1,10,27,02,13,01,1,3,0,1,2,"M",4,1,0,0,1,0,1,1,1,1,1,1,0,0,1,1)',
                        '(86,48,0,7,129,04,66,03,3,20,0,3,5,"H",1,0,0,1,1,1,1,1,1,1,1,0,1,0,1,0)',
                        '(87,51,1,24,140,04,71,03,1,32,0,3,4,"H",2,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0)',
                        '(88,40,1,15,57,03,30,02,4,12,0,2,3,"H",2,1,1,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(89,66,1,34,30,02,16,02,1,4,0,1,4,"M",4,0,1,1,1,0,0,1,1,1,1,0,0,0,1,1)',
                        '(90,61,1,18,23,01,11,01,2,27,1,3,4,"H",3,0,1,1,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(91,61,1,6,64,03,32,03,3,25,0,3,5,"M",2,0,1,1,1,0,1,1,1,1,1,1,0,0,0,1)',
                        '(92,32,1,10,26,02,12,01,3,5,0,2,4,"H",6,1,1,0,1,0,0,0,1,1,1,0,0,1,0,1)',
                        '(93,25,0,6,27,02,13,01,2,1,0,1,1,"H",1,1,1,0,0,1,1,0,1,1,1,0,1,1,1,1)',
                        '(94,47,0,1,28,02,14,01,3,8,0,2,3,"H",5,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1)',
                        '(95,59,1,18,209,04,77,03,2,22,0,3,5,"M",2,1,1,0,1,0,1,1,1,1,1,1,0,0,0,0)',
                        '(96,25,1,5,27,02,14,01,2,2,0,1,1,"M",3,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(97,63,1,31,478,04,73,03,1,45,0,3,4,"H",2,0,1,1,1,0,1,1,1,1,1,0,0,0,0,1)',
                        '(98,41,0,8,49,02,24,02,4,14,0,2,2,"H",2,1,0,1,0,0,1,1,1,1,1,1,0,1,1,1)',
                        '(99,66,0,24,30,02,14,01,2,1,0,1,2,"H",1,0,0,1,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(100,20,0,1,36,02,18,02,3,0,0,1,2,"H",1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,1)',
                        '(101,47,1,21,62,03,31,03,3,5,0,2,3,"H",3,0,0,1,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(102,42,0,9,49,02,25,02,1,12,0,2,3,"M",3,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(103,35,1,5,49,02,24,02,4,9,0,2,4,"M",4,1,0,1,0,0,1,1,1,1,1,0,1,1,0,1)',
                        '(104,24,0,2,23,01,12,01,4,1,0,1,3,"H",1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1)',
                        '(105,22,0,3,23,01,12,01,4,0,0,1,3,"M",1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(106,32,1,12,59,03,30,02,5,5,0,2,2,"H",4,1,1,0,0,1,1,1,1,1,1,0,1,1,0,1)',
                        '(107,50,1,20,58,03,29,02,1,8,0,2,5,"H",2,0,1,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(108,44,1,8,46,02,23,02,1,18,0,3,4,"H",2,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(109,32,0,12,31,02,15,02,4,1,0,1,1,"H",2,1,1,0,0,8,0,0,1,1,1,0,1,0,0,1)',
                        '(110,65,0,43,40,02,21,02,1,10,0,2,4,"M",1,0,0,1,0,0,1,0,1,1,1,0,0,0,0,1)',
                        '(111,47,1,21,181,04,90,03,2,21,0,3,4,"M",2,1,1,1,1,1,0,1,1,1,1,0,1,0,0,1)',
                        '(112,42,0,5,53,03,25,02,4,6,0,2,2,"M",1,0,0,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(113,48,0,29,144,04,73,03,2,14,0,2,2,"M",1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1)',
                        '(114,29,0,4,22,01,11,01,4,0,0,1,2,"H",1,0,1,1,0,1,1,1,1,1,1,1,1,0,0,1)',
                        '(115,36,0,3,43,02,20,02,2,0,0,1,1,"H",2,1,1,1,0,0,1,1,1,1,1,1,1,1,0,1)',
                        '(116,34,0,15,23,01,11,01,2,4,0,1,4,"M",1,1,0,0,0,1,0,0,1,0,1,0,0,0,1,1)',
                        '(117,41,0,22,68,03,34,03,4,0,0,1,1,"M",2,1,1,0,0,1,0,0,1,1,1,0,1,1,1,1)',
                        '(118,26,0,6,41,02,21,02,2,0,0,1,1,"H",3,0,0,1,0,0,1,1,1,1,1,0,0,0,1,1)',
                        '(119,25,0,6,23,01,12,01,4,0,0,1,1,"H",2,0,0,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(120,53,0,23,145,04,71,03,2,29,0,3,5,"H",1,1,0,0,0,0,1,0,1,1,1,0,1,0,0,0)',
                        '(121,32,1,1,33,02,17,02,2,2,0,1,3,"M",2,0,0,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(122,46,0,7,83,04,41,03,2,14,0,2,2,"M",3,1,1,1,0,0,0,1,1,1,1,0,1,1,1,1)',
                        '(123,44,1,5,39,02,19,02,1,17,0,3,5,"M",6,0,0,0,0,1,1,0,1,1,1,0,0,0,1,1)',
                        '(124,39,0,17,42,02,21,02,4,5,0,2,1,"M",1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1)',
                        '(125,39,1,14,43,02,22,02,1,11,0,2,4,"M",2,0,0,1,1,0,1,0,1,1,1,0,1,0,0,1)',
                        '(126,40,0,0,38,02,19,02,4,2,0,1,3,"M",1,0,0,0,0,0,0,1,1,1,1,0,1,0,1,1)',
                        '(127,25,0,4,59,03,28,02,4,2,0,1,2,"M",1,1,0,0,0,1,1,1,1,1,1,0,1,0,0,1)',
                        '(128,29,1,2,57,03,29,02,2,6,0,2,2,"H",4,0,1,0,0,8,0,1,1,1,1,0,1,0,1,1)',
                        '(129,23,0,0,24,01,12,01,4,0,0,1,1,"H",1,1,0,1,0,1,1,1,1,1,1,0,1,0,0,1)',
                        '(130,48,0,25,45,02,23,02,1,11,0,2,3,"H",1,0,1,0,0,0,1,1,1,1,1,0,0,0,0,1)',
                        '(131,24,0,5,22,01,11,01,2,0,0,1,2,"H",1,1,1,0,0,0,1,0,1,1,1,1,1,1,0,1)',
                        '(132,59,0,24,30,02,15,01,3,5,0,2,1,"H",3,1,0,0,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(133,31,1,2,30,02,15,02,2,3,0,1,1,"M",4,0,0,1,0,0,1,1,1,1,1,0,1,0,1,1)',
                        '(134,70,0,23,21,01,10,01,2,21,1,3,2,"M",1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(135,37,0,15,51,03,25,02,4,5,0,2,1,"H",6,1,1,0,0,0,1,0,1,1,1,0,1,0,1,1)',
                        '(136,59,1,15,43,02,21,02,3,8,0,2,3,"M",4,0,1,0,1,0,0,0,1,1,1,1,1,0,0,1)',
                        '(137,38,0,8,30,02,15,02,4,0,0,1,1,"M",2,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1)',
                        '(138,56,0,35,37,02,18,02,3,5,0,2,3,"H",1,1,1,1,0,0,0,0,1,1,1,0,1,1,1,1)',
                        '(139,48,1,19,23,01,11,01,1,7,0,2,4,"M",2,0,0,1,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(140,28,1,2,16,01,08,01,4,0,0,1,1,"H",3,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0)',
                        '(141,20,1,0,19,01,10,01,2,1,0,1,4,"H",8,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(142,68,0,23,22,01,11,01,2,24,1,3,3,"H",1,0,0,1,1,0,1,1,1,1,1,0,0,0,0,1)',
                        '(143,26,0,2,38,02,19,02,4,1,0,1,1,"H",1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1)',
                        '(144,29,1,4,74,03,37,03,4,0,0,1,5,"M",4,0,1,0,0,1,1,1,1,1,1,0,1,0,1,1)',
                        '(145,23,1,3,13,01,06,01,2,1,0,1,1,"H",4,1,1,0,0,9,1,1,1,0,1,0,1,1,1,1)',
                        '(146,61,0,37,41,02,20,02,3,21,1,3,4,"H",1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,1)',
                        '(147,39,0,12,48,02,26,02,1,6,0,2,2,"M",1,0,0,0,1,0,1,1,1,1,1,0,0,0,0,1)',
                        '(148,47,1,13,176,04,89,03,4,5,0,2,2,"M",3,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1)',
                        '(149,36,0,2,40,02,20,02,4,8,0,2,2,"H",1,1,1,0,0,1,1,0,1,1,1,1,1,0,1,1)',
                        '(150,61,0,17,837,04,73,03,2,42,0,3,5,"H",1,1,1,1,0,0,1,1,1,1,1,0,1,1,0,0)',
                        '(151,32,1,1,71,03,35,03,4,9,0,2,2,"H",2,1,0,1,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(152,28,1,0,30,02,14,01,4,5,0,2,2,"H",4,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1)',
                        '(153,66,1,46,42,02,20,02,2,10,0,2,2,"M",2,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(154,35,1,9,51,03,25,02,1,14,0,2,4,"H",2,0,0,1,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(155,55,1,23,352,04,68,03,4,23,0,3,4,"H",4,0,1,0,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(156,47,0,27,122,04,60,03,4,20,0,3,5,"M",1,0,1,1,0,1,1,1,1,1,1,0,1,0,0,1)',
                        '(157,34,1,0,38,02,20,02,3,7,0,2,2,"H",5,1,0,0,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(158,29,0,0,67,03,34,03,2,10,0,2,2,"H",1,0,0,0,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(159,36,0,5,31,02,16,02,3,0,0,1,1,"H",3,0,0,0,0,1,0,0,1,1,1,0,1,0,0,1)',
                        '(160,38,1,4,51,03,26,02,3,7,0,2,2,"H",4,0,1,0,1,0,1,1,1,1,1,0,0,0,1,1)',
                        '(161,33,1,10,35,02,17,02,4,2,0,1,3,"H",5,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1)',
                        '(162,46,1,12,88,04,43,03,2,23,0,3,4,"M",2,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0)',
                        '(163,29,0,5,60,03,30,03,4,2,0,1,3,"M",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)',
                        '(164,38,1,7,53,03,25,02,3,2,0,1,1,"M",6,0,0,1,1,0,1,1,1,1,1,0,0,0,1,1)',
                        '(165,38,0,1,42,02,21,02,2,6,0,2,2,"H",1,0,0,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(166,39,1,1,29,02,14,01,1,7,0,2,3,"M",2,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(167,34,1,3,62,03,31,03,5,2,0,1,4,"H",7,0,0,0,0,0,1,0,1,1,1,0,0,0,1,0)',
                        '(168,58,1,21,46,02,22,02,2,0,0,1,2,"H",2,0,0,1,1,0,0,1,1,1,1,0,0,0,1,1)',
                        '(169,29,0,2,31,02,15,02,1,12,0,2,2,"M",2,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1)',
                        '(170,64,0,16,16,01,08,01,4,8,1,2,2,"H",1,0,0,0,1,1,1,1,1,1,1,0,1,0,0,1)',
                        '(171,41,0,12,36,02,18,02,3,0,0,1,2,"H",2,1,1,0,0,1,0,0,1,1,1,0,0,0,1,1)',
                        '(172,44,0,24,25,02,12,01,1,1,0,1,1,"M",2,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1)',
                        '(173,60,1,38,82,04,40,03,1,28,0,3,3,"M",2,0,1,1,1,0,1,1,1,1,1,0,0,0,0,1)',
                        '(174,32,0,7,25,02,13,01,4,4,0,1,4,"M",2,0,1,1,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(175,35,0,7,37,02,19,02,3,9,0,2,4,"H",1,1,0,0,0,0,0,0,1,1,1,0,1,0,1,0)',
                        '(176,58,1,19,19,01,10,01,2,3,0,1,1,"H",2,0,0,1,0,0,1,1,1,1,1,0,0,0,0,1)',
                        '(177,37,0,15,30,02,15,02,2,6,0,2,4,"M",1,1,0,1,1,0,1,1,1,1,1,0,0,0,1,1)',
                        '(178,63,1,28,208,04,83,03,2,28,0,3,4,"M",2,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(179,22,1,0,25,02,12,01,3,0,0,1,4,"M",4,1,0,1,0,0,1,1,1,1,1,0,0,0,1,1)',
                        '(180,66,1,29,72,03,35,03,2,20,0,3,2,"M",3,0,0,0,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(181,26,0,1,19,01,09,01,1,0,0,1,1,"H",1,0,0,1,0,0,0,0,1,1,0,1,0,0,1,1)',
                        '(182,44,0,13,104,04,51,03,2,11,0,2,4,"M",1,1,0,0,0,9,1,1,1,1,1,1,0,0,0,1)',
                        '(183,41,0,9,25,02,12,01,2,2,0,1,3,"M",1,1,0,0,0,1,1,0,1,1,1,0,0,0,1,1)',
                        '(184,26,1,7,15,01,08,01,1,0,0,1,2,"H",3,0,0,1,0,0,1,1,1,0,0,0,0,0,1,0)',
                        '(185,48,0,27,371,04,75,03,4,20,0,3,2,"M",1,1,1,1,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(186,45,0,18,135,04,68,03,1,26,0,3,3,"M",1,0,0,1,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(187,26,1,1,50,03,25,02,2,5,0,2,4,"H",5,0,0,1,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(188,31,0,4,22,01,11,01,1,4,0,1,5,"M",1,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(189,54,1,15,354,04,71,03,2,36,0,3,5,"H",3,0,1,1,0,0,1,1,1,1,1,0,1,0,0,1)',
                        '(190,34,1,15,38,02,18,02,4,7,0,2,5,"H",5,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1)',
                        '(191,32,1,5,45,02,22,02,1,11,0,2,3,"H",4,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(192,35,0,12,32,02,16,02,2,12,0,2,2,"M",2,0,1,1,1,0,1,1,1,1,1,0,0,0,0,0)',
                        '(193,22,1,1,32,02,16,02,2,1,0,1,1,"H",4,0,0,0,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(194,25,0,0,30,02,15,01,3,2,0,1,5,"H",2,0,0,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(195,59,1,26,103,04,51,03,2,19,0,3,5,"M",2,0,1,1,1,0,0,0,1,1,1,0,1,0,0,1)',
                        '(196,28,1,7,15,01,08,01,5,0,0,1,2,"M",6,0,1,0,0,1,0,0,1,1,1,0,0,0,1,1)',
                        '(197,37,1,11,52,03,25,02,2,12,0,2,1,"M",3,0,0,0,1,0,1,0,1,1,1,0,0,1,1,1)',
                        '(198,43,0,7,29,02,14,01,1,3,0,1,3,"H",2,0,0,0,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(199,42,1,13,69,03,34,03,2,16,0,3,5,"M",4,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1)',
                        '(200,35,0,4,38,02,19,02,2,7,0,2,3,"M",1,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0)',
                        '(201,22,0,3,32,02,16,02,1,6,0,2,3,"H",2,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(202,55,0,22,298,04,81,03,4,28,0,3,5,"H",3,0,1,0,0,0,0,1,1,1,1,0,0,0,0,1)',
                        '(203,63,0,43,11,01,06,01,1,19,1,3,3,"H",1,1,0,0,0,1,0,1,1,1,1,1,1,0,1,1)',
                        '(204,40,1,21,61,03,32,03,3,12,0,2,4,"H",2,0,0,1,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(205,29,0,10,59,03,29,02,1,6,0,2,2,"H",1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(206,32,1,6,52,03,26,02,1,8,0,2,4,"M",2,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1)',
                        '(207,47,0,18,138,04,69,03,4,8,0,2,2,"H",5,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1)',
                        '(208,42,0,16,28,02,14,01,3,0,0,1,1,"M",1,1,0,0,0,1,1,1,1,1,1,0,1,0,1,0)',
                        '(209,50,0,3,23,01,12,01,1,1,0,1,5,"M",1,0,0,1,0,0,0,1,1,0,1,0,0,0,1,1)',
                        '(210,52,1,29,34,02,17,02,3,1,0,1,2,"M",2,1,1,0,0,0,1,1,1,1,1,1,0,0,1,1)',
                        '(211,33,1,0,26,02,13,01,1,3,0,1,5,"M",3,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(212,54,0,34,286,04,74,03,4,23,0,3,3,"H",1,0,0,1,1,1,0,0,1,1,1,0,1,0,0,1)',
                        '(213,37,1,16,32,02,16,02,1,15,0,3,5,"M",3,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(214,57,1,20,307,04,74,03,4,20,0,3,4,"M",3,0,1,1,0,1,1,0,1,1,1,0,1,0,0,1)',
                        '(215,70,1,43,11,01,06,01,2,36,1,3,5,"H",2,0,1,1,1,0,1,1,1,1,1,0,0,0,0,1)',
                        '(216,23,1,3,14,01,07,01,4,0,0,1,3,"M",4,1,1,0,0,0,0,0,1,0,1,0,1,0,0,1)',
                        '(217,55,0,30,196,04,98,03,3,17,0,3,4,"M",1,1,1,0,1,0,0,0,1,1,1,0,0,0,1,1)',
                        '(218,48,0,11,81,04,41,03,2,19,0,3,2,"H",1,0,1,0,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(219,38,0,12,40,02,20,02,2,18,0,3,4,"H",1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(220,47,1,9,65,03,33,03,1,22,0,3,4,"H",2,1,0,1,1,0,1,1,1,1,1,1,0,0,1,1)',
                        '(221,29,0,4,21,01,11,01,4,2,0,1,1,"H",2,0,0,0,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(222,27,1,3,26,02,13,01,3,0,0,1,1,"H",4,0,1,1,0,0,0,0,1,1,1,0,1,0,0,1)',
                        '(223,29,1,10,40,02,20,02,3,7,0,2,2,"M",4,1,0,1,0,1,1,0,1,1,1,1,1,0,1,1)',
                        '(224,28,0,2,26,02,13,01,1,3,0,1,2,"H",1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(225,47,1,24,55,03,27,02,3,8,0,2,4,"M",5,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1)',
                        '(226,45,1,14,22,01,11,01,3,0,0,1,1,"M",2,0,1,1,0,0,1,1,1,1,1,1,0,0,1,0)',
                        '(227,24,0,0,19,01,10,01,3,0,0,1,1,"H",3,0,1,0,0,0,0,0,1,1,1,0,1,0,1,1)',
                        '(228,41,1,13,204,04,68,03,2,20,0,3,5,"M",4,0,1,1,0,0,0,0,1,1,1,1,1,0,0,1)',
                        '(229,18,0,0,13,01,07,01,2,0,0,1,1,"H",2,0,0,1,0,0,1,1,1,1,1,0,0,0,1,1)',
                        '(230,42,0,23,140,04,70,03,3,16,0,3,3,"M",1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,1)',
                        '(231,45,1,25,46,02,23,02,4,8,0,2,2,"H",2,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0)',
                        '(232,34,1,2,40,02,20,02,5,6,0,2,1,"M",6,1,0,1,1,0,0,1,1,1,1,1,1,1,1,1)',
                        '(233,38,1,1,105,04,54,03,3,9,0,2,4,"M",4,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1)',
                        '(234,36,0,6,137,04,68,03,4,12,0,2,5,"H",3,1,1,0,0,1,0,1,1,1,1,1,1,0,0,1)',
                        '(235,19,1,0,16,01,08,01,2,0,0,1,1,"M",6,0,1,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(236,28,0,5,24,01,12,01,1,5,0,2,3,"M",2,0,0,1,0,0,1,0,1,1,1,1,0,0,1,1)',
                        '(237,41,1,19,32,02,16,02,2,12,0,2,4,"H",2,0,0,0,0,1,0,0,1,1,1,0,0,0,1,1)',
                        '(238,54,0,8,47,02,24,02,4,7,0,2,4,"M",1,1,0,1,1,0,0,1,1,1,1,0,1,1,0,1)',
                        '(239,42,0,1,207,04,71,03,3,14,0,2,5,"M",2,0,0,1,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(240,47,1,13,118,04,59,03,4,18,0,3,5,"H",2,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(241,61,0,31,288,04,71,03,4,38,0,3,5,"M",1,0,1,1,1,0,0,1,1,1,1,0,0,0,1,1)',
                        '(242,66,1,1,13,01,07,01,1,33,1,3,5,"H",2,0,1,0,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(243,51,1,17,73,03,37,03,3,3,0,1,4,"H",3,1,1,1,0,0,1,1,1,1,1,1,0,0,0,1)',
                        '(244,55,0,7,33,02,17,02,1,9,0,2,2,"M",1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(245,36,1,4,28,02,13,01,3,5,0,2,2,"H",2,0,1,1,0,0,1,0,1,1,1,0,0,0,0,1)',
                        '(246,39,1,3,63,03,31,03,3,5,0,2,4,"H",3,0,1,1,0,1,0,0,1,1,1,1,0,0,1,1)',
                        '(247,38,0,2,30,02,15,01,4,0,0,1,1,"H",1,0,0,0,0,1,1,0,1,1,1,0,1,0,1,1)',
                        '(248,44,1,11,89,04,44,03,3,15,0,3,4,"M",2,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1)',
                        '(249,52,1,25,78,04,39,03,1,27,0,3,5,"M",2,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(250,55,0,28,1.045,04,71,03,5,23,0,3,5,"M",1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1)',
                        '(251,58,1,30,97,04,49,03,1,28,0,3,5,"H",4,0,1,1,1,0,1,0,1,1,1,0,0,0,0,1)',
                        '(252,61,0,0,119,04,59,03,2,19,0,3,4,"H",1,0,0,0,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(253,64,0,18,10,01,05,01,1,6,1,2,2,"M",1,0,1,0,0,0,1,1,1,1,1,0,0,0,0,1)',
                        '(254,45,1,11,242,04,76,03,3,22,0,3,5,"M",4,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1)',
                        '(255,66,0,21,333,04,63,03,1,44,0,3,5,"H",1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,1)',
                        '(256,31,0,5,29,02,15,02,2,2,0,1,1,"M",1,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0)',
                        '(257,31,0,4,26,02,13,01,2,4,0,1,4,"H",2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1)',
                        '(258,36,1,1,56,03,29,02,4,9,0,2,5,"H",6,0,0,0,0,1,1,0,1,1,1,0,1,0,1,1)',
                        '(259,20,0,0,21,01,11,01,3,0,0,1,1,"M",3,1,1,0,1,0,0,0,1,1,1,0,0,0,0,1)',
                        '(260,40,1,0,35,02,17,02,3,4,0,1,5,"M",2,0,1,1,0,0,1,1,1,1,1,0,1,0,1,1)',
                        '(261,38,1,12,40,02,19,02,2,3,0,1,2,"H",2,1,1,0,1,0,0,1,1,1,1,0,0,0,1,1)',
                        '(262,51,0,17,89,04,43,03,2,12,0,2,4,"H",1,0,0,1,1,0,1,1,1,1,1,0,0,0,1,1)',
                        '(263,47,0,16,36,02,18,02,1,7,0,2,5,"M",1,0,1,1,0,0,1,1,1,1,1,0,0,0,0,1)',
                        '(264,31,1,10,32,02,15,02,3,4,0,1,4,"M",2,0,1,1,0,0,0,1,1,1,1,0,0,0,0,1)',
                        '(265,34,0,8,44,02,22,02,4,4,0,1,1,"M",1,1,0,0,0,1,1,0,1,1,1,1,1,0,1,1)',
                        '(266,35,1,7,41,02,20,02,2,7,0,2,3,"H",3,1,0,1,0,1,1,1,1,1,1,0,0,1,1,1)',
                        '(267,66,0,36,45,02,24,02,1,16,0,3,5,"H",1,1,1,1,0,1,0,0,1,1,1,1,1,0,0,1)',
                        '(268,63,0,11,118,04,60,03,1,14,0,2,5,"M",1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1)',
                        '(269,34,1,14,102,04,51,03,4,9,0,2,2,"M",4,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1)',
                        '(270,37,1,6,31,02,15,02,3,7,0,2,3,"M",5,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1)',
                        '(271,34,1,11,37,02,18,02,1,5,0,2,5,"H",2,0,0,1,0,0,1,0,1,1,1,0,0,0,1,0)',
                        '(272,36,1,7,109,04,56,03,4,4,0,1,1,"H",2,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1)',
                        '(273,42,0,17,42,02,22,02,4,8,0,2,4,"H",1,0,1,1,1,0,1,1,1,1,1,1,1,0,0,1)',
                        '(274,63,0,12,143,04,72,03,1,39,0,3,5,"M",1,0,0,1,1,0,1,1,1,1,1,0,0,1,0,1)',
                        '(275,30,1,5,50,03,24,02,4,5,0,2,5,"M",4,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1)',
                        '(276,58,1,5,280,04,69,03,1,37,0,3,4,"M",6,0,0,1,1,0,1,0,1,1,1,0,0,0,0,1)',
                        '(277,36,0,11,37,02,19,02,2,15,0,3,3,"M",1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(278,53,1,31,393,04,75,03,3,32,0,3,4,"M",2,1,0,0,1,0,0,1,1,1,1,0,0,0,1,1)',
                        '(279,43,0,3,86,04,43,03,4,10,0,2,2,"M",1,1,1,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(280,33,0,3,24,01,12,01,4,3,0,1,4,"M",1,1,1,0,0,1,0,1,1,1,1,0,1,1,1,1)',
                        '(281,37,1,2,88,04,43,03,4,5,0,2,3,"M",3,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1)',
                        '(282,43,1,13,66,03,34,03,3,8,0,2,3,"M",2,0,1,0,0,1,1,1,1,1,1,0,1,1,1,1)',
                        '(283,45,0,4,196,04,96,03,3,21,0,3,4,"M",1,1,0,0,0,9,1,1,1,1,1,0,1,1,0,1)',
                        '(284,37,0,5,27,02,14,01,3,15,0,3,3,"M",1,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1)',
                        '(285,19,0,0,15,01,07,01,2,0,0,1,1,"H",3,0,0,1,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(286,55,0,11,66,03,33,03,2,15,0,3,2,"H",4,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1)',
                        '(287,40,0,12,94,04,48,03,2,3,0,1,5,"H",1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1)',
                        '(288,61,0,27,11,01,05,01,3,12,1,2,2,"M",1,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0)',
                        '(289,25,1,3,20,01,10,01,1,9,0,2,2,"M",3,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0)',
                        '(290,35,0,11,116,04,59,03,5,5,0,2,3,"H",1,0,0,0,0,0,1,0,1,1,1,0,0,0,1,1)',
                        '(291,60,0,37,43,02,21,02,1,8,0,2,2,"H",1,0,0,1,1,0,1,1,1,1,1,0,0,0,0,1)',
                        '(292,37,0,9,54,03,26,02,5,11,0,2,5,"H",1,1,0,1,0,0,1,1,1,1,1,1,1,0,1,1)',
                        '(293,38,0,8,76,04,37,03,3,13,0,2,4,"M",1,0,0,0,0,9,0,0,1,1,1,0,1,0,1,1)',
                        '(294,46,0,7,36,02,18,02,2,13,0,2,2,"M",1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1)',
                        '(295,43,0,0,56,03,28,02,4,3,0,1,4,"H",1,0,1,0,0,0,0,1,1,1,1,0,0,0,0,1)',
                        '(296,40,1,18,50,03,24,02,4,5,0,2,3,"H",6,1,1,0,0,1,1,1,1,1,1,0,1,0,0,1)',
                        '(297,34,0,14,22,01,11,01,3,5,0,2,2,"M",1,0,1,0,0,1,0,0,1,1,1,0,1,0,1,1)',
                        '(298,40,1,0,33,02,17,02,5,3,0,1,2,"H",3,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1)',
                        //'(299,44,1,11,41,02,20,02,5,5,0,2,1,"M",6,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1)'
                    ];
                    
                    $(insert_rows).each(function(i, insert){
                        tx.executeSql('INSERT INTO DATOS_EST VALUES ' + insert, [], function(){
                            //console.log('Record ' + i + ' saved.');
                        });
                    });                   
                    
                    
                }, function(SQLTr, SQLEr){
                    alert('Error al crear estructura de la BD.\n' + SQLEr.message);
                });
            });
            
            if($.isFunction(o.onCreated)){
                o.onCreated.apply(o.me, []);
            }
        },
        getInstance: function(){
            return this.DB;
        },
        execute: function(options){
            var defaults = {
                data: [],
                onSuccess: function(){
                    console.log('Finished query.');
                },
                onError: function(SQLTr, SQLEr){
                    alert('Error al ejecutar script SQL: ' + SQLEr.message);
                },
                me: null
            };
            
            var o = $.extend({}, defaults, options);
            
            try{
                if(o.sql === null || o.sql === undefined || o.sql === ''){
                    throw "Invalid SQL script";
                }
                
                this.DB.transaction(function(tx){
                    tx.executeSql(o.sql, o.data, function(){
                        if($.isFunction(o.onSuccess)){
                            o.onSuccess.apply(o.me, arguments);
                        }
                    }, function(){
                        if($.isFunction(o.onError)){
                            o.onError.apply(o.me, arguments);
                        }
                    });
                });
            }
            catch(err){
                if($.isFunction(o.onError)){
                    o.onError.apply(o.me, [{message: err}]);
                }
            }
        },
        error: {
            last: null,
            msgs: {
                '10': 'Unable to create databases'
            },
            getLast: function(){
                return $.DB.error.last;
            }
        }
    }
})(jQuery);