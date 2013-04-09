(function ($) {

    // Rotate button
    var minDeg = 45,
        maxDeg = 135,
        current = 45,
        moved,
        deg,
        snapped,
        target,
        middleX,
        middleY,
        startX,
        stopX,
        startY,
        stopY,
        distX,
        distY,
        dist,
        dir,
        mod = document.createElement('modernizr').style,
        prefix = testPrefix(),
        touch = ('ontouchstart' in window),
        START_EVENT = touch ? 'touchstart' : 'mousedown',
        MOVE_EVENT = touch ? 'touchmove' : 'mousemove',
        END_EVENT = touch ? 'touchend' : 'mouseup';

    function testPrefix() {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            p;

        for (p in prefixes) {
            if (testProps([prefixes[p] + 'Transform'])) {
                return '-' + prefixes[p].toLowerCase();
            }
        }
        return '';
    }

    function testProps(props) {
        var i;
        for (i in props) {
            if (mod[props[i]] !== undefined) {
                return true;
            }
        }
        return false;
    }

    function getY(e) {
        return touch ? (e.originalEvent ? e.originalEvent.changedTouches[0].pageY : e.changedTouches[0].pageY) : e.pageY;
    }

    function getX(e) {
        return touch ? (e.originalEvent ? e.originalEvent.changedTouches[0].pageX : e.changedTouches[0].pageX) : e.pageX;
    }

    function move(e) {
		var data = e.data;
        e.preventDefault();
        stopX = getX(e);
        stopY = getY(e);
        distX = stopX - startX;
        distY = stopY - startY;
        dir = 1;
        moved = true;
        if (Math.abs(distX) > Math.abs(distY)) {
            dist = distX;
            dir = stopY < middleY ? 1 : -1;
        }
        else {
            dist = distY;
            dir = stopX < middleX ? -1 : 1;
        }
        deg = current + dist * dir;
        deg = deg < data.newMinDeg ? data.newMinDeg : deg;
        deg = deg > data.newMaxDeg ? data.newMaxDeg : deg;

        // Snap to value
        var snap = Math.round(deg / data.dividedBy) * data.dividedBy,
            d = deg;

        if (Math.abs(deg - snapped) > 15) {
            snapped = null;
        }
        else {
            d = snapped;
        }

        if (Math.abs(deg - snap) < 15 && snap !== snapped) {
            deg = snap;
            snapped = deg;
            d = deg;

            var index = deg / data.dividedBy,
            value = data.ref.find('.tt-ev-val').eq(index).attr('data-val'); //$('.tt-ev-val', target).eq(index).attr('data-val');
            // target.closest('.tt-ev').find('input').val(value).change();
            data.ref.find('input').val(value).change();
        }

        data.ref.find('.tt-ev-knob').attr('style', prefix + '-transform:rotate(' + d + 'deg)');

        current = deg;
        startX = stopX;
        startY = stopY;
    }

    function end(e) {
		var data = e.data;
		// alert(data.ref.attr('id'));
        e.preventDefault();
        if (moved) {
            current = Math.round(deg / data.dividedBy) * data.dividedBy;
            data.ref.find('.tt-ev-knob').attr('style', prefix + '-transform:rotate(' + current + 'deg);').data('current', current);
            // Get value
            var index = current / data.dividedBy,
                value = data.ref.children().find('.tt-ev-val').eq(index).attr('data-val'); //$('.tt-ev-val', target).eq(index).attr('data-val');

            // target.closest('.tt-ev').find('input').val(value).change();
			data.ref.find('input').val(value).change();
        }

        $(document).unbind('.ttrotate');
    }

    $.fn.ttrotate = function () {

        // Set initial values
        var that = this;
		var newMinDeg2 = 0;
		var newMaxDeg2 = 180;
		var dividedBy2 = 45;
		
		if($(that).attr('id')=='connect_database_control'){
			newMinDeg2 = 60;
			newMaxDeg2 = 120;
			dividedBy2 = 60;
		}else if($(that).attr('id')=='mobile_experience'){
			newMinDeg2 = 45;
			newMaxDeg2 = 135;
			dividedBy2 = 45;
		}
		
		// alert(this.attr('id'));
        //value = $('input', that).val(),
        //index = $('.tt-ev-val[data-val="' + value + '"]', that).index()
        //d = index > -1 ? 0 - index * 45 : 0;

        //$('.tt-ev-knob', that).attr('style', prefix + '-transform:rotate(' + d + 'deg);').data('current', d);

        // Rotate to value on input change
         $(this).find('input').change(function () {
           $(this).find('.tt-ev-val').removeClass('tt-ev-sel');

		if($(that).attr('id')=='mobile_experience'){
            var value = $(this).val(),
	            index = $(that).find('.tt-ev-val[data-val="' + value + '"]').addClass('tt-ev-sel').index(),
	            d = index > -1 ? index * 45 : 0;
		}else{
			var value = $(this).val(),
	            index = $(that).find('.tt-ev-val[data-val="' + value + '"]').addClass('tt-ev-sel').index(),
	            d = index > -1 ? index * dividedBy2 : dividedBy2;
		}

           $(that).find('.tt-ev-knob').attr('style', prefix + '-transform:rotate(' + d + 'deg);').data('current', d);
        }).change();

        // Got to value on tap
        $('.tt-ev-val div', that).bind(START_EVENT, function () {
            moved = false;
        }).bind(END_EVENT, function (e) {
            if (!moved) {
                $(that).find('input').val($(this).parent().attr('data-val')).change();
            }
        });

        $('.touch_handler', that).bind(START_EVENT, function (e) {
            e.preventDefault();
            // target = $(this).next();
            target = $(that).find('.tt-ev-knob');
            middleX = target.offset().left + target.outerWidth() / 2;
            middleY = target.offset().top + target.outerHeight() / 2;
            current = target.data('current');
            startX = getX(e);
            startY = getY(e);
            deg = current;
            snapped = current;

            $(document).bind(MOVE_EVENT + '.ttrotate',{ref:$(that),newMinDeg:newMinDeg2,newMaxDeg:newMaxDeg2,dividedBy:dividedBy2}, move).bind(END_EVENT + '.ttrotate',{ref:$(that),newMinDeg:newMinDeg2,newMaxDeg:newMaxDeg2,dividedBy:dividedBy2},end);
        });
    }

})(jQuery);
