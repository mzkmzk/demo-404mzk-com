var carousel_ul = document.querySelector('.j_carousel_ul'),
    is_start_move = false,
    carousel_ul_margin_left = -680, //以680位基准
    mousedown_start_x,
    mousedown_callback = function(event){
        event.preventDefault(); //阻止拖动图片的 浏览器默认请 
        console.log('mousedown_callback event' + event.clientX);
        is_start_move = true
        mousedown_start_x = event.clientX
    },
    mousemove_callback = function(event){
        if ( is_start_move ) {
            var move_distance = event.clientX - mousedown_start_x
            if ( move_distance >= 100 ) { //上一张 往右滑
                is_start_move = false;
                change_pic('pre')
            }else if (move_distance <= -100) { //下一张 往左滑
                is_start_move = false;
                 change_pic('next')
            }else { // 平常滑动
                carousel_ul.style.marginLeft = ( carousel_ul_margin_left  +  move_distance ) +'px';
            }
            
            
        }
        
    },
    mouseup_callback = function(event){
        is_start_move = false;

    }

document.querySelector('.j_carousel_ul').addEventListener('mousedown',mousedown_callback)
document.querySelector('.j_carousel_ul').addEventListener('mousemove',mousemove_callback)
document.querySelector('.j_carousel_ul').addEventListener('mouseup',mouseup_callback)
