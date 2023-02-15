let cloth_ids = [11, 16, 17, 29, 32, 33, 35, 37, 39, 42, 44, 61, 62, 64, 65, 38, 49, 51, 57, 66]
let model_ids = [100, 103, 104, 106, 114, 153, 107, 109, 110, 111, 115, 116, 118, 119, 120, 121, 124, 130, 131, 137]


function randint(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

let current_cloth_id = cloth_ids[randint(0,19)]
let current_model_id = model_ids[randint(0,19)]



function update_model(model_id){
    img = d3.select('.y0').select('img')
    img.attr('src', `files/tryon/${model_id}.png`)
}

function update_cloth(cloth_id){
    img = d3.select('.y1').select('img')
    img.attr('src', `files/tryon/${cloth_id}.png`)
}

function update_tryon(cloth_id, model_id){
    img = d3.select('.y2').select('img')
    img.attr('src', `files/tryon/${cloth_id}_to_${model_id}.png`)
}

function update_all(cloth_id, model_id){
    update_model(model_id)
    update_cloth(cloth_id)
    update_tryon(cloth_id, model_id)
}


let model_selection = d3.select('.y0d').selectAll('img').data(model_ids)

model_selection.enter()
                .append('img')
                .attr('src', function(d) {
                    return `files/tryon/${d}.png`
                })
                .attr('class', 'img-fluid img-thumbnail')
                .style('width', '20%')
                .on('click', function(d){
                    current_model_id = d
                    update_all(current_cloth_id, current_model_id)
                })

let cloth_selection = d3.select('.y1d').selectAll('img').data(cloth_ids)

cloth_selection.enter()
                .append('img')
                .attr('src', function(d) {
                    return `files/tryon/${d}.png`
                })
                .attr('class', 'img-fluid img-thumbnail')
                .style('width', '20%')
                .on('click', function(d){
                    current_cloth_id = d
                    update_all(current_cloth_id, current_model_id)
                })


update_all(current_cloth_id, current_model_id)
