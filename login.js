// var op = require('http://webitcloud.net..../func');

//var urlc = "https://wquizz.herokuapp.com/"
var urlc = "http://localhost:3000/"
$(document).ready(function () {

        //efectuar login


        $("#btnLogin").click(function () {
                console.log("entrei");

                var user1 = $("#user1").val();
                var passeUser = $("#pwd1").val();


                //console.log(user);


                $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/login?user1=" + user1 + "&passeUser=" + passeUser,
                        contentType: "application/json"
                }).done(function (data) {
                        console.log(data);
                        if (data === undefined) {
                                console.log("erro");
                        }
                        else {
                                location.href = 'perguntas.html';
                                /*$("html").html(perguntas.html);
                                $("body").html(perguntas.html);*/
                                console.log("sucesso");
                        }
                });
        });
        $("#registo").click(function () {
                $("#div_login").empty();
                $("#div_login").css({ "height": "540px", "top": "35%" });
                // <img src="https://webitcloud.net/PW/1617/ACJ/wQuizz/imagens/logoA.png" class="img-responsive" id="logoA">
                $("#div_login").append('<center> <img src="imagens/logoA.png" class="img-responsive" id="logoA"> </center><center><form><br><br><label for="usr" id="name">Nome:</label><br><input id="user" class="username ng-pristine ng-valid ng-empty ng-touched" ng-model="gameId" type="text"><br><br><label for="usr" id="passe"><Password:</label><input type="password" class="form-control" id="pwd"><br><label for="usr" id="passConf">Confirmar Password:</label><input type="password" class="form-control" id="pwd2"><br><label for="usr" id="mail">E-mail:</label><input type="email" class="form-control" id="email"><br><label for="usr" id="mailConf">Confirmar E-mail:</label><br><input type="email" class="form-control" id="emailConf"><br><button id="btnRegistar" type="submit" class="btn btn-greyscale join ng-binding" blocking="">          Registar        </button><br><br><br><br</form></center>>');
                $("#logo").css({ "width": "350px", "height": "250px" });



                //efectuar registo

                $("#btnRegistar").click(function () {
                        var nome = $("#user").val();
                        var passe = $("#pwd").val();
                        var passe2 = $("#pwd2").val();
                        var email = $("#email").val();
                        var email2 = $("#emailConf").val();

                        if (passe == passe2 && email == email2) {
                                //  var data = JSON.stringify({ passe: passe, nome: nome, email: email });
                                console.log("true")
                                $.ajax({
                                        type: "GET",
                                        url: urlc + "/registo?nome=" + nome + "&passe=" + passe + "&email=" + email,
                                        contentType: "application/json"
                                });
                        }
                        else {
                                console.log("false")
                        }

                });



        });

        //Escolher tipo de Jogo
        //Abre os temas disponiveis

        $("#single").click(function () {


                console.log("entrei")
                $("#div_tipoJogo").empty();
                $("#div_tipoJogo2").empty();
                $("#div_tipoJogo2").append(" <div class='row' id=div_tipoJogo2'><div class='col-sm-2'></div><div class='col-sm-8'><br><br><br><h3 id='tema_Jogo'>Selecione o Tema para Jogar:</h3><br></div><div class='col-sm-2'></div></div>");
                var nomes = [];
                var i = 0;
                var nivel = 1;
                $.ajax({
                        type: "GET",
                        url: "http://localhost:3000/temas",
                        contentType: "application/json"
                }).done(function (data) {
                        var temas = '<div class="row" id="div_temas">';//criar botao random
                        var cont = 0;
                        //nomes[i]='random';
                        // i++;
                        $.each(data, function (key, data) {
                                //+="criar botao html"+data.nome_tema;
                                temas += "<div class='col-sm-3'><center><div  id='temasSingle'><center><div class='div_imag_tema' id='" + data.nome_tema + "'><img src='imagens/" + data.nome_tema + ".jpg' class='img-responsive' id='logoTema'><p>" + data.nome_tema + "</p></div></center></div></center></div>";
                                nomes[i] = data.nome_tema;
                                i++;
                                cont++;

                        });
                        $("#div_tipoJogo2").append(temas + "</div>");

                        //Percorre todos os temas
                        for (var j = 0; j < i; j++) {
                                $("#" + nomes[j]).click(function () {
                                        $("#div_tipoJogo").empty();
                                        $("#div_tipoJogo2").empty();
                                        var perguntasID = 0;
                                        var idObj = $(this).attr('id');
                                        console.log($(this).attr('id'));
                                        //cria o jogo do utilizador
                                        //  $.ajax({
                                        //         type: "GET",
                                        //         url: "http://localhost:3000/jogo?nivel=" + +"&tema="+nomes[j],
                                        //         contentType: "application/json"
                                        // });
                                        //perguntas
                                        $.ajax({
                                                type: "GET",
                                                url: "http://localhost:3000/perguntas?tema=" + idObj + "&nivel=" + 1 + "&nAleatorio=" + 6,
                                                contentType: "application/json"
                                        }).done(function (data) {
                                                console.log(data[1]);
                                                console.log("hh" + data);
                                                for(var p=0; p<6; p++){//ir buscar cada pergunta ao array data
                                                        var pergunta = '<div class="row">';
                                                        console.log("hh2");
                                                        perguntasID = data[p].id_pergunta;
                                                        pergunta = "<div class='col-sm-3'><center><div><p>" + data[p].pergunta + "</p></div></center></div>";
                                                        $("#div_tipoJogo2").append(pergunta + "</div>");
                                                        var respostas = '<div class="row">';
                                                        var tipoPergunta = data[p].id_tipo_pergunta;
                                                        var t=false;
                                                        //respostas
                                                        $.ajax({
                                                                type: "GET",
                                                                url: "http://localhost:3000/respostas?perguntaID=" + perguntasID ,
                                                                contentType: "application/json"
                                                        }).done(function (data) {
                                                                console.log("hh" + data);
                                                                $.each(data, function (key, data) {
                                                                        console.log("hh2");
                                                                        //perguntas[pID] = data.id_pergunta;
                                                                        respostas += "<div class='col-sm-3'><center><div><p>" + data.resposta + "</p></div></center></div>";

                                                                });
                                                                $("#div_tipoJogo").append(respostas + "</div>");
                                                        });
                                                        if(t==false){break;}
                                                }
                                                //em vez de $(data, function (key, data) { colocar for()
                                        });
                                });

                }//fim for temas


                // $("#div_tipoJogo").load(res);
                });

        });

        $("#btnInicial").click(function () {
                location.href = 'perguntas.html';
        });

        $("#btnRanking").click(function () {
                $("#div_tipoJogo").empty();
                $("#div_tipoJogo2").empty();
                $("#div_tipoJogo2").append(" <div class='row' id=div_tipoJogo2'><div class='col-sm-2'></div><div class='col-sm-8'><br><br><br><h3 id='tema_Jogo'>Ranking:</h3><br></div><div class='col-sm-2'></div></div>");
                $.ajax({
                        type: "GET",
                        url: "http://localhost:3000/temas",
                        contentType: "application/json"
                }).done(function (data) {
                        var temasLista = '<div class="wrapper"><select class="temas">';//criar botao random
                        $.each(data, function (key, data) {
                                temasLista += '<option value="' + data.nome_tema + '">' + data.nome_tema + '</option>';
                        });
                        $("#div_tipoJogo").append(temasLista + '</select><input class="timeTextBox" name="timebox" maxlength="5"/></div>');
                });
                var tema = $(".temas").change(function () {
                        $(".timeTextBox").val($(".editableBox option:selected").html());
                });

                console.log(tema);
                /*$.ajax({
                        type: "GET",
                        url: "http://localhost:3000/ranking?tema="+tema,
                        contentType: "application/json"
                }).done(function(data){
                        
                });*/
        });

        $("#btnSair").click(function () {
                location.href = 'login.html';
        });


});





