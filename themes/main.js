jQuery(function() {
	var isSafari = function(){
		var ua = navigator.userAgent.toLowerCase(); 
		if (ua.indexOf('safari')!=-1){ 
			if(ua.indexOf('chrome')  == -1)return true
		}	
	
	};
	setTimeout(function(){
      	window.scrollTo(0,1);
	}, 0);

	var uo = {};
	var resetuo = function(){
		uo = {
				interactivity: 2,
				budget: 1,
				date: 2,
				database: 1,
				findable: 0,
				analytics: 1,
				connection: 1,			
				updates: 1,
				share: 1,

				/* bonus */
				logo: 0, 
				fingers: 1,
				xp: 1 
		};
	};
	resetuo();
	var qTags = {
		epub: 0,
		dps: 0,
		wapp: 0,
		hsite: 0,
		app: 0
	};
	var qURLs = {
		epub: 'epub.html',
		dps: 'dps.html',
		wapp: 'web_app.html',
		hsite: 'html_website.html',
		app: 'mobile_app.html'
	};
	var quns = {
		q1: { /*Functionality*/
			high: ['app'], //2
			medium: ['wapp','hsite'],
			low: ['epub','dps']
		},
		q2: { /*Budget*/
			high: ['app'],
			medium: ['wapp','hsite'], //1
			low: ['epub','dps']	
		},
		q3: { /*Time/Effort*/
			low: ['epub','dps'],
			medium: ['wapp','hsite'],
			high: ['app'] //2
		},
		q4: { /*Database Use*/
			low: ['epub','dps'],
			high: ['wapp','hsite','app'] //1
		},
		q5: { /*Findability*/
			low: ['hsite'],
			medium: ['epub','wapp'],
			high: ['dps','app']	//0
		},
		q6: { /*Analytics*/
			low: ['epub'],
			high: ['hsite','dps','wapp','app']	//1
		},
		q7: { /*Connectivity*/
			high: ['hsite'], //1
			low: ['epub','dps','wapp','app']	
		},
		q8: { /*User Updates*/
			high: ['app','dps'], //2
			medium: ['wapp','hsite'],
			low: ['epub']	
		},
		q9: { /*Sharability*/
			high: ['wapp','hsite'], //1
			low: ['epub','dps','app']	
		}
	}

	var distributePoints = function(qid,val){
		var question = quns[qid],
			questionType,
			answerCount = 0;
		for(i in question)answerCount++;
		if(answerCount == 2){questionType = 'a'}else{questionType = 'b'}
		if(questionType == 'a'){
			var tags;
			if(val == 1){tags = question.high}else{tags = question.low}		
			var i = 0,
				tagsCount = tags.length,
				pointsShare = 100/tagsCount;
			for(i=0;i<tagsCount;i++){
				var tag = tags[i];			
				qTags[tag] = qTags[tag] + pointsShare;
			}
		}
		if(questionType == 'b'){
			var aClassTags, bClassTags;
			if(val == 2){
				aClassTags = question.high;
				bClassTags = question.medium;
			}else
			if(val == 1){
				aClassTags = question.medium;
				bClassTags = question.high.concat(question.low);
			}else
			if(val == 0){
				aClassTags = question.low;
				bClassTags = question.medium;
			}
			var i = 0,
				tagsCount = aClassTags.length,
				pointsShare = (2/3*100)/tagsCount;				
			for(i=0;i<tagsCount;i++){
				var tag = aClassTags[i];
				qTags[tag] = qTags[tag] + pointsShare;
			}
			tagsCount = bClassTags.length;
			pointsShare = (1/3*100)/tagsCount;
			for(i=0;i<tagsCount;i++){
				var tag = bClassTags[i];				
				qTags[tag] = qTags[tag] + pointsShare;
			}				
		}
		//console.log(qTags)
	};
	var getMatch = function(){
		var itemName, itemValue = 0;
		for(i in qTags){
			if(qTags[i]>itemValue){
				itemValue = qTags[i];
				itemName = i
			}
		}
		return qURLs[itemName]
	};
	

	var changeAudio = function(snd){
		var audioElement = document.getElementById(''+snd+'');
		audioElement.play();		
	};



		
	jQuery(window).resize( function () {
		
	});
	
	jQuery( window ).bind( 'load', function() {
		var audioEl = document.getElementById('snd-appa-res');
		if(audioEl){
			var intAudioCheck = window.setInterval(function(){
				if(audioEl.readyState == 4){
					audioEl.play();
					window.clearInterval(intAudioCheck)
				}
			},20)			
		}		
	});
	
	
	
	jQuery('.switch').css('background', 'url("themes/images/switch.png") right center');
	// jQuery('.switch_label').attr('class','switch_label');
	
	
	if(jQuery("input[name=on_off]").is(':checked')){
		jQuery('.switch_label').attr('for','off');
	}else{
		jQuery('.switch_label').attr('for','on');
	}

	
	
	jQuery("input[name=on_off]").click(function() {
		
		//var left = $('.popup_wrapper').offset().left;
		//jQuery('.popup_wrapper').css({left:left}).animate({"left":"10px"}, "slow");
		// $(".popup_wrapper").animate({"left": "-=24.9%"}, "slow");
		
		// var $marginLefty = $('.popup_wrapper');
		// $marginLefty.animate({
			// right: parseInt($marginLefty.css('right'),10) == 0 ? $marginLefty.outerWidth() : 0
		// });
	
		var button = jQuery(this).val();
		
		if(button == 'off'){
			jQuery('.switch').css('background-position', 'left center');
			jQuery('.switch_label').attr('for','on');	
			var audioElement = document.getElementById('snd-appa');
			audioElement.play();

			setTimeout(function(){
				window.location.href = "slider_info.html";
			},3000)			
		}
		if(button == 'on'){
			jQuery('.switch').css('background-position', 'right center');
			jQuery('.switch_label').attr('for','off');
		}	 
			  
		jQuery('.result span').html(button); 
		jQuery('.result').fadeIn();

	});
	
	
	jQuery('#pop_up_box').hide();

	$('.toggle_div').on('click', function(evt) {
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
	var bonusQ = ['should_your_logo_here','will_your_users_have','which_are_you'],
		rndQ = bonusQ[Math.round(Math.random()*(bonusQ.length-1))];	
	var slidepos = 1,
		countQs = $('#surveyslide .survey_content').length+1;
	$('#prev').bind('click',function(){
		
		if(slidepos>1){
			slidepos--
		}else{
			window.location.href = 'index.html';
		}
	});	
	$('#next').bind('click',function(){	
		if(slidepos<countQs){
			slidepos++
		}else{
			distributePoints('q1',uo.interactivity)
			distributePoints('q2',uo.budget);
			distributePoints('q3',uo.date);
			distributePoints('q4',uo.database);
			distributePoints('q5',uo.findable);
			distributePoints('q6',uo.analytics);
			distributePoints('q7',uo.connection);
			distributePoints('q8',uo.updates);
			distributePoints('q9',uo.share);
			window.location.href = getMatch()	
		}
	});
	if($(".survey_content_wrapper").length){
		//$('#live_slider').touchDraggable();

		$('#surveyslide').append($('.'+rndQ+''));		
		$('#surveyslide').cycle({
			timeout: 0,
			fx: 'scrollHorz',
			next: '#next',
			prev: '#prev',
			pager:  '#survey_slide_nav',
			nowrap: 1,
			slideResize:0,
			after:   onAfter,
			onPrevNextEvent: function(isNext, zeroBasedSlideIndex, slideElement){
				var soundtype = $(slideElement).attr('data-soundtype');
				if(soundtype == 'odd'){
					var audioElement = document.getElementById('snd-chord1');							
					
				}else{
					var audioElement = document.getElementById('snd-chord2');	
				}
				audioElement.play();					
				sendGARequest(slideElement);
			} 
		});
		//$('#survey_slide_nav a').unbind();
	}
	if($('#yes_no').is(":checked")){
		$('#staus_switch span').removeClass('activeStatus');
		$('.on_led').addClass('activeStatus');
	}else{
		$('.on_led').removeClass('activeStatus');
		$('.off_led').addClass('activeStatus');
	}
	
	if($("#staus_switch").length){
		$('#staus_switch :checkbox').iphoneStyle({
			onChange: function() {
				if($('#yes_no').is(":checked")){
					$('#staus_switch span').removeClass('activeStatus');
					$('.on_led').addClass('activeStatus');
					uo.share = 1;
				}else{
					$('.on_led').removeClass('activeStatus');
					$('.off_led').addClass('activeStatus');
					uo.share = 0;
				}
				changeAudio('snd-knob')
			}
		});
		$('.yesno.ynleft').click(function(){
			$('#yes_no').prop('checked',false);
			$('#staus_switch :checkbox').trigger('change');
		});
		$('.yesno.ynright').click(function(){
			$('#yes_no').prop('checked',true);
			$('#staus_switch :checkbox').trigger('change');
		});		
	}
	
	if($("#analytics_switch").length){
		$('#analytics_switch :checkbox').iphoneStyle({
			onChange: function(){
				if($('#analytics_input').is(":checked")){
					uo.analytics = 1
				}else{
					uo.analytics = 0
				}
				changeAudio('snd-knob')
			}
		});
		$('.statslv.lvleft').click(function(){
			$('#analytics_input').prop('checked',false);
			$('#analytics_switch :checkbox').trigger('change');
		});
		$('.statslv.lvright').click(function(){
			$('#analytics_input').prop('checked',true);
			$('#analytics_switch :checkbox').trigger('change');
		});		
	}
	
	
	if($(".switch_scroll_one #live_slider").length){	
		$('.switch_scroll_one #live_slider').touchDraggable();
		var setS1Val = function(val){
			var uv = val,
				dv;
			if(uv<2){
				dv = 1;
			}
			if(uv == 2){
				dv = 2;
			}
			if(uv == 3){
				dv = 1;
			}
			if(uv == 4){
				dv = 0;
			}
			uo.date = dv;
		}
		$(".switch_scroll_one #live_slider").slider({
			orientation: "vertical",
			range: "min",
			step: 1,
			min: 0,
			max: 4,
			value: 2,
			slide: function( event, ui ) {
				$( ".switch_scroll_one #live_value" ).val( ui.value );
			},
			stop: function( event, ui ){
				setS1Val(ui.value)
			},
			change: function(event, ui){
				setS1Val(ui.value)
				changeAudio('snd-knob')
			}
		});
		$( ".switch_scroll_one #live_value" ).val( $( ".switch_scroll_one #live_slider" ).slider( "value" ) );
		$('.switch_scroll_one li').click(function(){
			$(".switch_scroll_one #live_slider").slider({value:$(this).attr('data-rot')})
			
		})
	}
	
	if($(".switch_scroll_two #live_slider2").length){	
		$('.switch_scroll_two #live_slider2').touchDraggable();
		$(".switch_scroll_two #live_slider2").slider({
			orientation: "vertical",
			range: "min",
			step: 1,
			min: 0,
			max: 2,
			value: 1,
			slide: function( event, ui ) {
				$( ".switch_scroll_two #live_value2" ).val( ui.value );
			},
			stop: function(event, ui){
				uo.budget = ui.value;
			},
			change: function(event, ui){
				uo.budget = ui.value;
				changeAudio('snd-knob')
			}
		});
		$( ".switch_scroll_two #live_value2" ).val( $( ".switch_scroll_two #live_slider2" ).slider( "value" ) );
		
		$('.switch_scroll_two li').click(function(){
			$("#live_slider2").slider({value:$(this).attr('data-rot')});			
		})		
	}
	
	if($(".switch_scroll_three #live_slider3").length){	
		$('.switch_scroll_three #live_slider3').touchDraggable();
		$(".switch_scroll_three #live_slider3").slider({
			orientation: "horizontal",
			range: "min",
			step: 1,
			min: 0,
			max: 2,
			value: 1,
			slide: function( event, ui ) {
				$( ".switch_scroll_three #live_value3" ).val( ui.value );
			},
			stop: function(event, ui){
				uo.fingers = ui.value;
				
			},
			change: function(event, ui){
				uo.fingers = ui.value;
				changeAudio('snd-dial')
			}
		});
		$( ".switch_scroll_three #live_value3" ).val( $( ".switch_scroll_three #live_slider3" ).slider( "value" ) );
		$('.switch_scroll_three .switch_vertical_text img').click(function(){
			$("#live_slider3").slider({value:$(this).attr('data-rot')})
		})
	}
	
	$('.OnOff').click(function () {
		if ($(this).hasClass('On')) {
			$('.on', this).hide();
			$('.off', this).show();
			$(this).addClass('Off').removeClass('On');
			$('.switch_val', this).val(1);
			uo.connection = 1;
		}
		else {
			$('.off', this).hide();
			$('.on', this).show();
			$(this).addClass('On').removeClass('Off');
			$('.switch_val', this).val(0);
			uo.connection = 0;
		}
		changeAudio('snd-knob')
    });	
	$('.ionoff.iontop').click(function(){
		if(uo.connection == 1){
			$('.OnOff').trigger('click');
		}		
	});
	$('.ionoff.ionbottom').click(function(){
		if(uo.connection == 0){
			$('.OnOff').trigger('click');
		}		
	});
	if($('.kna-slider').length){
		var updateKnobVal = function(sld,v,snd){
			switch(sld){
				case 'kna':
					if(v == 1){
						$('.knoba').removeClass('kna0').removeClass('kna1')
					}
					if(v == 0){
						$('.knoba').removeClass('kna0').addClass('kna1')
					}
					if(v == 2){
						$('.knoba').addClass('kna0').removeClass('kna1')
					}	
					uo.updates = v;
					if(snd){changeAudio('snd-dial')}
				case 'knb':
					if(v == 1){
						$('.knobb').addClass('knb0').removeClass('knb1');
					}
					if(v == 0){
						$('.knobb').removeClass('knb1').removeClass('knb0');
					}
					if(v == 2){
						$('.knobb').addClass('knb1').removeClass('knb0');
					}	
					uo.findable = v;
					if(snd){changeAudio('snd-dial')}					
			}
		}
		$('.kna-slider').touchDraggable();
		$('.knb-slider').touchDraggable();
		$('.knc-slider').touchDraggable();
		$('.knd-slider').touchDraggable();
		$('.kna-slider').slider({
			orientation: 'vertical',
			min:0,
			max:2,
			value:1,
			slide: function(e,ui){
				var v = ui.value;
				updateKnobVal('kna',v)
			},
			stop: function(){changeAudio('snd-dial')}
		});

		$('.knb-slider').slider({
			min:0,
			max:2,
			value:2,
			slide: function(e,ui){
				var v = ui.value;
				if(v == 1){
					$('.knobb').addClass('knb0').removeClass('knb1');
					uo.findable = 1;
				}
				if(v == 0){
					$('.knobb').removeClass('knb0').addClass('knb1');
					uo.findable = 2;
				}
				if(v == 2){
					$('.knobb').removeClass('knb0').removeClass('knb1');
					uo.findable = 0;
				}
				
			},
			stop: function(){changeAudio('snd-dial')}
		});		
		$('.knc-slider').slider({
			orientation: 'vertical',
			min:0,
			max:2,
			value:2,
			change: function(e,ui){
				var v = ui.value;
				if(v == 1){
					$('.knobc').addClass('knc0').removeClass('knc1')
				}
				if(v == 0){
					$('.knobc').removeClass('knc0').addClass('knc1')
				}
				if(v == 2){
					$('.knobc').removeClass('knc0').removeClass('knc1')
				}	
				changeAudio('snd-dial')
			}
		});
		$('.knvalc .sizelg').click(function(){
			$('.knc-slider').slider({value:$(this).attr('data-rot')})
		});
		
		
		$('.knd-slider').slider({
			orientation: 'vertical',
			min:0,
			max:2,
			value:1,
			change: function(e,ui){
				var v = ui.value;
				if(v == 1){
					$('.knobd').removeClass('knd0').removeClass('knd1')
				}
				if(v == 0){
					$('.knobd').removeClass('knd0').addClass('knd1')
				}
				if(v == 2){
					$('.knobd').addClass('knd0').removeClass('knd1')
				}
				changeAudio('snd-dial')
			}
		});
		$('.knvald .geniustype').click(function(){
			$('.knd-slider').slider({value:$(this).attr('data-rot')})
		});		
		
		$('.knvala div').click(function(){
			var v = $(this).attr('data-rot');
			$('.kna-slider').slider('value',v);
			updateKnobVal('kna',v,true);
		});
		$('.knvalb div').click(function(){
			var v = $(this).attr('data-rot');
			$('.knb-slider').slider('value',v);
			updateKnobVal('knb',v,true);
		});		
	}

	$('.connect_database .tt-ev-values').prepend('<div class="tt-ev-val set_hidden" data-val="3"><div class="tt-icon"><div class="tt-icon-i tt-card"></div></div></div>');
	if($('#connect_database_control').length){
		$('#connect_database_control').ttrotate();
	}
	
	
	$('.mobile_experience .tt-ev-values').prepend('<div class="tt-ev-val set_hidden" data-val="4"><div class="tt-icon"><div class="tt-icon-i tt-card"></div></div></div>')
	$('.mobile_experience .tt-ev-values').append('<div class="tt-ev-val set_hidden" data-val="5"><div class="tt-icon"><div class="tt-icon-i tt-card"></div></div></div>');
	
	if($('#mobile_experience').length){
		$('#mobile_experience').ttrotate();
	}
	
	$('#hdr_ev').change(function(){
		uo.interactivity = this.value;
		changeAudio('snd-dial')
	});
	$('#connect_database').change(function(){
		uo.database = this.value;
		changeAudio('snd-dial')
	});	
	jQuery(window).resize( function () {
		resizeManager();
	});
	
	jQuery( window ).bind( 'load', function() {
		resizeManager();
	});
	
	// jQuery('#surveyslide').bind( 'slide', function() {
		// resizeManager();
	// });
	
	
	jQuery('.survey_content').each(function(i){
		// jQuery(this).find('.pop_up_text').prepend('<h2>Slide '+(i+1)+'</h2>')
	});
	
});


function resizeManager() {
	valignCenter('.survey_slide_title img',0);
	//setSliderHeight();
	// setControlPosition('#analytics_switch','.content_area_mid',0);
}

function onBefore() { 
    
} 
function onAfter() { 
	var pop_cnt = '';
	jQuery('.survey_content').each(function(i){
		if(jQuery(this).is(':visible')){
			pop_cnt = jQuery(this).find(".pop_up_text").html();
		}
	});	
	$(".pop_content").html(pop_cnt);
}

function setSliderHeight() {
	if(jQuery("#surveyslide").length){
		var placeholder_height = jQuery('.survey_content_wrapper').find('.content_area_top').height();
		var slider_content_width = 0;
		var tallest = -1;
		jQuery('.survey_content').each(function(){
			if(jQuery(this).is(':visible')){
				slider_content_width = jQuery(this).find('.content_area_mid').width();
			}
			tallest = tallest > $(this).height() ? tallest : $(this).height();
		});
		var slide_height = (slider_content_width + 16 + (placeholder_height * 2));
		if(jQuery('body').outerWidth(true) > 765){
			jQuery('.content_area_mid').height(slider_content_width + 10);
			jQuery('.survey_content_wrapper').height(Math.ceil(slide_height));
		}else{
			jQuery('.content_area_mid').height(tallest + 16);
			jQuery('.survey_content_wrapper').height(Math.ceil(tallest + 16 + (placeholder_height * 2)));
		}
	}
}
 
$.fn.widthHidden = function() {
    var $self = this.eq(0); // only first element
    var $clone = $self.clone();
    $clone.css({
        position: 'absolute',
        visibility: 'hidden',
        display: 'block'
    }).appendTo(document.body);
    var w = $clone.outerWidth();
    $clone.remove();
    return w;
} 

function valignCenter(elemName, reduce) {
	var parent_height = jQuery(elemName).parent().height();
	var VMargins = 0;
	if(jQuery(elemName).height() > 0){
		VMargins = (parent_height - jQuery(elemName).height()) / 2;
	}
	VMargins = (reduce  === undefined ? VMargins : VMargins - reduce);
	if(VMargins > 0){
		jQuery(elemName).css({"padding-top":VMargins}); 
	}
}

function setControlPosition(elemName, compare, reduce) {
	if(jQuery(elemName).length){
		// jQuery(elemName).parent().parent().parent().parent(compare).css({'position':'relative'});
		// jQuery(elemName).css({'position':'relative'});
		var parent_height = jQuery(elemName).parent().parent().parent().parent(compare).height();
		var element_position = jQuery(elemName).position().top;
		var new_height = (parent_height - jQuery(elemName).height()) - element_position;
		var VMargins = 0;
		if(jQuery(elemName).height() > 0){
			VMargins = (new_height - jQuery(elemName).height()) / 2;
		}
		VMargins = (reduce  === undefined ? VMargins : VMargins - reduce);
		if(VMargins > 0){
			jQuery(elemName).css({"padding-top":VMargins}); 
		}
	}
}
var gaPageNames = [
		['how_complex_mobile_experience','/How Complex Mobile Experience'],
		['stay_up_to_date','/Stay Up To Date'],
		['should_it_easy','/Should it be easy'],
		['mobile_experience','/Mobile Experience'],
		['need_stats_slide','/Need Stats Slide'],
		['connect_database','/Connect Database'],
		['want_to_go_live','/Want to go live'],
		['whats_your_budget','/What\'s your budget'],
		['will_your_users_have','/Will your users have']
	];

function sendGARequest(slide){
	if (!window._gaq)
		return;

	var pageName = '';
	$.each(gaPageNames, function(){
		if ($(slide).hasClass(this[0])){
			pageName = this[1];
		}
	});

	if (!pageName)
		return;
	_gaq.push(['_trackPageview', pageName]);
}
 