var carousel_ul = document.querySelector('.j_carousel_ul'),
    is_start_move = false,
    carousel_ul_margin_left = -680,
    mousedown_start_x,
    mousedown_start_y,
    mousedown_end_x,
    mousedown_end_y,
    mousedown_callback = function(event){
        event.preventDefault();
        console.log('mousedown_callback event' + event.clientX);
        is_start_move = true
        mousedown_start_x = event.clientX
    },
    mousemove_callback = function(event){
        if ( is_start_move ) {
            var move_distance = event.clientX - mousedown_start_x
            if ( move_distance >= 100 ) { //上一张 往右滑
                is_start_move = false;
                move_distance = 680
                change_pic('pre')
                //carousel_ul_margin_left += ( mousedown_end_x - mousedown_start_x )
            }else if (move_distance <= -100) { //下一张 往左滑
                is_start_move = false;
                move_distance = -680
                 change_pic('next')
                //carousel_ul_margin_left += ( mousedown_end_x - mousedown_start_x )
            }else { // 平常滑动
                carousel_ul.style.marginLeft = ( carousel_ul_margin_left  +  move_distance ) +'px';
            }
            
            
        }
        
        //console.log('mousemove_callback event');
        //console.log(event)
    },
    mouseup_callback = function(event){
        is_start_move = false;
        mousedown_end_x = event.clientX
        //carousel_ul_margin_left += ( mousedown_end_x - mousedown_start_x )
        console.log('mouseup_callback event' + event.clientX);
    }

document.querySelector('.j_carousel_ul').addEventListener('mousedown',mousedown_callback)
document.querySelector('.j_carousel_ul').addEventListener('mousemove',mousemove_callback)
document.querySelector('.j_carousel_ul').addEventListener('mouseup',mouseup_callback)
