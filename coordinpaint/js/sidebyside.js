//let sbs_div = document.getElementsByClassName("sidebyside")[0];
////console.log(sbs_div)
//
let img_ids = [118, 123, 105, 125, 121, 114, 102, 104, 116, 110, 54, 115, 52, 101, 124, 57, 113, 55, 122, 108, 117, 107, 100, 111, 112, 106, 50, 103, 119, 126, 109]
//
const n_rows = 3
const n_cols = 6
const n_pages = Math.floor(img_ids.length  / n_rows)
//
//let rows = Array.from({ length: n_rows }, (_, k) => document.createElement("div"));
//
//for(let i=0; i<rows.length; i++) {
//        rows[i].className = "row_sbs";
//        sbs_div.appendChild(rows[i]);    
//    }
//
function inset_image(col, imfile){

    let img = d3.select(col).select('img')
//    console.log(imfile)
    if (Object.keys(img._groups[0]).length == 0){
        newimg = document.createElement("img")
//        console.log(imfile)
        newimg.src = imfile
        newimg.style = "width:160%"
        newimg.className = "crop"
//        newimg.className = "image_sbs crop"
//        newimg.className = "image_sbs img-fluid img-thumbnail crop"
        col.appendChild(newimg)
    } else {
        img.attr('src', imfile)
    }

}


function fill_row(row, id){
//    s = d3.select(row).selectAll('.column_sbs')
    let cols = d3.select(row).selectAll('.column_sbs')
//    console.log(cols._groups[0].length)
//    console.log('id:', id)
    if (cols._groups[0].length == 0) {
        let cols = Array.from({ length: n_cols }, (_, k) => document.createElement("div"));
        for(let i=0; i < cols.length; i++) {
            cols[i].className = "column_sbs col";
            row.appendChild(cols[i]);    
        }

        inset_image(cols[0], `files/sidebyside/${id}_source.png`);
        inset_image(cols[1], `files/sidebyside/${id}_target.png`);
        inset_image(cols[2], `files/sidebyside/${id}_DPT.png`);
        inset_image(cols[3], `files/sidebyside/${id}_DSC.png`);
        inset_image(cols[4], `files/sidebyside/${id}_VUNET.png`);
        inset_image(cols[5], `files/sidebyside/${id}_OURS_DP.png`); 
    } else {
        let colnodes = cols._groups[0]
        inset_image(colnodes[0], `files/sidebyside/${id}_source.png`);
        inset_image(colnodes[1], `files/sidebyside/${id}_target.png`);
        inset_image(colnodes[2], `files/sidebyside/${id}_DPT.png`);
        inset_image(colnodes[3], `files/sidebyside/${id}_DSC.png`);
        inset_image(colnodes[4], `files/sidebyside/${id}_VUNET.png`);
        inset_image(colnodes[5], `files/sidebyside/${id}_OURS_DP.png`); 
    }
    
}


page = 0
let selected = img_ids.slice(page*n_rows,(page+1)*n_rows)

function update(selected, first) {
    var selection = d3.select(".sidebyside")
        .selectAll(".row_sbs").data(selected);
    
//    console.log(selected.length)
    
    if (!first){
        selection
            .transition()
            .duration(700)        
            .style("opacity", 0.).on("end", function(){
            selection.each(function(d, i) {
                fill_row(this, d)
            })
        })
            
            .transition()
            .duration(700)        
            .style("opacity", 1.)
        
            

    }
    
    if (first) {
        selection.enter()
            .append("div").attr("class", "row_sbs")
            .each(function(d, i) {
                fill_row(this, d)
            })
//            .attr('src', function(d, i){
////                console.log(`files/sidebyside/${d}_source.png`)
//                return `files/sidebyside/${d}_source.png`
//            })
    }
    
    

//    selection.enter()
//        .append("div").attr("class", "row_sbs")
//                .each(function(d) {
//                    fill_row(this, d)
//                    return d});
    

};

let isPaused = false
curr_page = -1
function changeImages(page, init=false){
    page = page % n_pages
    if (page != curr_page){
        curr_page = page
        selected = img_ids.slice(page*n_rows,(page+1)*n_rows)
        butcont = d3.select('.button_row').selectAll('div')
        butcont.attr('class', function(d) {
                        if (d==page) {return 'pagebtn selected'}
                        else {return 'pagebtn'}
                    })
        update(selected, init)
    }
}

let change_ms =7000
let pause_ms = 20000

function button_change(page, timer){
    isPaused = true
    setTimeout(function() {
        isPaused = false
    }, pause_ms);
    changeImages(page)
}

function period_change(timer) {
    if (!isPaused) {
        changeImages(curr_page+1)
    }
}


changeImages(0, init=true)

let timerId = setInterval(function() {
  period_change(timerId);
}, change_ms);

page_ids = Array.apply(null, {length: n_pages}).map(Number.call, Number)

butcont = d3.select('.button_row').selectAll('div')
                                .data(page_ids)
                                .enter()
                                .append('div')
                                .attr('class', 'pagebtn')
                                .text(function(d) {return d+1;})
                                .on('click', function(d){
                                    button_change(d, timerId)
                                })





