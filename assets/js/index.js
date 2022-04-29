$(document).ready(function(){
    $('form').submit(function(event){

        event.preventDefault();
        let busqueda = $('input').val();
        let parametro;
        if(isNaN(busqueda)){
            parametro = "results";
            busqueda = "search/" + busqueda
        }    
        else{
            parametro = "";  
        } 
        let estadisticas = [];
        console.log(parametro)
        $.ajax({
            type: 'GET',
            url: `https://www.superheroapi.com/api.php/10227715866708543/${busqueda}`,
            dateType: 'JSON',
            success:function(resp){
                let objt = resp;
                if(parametro != "") objt = resp.results[0];
                console.log(objt)
                for(key in objt.powerstats){
                    estadisticas.push({
                        y: objt.powerstats[key], label: key 
                    })
                }
               
                //Incertar caracterisitcas en card
                $('.super_hero').html(`
                <div class="col-12 col-md-6">
                    <h1 class="text-center">SuperHero Encontrado</h1>
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${objt.image.url}" class="img-fluid rounded-start" alt="">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-tittle">Nombre: ${objt.name}</h4>
                                    <p class="card-text">${objt.connections["group-affiliation"]}</p>
                                    <hr>
                                    <p class="card-text">Publicado por: ${objt.biography.publisher}</p>
                                    <hr>
                                    <p class="card-text">Ocupacion: ${objt.work.occupation}</p>
                                    <hr>
                                    <p class="card-text">Primera aparicion ${objt.biography["first-appearance"]}</p>
                                    <hr>
                                    <p class="card-text">Altura: ${objt.appearance.height[0]}</p>
                                    <hr>
                                    <p class="card-text">Peso: ${objt.appearance.weight[0]}</p>
                                    <hr>
                                    <p class="card-text">Aliansas: ${objt.biography.aliases}</p>
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
                        text: `Estadisticas de poder para ${resp.name}`
                    },
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

                alert("no encontrado")
                console.error("Error al consultar informacion: " + status)
            }
        })
    })
})