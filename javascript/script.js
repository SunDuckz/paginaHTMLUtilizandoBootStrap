              // função sem nome(anonima) = atribuida a variavel (no caso atual na abertura da tela)
              window.onload = function(){
                $.ajax({
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    headers: { "Authorization": "Bearer test_5889d305c18fd38cfff63a4b3b5f8f"}, // precisa abrir chaves pois a escrita esta no formato JSON
                    type: "GET", // tipo da requisição
                    success: function(data){
                        loadTable(data);
                    },
                    error: function(){
                        alert("Deu erro na requisição: " + error.toString());
                    }
                })   // jquery começa com "$" sifrão
                
                $.ajax({
                    url: " https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/1",
                    headers: { "Authorization": "Bearer test_5889d305c18fd38cfff63a4b3b5f8f"}, // precisa abrir chaves pois a escrita esta no formato JSON
                    type: "GET", // tipo da requisição
                    success: function(data){
                        loadGames(data)
                    },
                    error: function(){
                        alert("Deu erro na requisição: " + error.toString());
                    }
                })   // jquery começa com "$" sifrão

            }
            
            const mapResultadoUltimoJogosWidget = {
                "v" : "<span class='victory'></span>",
                "d" : "<span class='defeat'></span>",
                "e": "<span class='draw'></span>"
            }
            
            // EXEMPLO
            //const diasDaSemanaArray = ["domingo","segunda","terça","quarta","quinta","sexta","sabado"]


            function loadTable(data){
                var tabela = document.getElementById("table")
                for (let posicaoTimes = 0; posicaoTimes < data.length; posicaoTimes++) {
                    const element = data[posicaoTimes];
                
                    var ultimosJogosArrayWidgets = [];

                    for (let result = 0; result < element.ultimos_jogos.length; result++) {
                        const historicoJogos = element.ultimos_jogos[result];
                            ultimosJogosArrayWidgets.push(mapResultadoUltimoJogosWidget[historicoJogos])

                    }
                        var arrayJogosWidgetFormat = ultimosJogosArrayWidgets.join("")

                    var tabelaAdd = '<tr>'+
                        "<td class='ranking'>" + element.posicao + "</td>" +
                        "<td class='teams'>" + element.time.nome_popular + "</td>" +
                            "<td class='text-center'>"+ element.pontos +"</td>" +
                            "<td class='text-center'>" + element.jogos +"</td>" +
                            "<td class='text-center'>"+ element.vitorias +"</td>" +
                            "<td class='text-center'>" + element.empates +"</td>" +
                            "<td class='text-center'>"+ element.derrotas +"</td>" +
                            "<td class='text-center'>"+ element.gols_pro + "</td>" +
                            "<td class='text-center'>"+ element.gols_contra +"</td>" +
                            "<td class='text-center'>"+ element.saldo_gols + "</td>" +
                            "<td class='text-center'>"+ element.aproveitamento +"</td>" +
                            "<td class='text-center'>"+ arrayJogosWidgetFormat +"</td>" +
                            "</tr>"                  
                        
                    tabela.innerHTML += tabelaAdd;


                };
                }


                function loadGames(data){
                    // for (let rodada = 0; rodada < data.length; rodada++) {
                    //     const element = data[rodada];
                        
                    // }
                    var rodada = document.getElementById("rodada")
                    rodada.innerHTML = data.nome
                    var games = document.getElementById("games")

                    for (let partida = 0; partida < data.partidas.length; partida++) {
                        const infoPartidas = data.partidas[partida];

                        let date = new Date(infoPartidas.data_realizacao_iso);
                        let dateDay = date.getDay()
                        // var Dia da semana = diaDaSemanaArray[dateDay] -> exemplo alternativo para a solução
                        // objetivo de estudo;
                        var diaDaSemanaDescricao = retornaDiaDaSemanaDescricao(dateDay);

                        var gameAdd = "<li class='game'>" +
                                            "<div class='place-time'>" +
                                                // <!-- Estadio -->
                                                "<div class='stadium-name'>"+ infoPartidas.estadio.nome_popular +"</div>" +
                                                "<strong class='matchInfo'>"+infoPartidas.data_realizacao+" • "+ diaDaSemanaDescricao +" • "+infoPartidas.hora_realizacao + "</strong>" +
                                            "</div>" +
                                            "<div class='in-game'>" + 
                                                "<div class='playing-team'>" +
                                                        "<div>"+infoPartidas.time_mandante.sigla+"</div>" +
                                                        "<img src="+infoPartidas.time_mandante.escudo+" alt='' height='30' width='30'>" +
                                                    "</div>" +
                                                    "<div>" +
                                                        "<strong>"+ infoPartidas.placar_mandante +" </strong>" +
                                                        "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-x-lg' viewBox='0 0 16 16'> <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z'/></svg>" +
                                                        "<strong> "+ infoPartidas.placar_visitante +"</strong>"+
                                                    "</div>" +
                                                "<div class='playing-team'>" +
                                                    "<img src="+ infoPartidas.time_visitante.escudo +" alt='' height='30' width='30'>" +
                                                    "<div>"+infoPartidas.time_visitante.sigla +"</div>" + 
                                                "</div>" +
                                            "</div>" +   
                                            "<div class='d-flex justify-center margin-bottom'>" + 
                                                "<a href='#' class='game-info'> Fique por Dentro </a>"+
                                            "</div>"+       
                                        "</li>"

                                    
                                games.innerHTML += gameAdd;  
                                        
                    }
                        
                    }

                    function retornaDiaDaSemanaDescricao(indiceDiaDaSemana) {
                            switch(indiceDiaDaSemana){
                                case 0:
                                    return "domingo"
                                case 1:
                                    return "Segunda-feira"
                                case 2:
                                    return "Terça-feira"
                                case 3:
                                    return "Quarta-feira"
                                case 4:
                                   return"Quinta-feira"
                                case 5:
                                    return "Sexta-feira"
                                case 6:
                                   return "Sábado"
                            }
                        
                    }
                   