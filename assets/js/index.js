$(document).ready(function(){
    $('form').submit(function(event){

        event.preventDefault();
        let busqueda = $('input').val();
        let estadisticas = [];
    
        $.ajax({
            type: 'GET',
            url: `https://www.superheroapi.com/api.php/10227715866708543/${busqueda}`,
            dateType: 'JSON',
            success:function(resp){
                console.log(resp)
                for(key in resp.powerstats){
                    estadisticas.push({
                        y: resp.powerstats[key], label: key 
                    })
                }
                //Incertar caracterisitcas en card
                $('.super_hero').html(`
                <div class="col-12 col-md-6">
                    <h1 class="text-center">SuperHero Encontrado</h1>
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${resp.image.url}" class="img-fluid rounded-start" alt="">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-tittle">Nombre: ${resp.name}</h4>
                                    <p class="card-text">${resp.connections["group-affiliation"]}</p>
                                    <hr>
                                    <p class="card-text">Publicado por: ${resp.biography.publisher}</p>
                                    <hr>
                                    <p class="card-text">Ocupacion: ${resp.work.occupation}</p>
                                    <hr>
                                    <p class="card-text">Primera aparicion ${resp.biography["first-appearance"]}</p>
                                    <hr>
                                    <p class="card-text">Altura: ${resp.appearance.height[0]}</p>
                                    <hr>
                                    <p class="card-text">Peso: ${resp.appearance.weight[0]}</p>
                                    <hr>
                                    <p class="card-text">Aliansas: ${resp.biography.aliases}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 me-0">
                    <div id="chartContainer" style="height: 370px; width: 100%;"></div>
                </div>
                
                `) 
                var options = {
                    title: {
                        text: "Desktop OS Market Share in 2017"
                    },
                    subtitles: [{
                        text: "As of November, 2017"
                    }],
                    animationEnabled: true,
                    data: [{
                        type: "pie",
                        startAngle: 40,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: estadisticas
                    }]
                };
                $("#chartContainer").CanvasJSChart(options);
                
            },
            error:function(xhr,status){
                console.error("Error al consultar informacion: " + status)
            }
        })
    })
})