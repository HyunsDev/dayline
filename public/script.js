let is_line_open = false;
let line = "";
let msnry

function delay(gap){ /* gap is in millisecs */
    var then,now; 
    then=new Date().getTime(); 
    now=then; 
    while((now-then)<gap){ 
      now=new Date().getTime();  // 현재시간을 읽어 함수를 불러들인 시간과의 차를 이용하여 처리 
    } 
} 


let line_scroll = () => {
    let screen_top = $("html").scrollTop() || $("body").scrollTop();

    // $(".debug").text($(this).scrollTop() + " " + is_line_open)

    if ($(screen_top).scrollTop() > 335) { //열기
        if (is_line_open) {
            // console.log("already open");
            is_line_open = true;
        } else { 
            $(".write_line_box_2").removeClass("hide");
            $(".write_line_box_background").removeClass("background_hide");

            console.log("open")
            is_line_open = true;
        }

    } else { //닫기
        if (!is_line_open) {
            // console.log("already close");
            is_line_open = false;
        } else { 
            $(".write_line_box_2").addClass("hide");
            $(".write_line_box_background").addClass("background_hide");

            console.log("close");
            is_line_open = false;
        }
    }
}


$(window).on("scroll", function(){
    var windowWidth = $( window ).width();

    if(windowWidth < 768) {
        line_scroll()
    }
});

$(window).load(function(){
    line_scroll()

    $.ajax({
        url: "/api/read",
        type: "POST",
        dataType: "json"
    }).done(function (json) {
        if (json.result != "err") {
            json.data.forEach(e => {
                var jbRandom = Math.random();
    
                e.line = e.line.replace( /\\n/gi, '<br>');
                
                let textfill = `
                <div class="line c${Math.floor( jbRandom * 5 + 1 )} wow fadeInUp animated">
                    <div class="line_date">${e.created} 생각</div>
                    <div class="line_text">${e.line}</div>
                </div>`;
    
                $(".lines").append(textfill);
            });
    
            $(".lines").masonry({
                itemSelector: '.line',
                columnWidth: 315
            })

        }
    });
});

//At the document ready event






function go_line() {
    if (line != "") {
        $.ajax({
            url: "/api/write",
            data: {
                line: line
            },
            type: "POST",
            dataType: "json"
        }).done(function (json) {
            $("#line").val("");
            $("#line2").val("");
            var jbRandom = Math.random();

            line = line.replace( /\\n/gi, '<br>');

            let textfill = $(`
            <div class="line c${Math.floor( jbRandom * 5 + 1 )} wow fadeInUp animated">
                <div class="line_date">${json.data.date} 생각</div>
                <div class="line_text">${line}</div>
            </div>`);
            line  = ""
            $('html, body').animate({ scrollTop: 0 }, 800);
            $(".lines").prepend( textfill ).masonry('prepended', textfill );
        }).fail(function(err) {
            alert(err)
        })
    }
}

function req_line(id) {
    if (id == 2) {
        let val = $("#line2").val()
        $("#line").val(val)
        line = val
    } else {
        let val = $("#line").val()
        $("#line2").val(val)
        line = val
    }
}

$("input[type=text]").keypress(function (e) {
    if (e.keyCode == 13) {
        go_line()
    };
})

