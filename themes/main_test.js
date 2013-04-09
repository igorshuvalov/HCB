jQuery(function() {		
	
	jQuery('#pop_up_box').hide();	
	$('.toggle_div2').on('click', function(evt) {
		$(".content_inner").removeClass(".pop_parent");
		$(this).parent().parent().addClass("pop_parent");
		// var pop_cnt = $(".pop_parent").children(".pop_up_text").html();
		// $(".pop_content").html(pop_cnt);
		var $caption = $('#pop_up_box');
		if (!$caption.is(':visible')) {
			$caption.show();
			$('.pop_box_out').css({
				position: 'relative',
				left: $caption.widthHidden() + 'px'
			}).animate({
				left: '0px'
			}, function() {
				//$('#toggle-caption').html('&raquo');
			});
		} else {
			$('.pop_box_out').animate({
				left: $caption.outerWidth() + 'px'  
			}, function() {
				$caption.hide();
				$('.pop_box_out').css({position:'static', left:'auto'});
				//$('#toggle-caption').html('&laquo;');
			});
		}
		return false;
	});
	
	
});
