<?php
/*
 * Sneyder Navia
 * fabiansneyder@gmail.com
 * Copyright 2013
 */
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Proyecto Estad&iacute;stica I</title>
        <link href="assets/css/styles.css" rel="stylesheet" media="screen">
        <link href="assets/css/graphics.css" rel="stylesheet" media="screen">
        <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    </head>
    <body>
        <div id="main_wrap">
            <div class="navbar navbar-inverse navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="javascript:">I.T.C</a>
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul id="main_menu" class="nav navbar-nav">
                            <li class="active"><a href="javascript:" data-for="index">Inicio</a></li>
                            <li><a href="javascript:" data-for="edad.html">Cuantitativa Continua</a></li>
                            <li><a href="javascript:" data-for="resident.html">Cuantitativa Discreta</a></li>
                            <li><a href="javascript:" data-for="educ.html">Cualitativa Ordinal</a></li>
                            <li><a href="javascript:" data-for="acercade.html">Acerca de...</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="main_panel" class="container">
                <div class="page-header main_title">
                    <h2>Indicadores de Tendencia Central & Variabilidad &amp; Gr&aacute;ficas</h2>
                </div>
                <div class="lead">
                    
                </div>
            </div>
        </div>
        <div id="main_footer">
            <div class="container">
                <p class="credit">Sneyder Navia Urbano <span>&COPY;</span> 2013</p>
            </div>
        </div>
        <div id="modal_panel" class="modal-backdrop fade in" tabindex="-1">
        </div>
        <!-- INCLUDE JS FILES -->
        <script src="assets/libraries/jquery.10.js"></script>
        <script src="assets/libraries/jquery.widget.js"></script>
        <script src="assets/js/functions.js"></script>
        <script src="assets/libraries/xstrap/xBootstrapAlert.js"></script>
        <script src="assets/libraries/xstrap/xBootstrapModal.js"></script>
        <script src="assets/js/Global.js"></script>
        <script src="assets/libraries/DB.js"></script>
        <script src="assets/libraries/highcharts/js/highcharts.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/libraries/tbProgressBar.js"></script>
        <script src="assets/js/index.js"></script>
    </body>
</html>