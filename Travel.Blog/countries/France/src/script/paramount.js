


var filter_agent = null;
var filter_target = 1;





// INIT
function init() {
	'use strict';
	
	if ($('body').hasClass('page_index')) {
		init_filter();
	}
	
	
	
	init_menu();
	init_action();
	init_validate();
}
$(document).ready(function() {
	'use strict';
	init();
});

// INIT filter
function init_filter() {
	'use strict';
	$('.menu #action_filter a').on('click', function() {
		$('body').removeClass('menu');
		$('.menu #action_filter a').removeClass("select");
		$(this).addClass("select");
		var this_agent = $(this).attr('data-agent');
		if (this_agent !== filter_agent) {
			filter_agent = this_agent;
			if (this_agent === '*') {
				$('main').removeClass('display');
				$('#main_0').addClass('display');
				return false;
			} else {
				var this_target = $('#main_' + filter_target).empty();
				var this_artist;
				var this_array;
				$('#main_0 a.artist').each(function() {
					this_artist = $(this);
					this_array = this_artist.attr('data-agent');
					if (typeof this_array !== 'undefined') {
						this_array = this_array.split(',');
						if ($.inArray(this_agent, this_array) !== -1) {
							this_artist.clone().appendTo(this_target);
						}
					}
				});  
				$('main').removeClass('display');
				this_target.addClass('display');
				if (filter_target === 1) {
					filter_target = 2;
				}  else {
					filter_target = 1;
				}
			}
		}
	});
}




// Init MENU
function init_menu() {
	'use strict';
	
	$('header .toggle').on('click' , function() {
		$('body').toggleClass('menu');
        $('body').removeClass('error');
	});
	
	
	
	// if body = index
	
	
}

// Init ACTION
function init_action() {
	'use strict';
	$('header .title').on('click' , function() {
        if ($(this).parent('.action').hasClass('open')) {
            $(this).parent('.action').removeClass('open');
        } else {
            $('header .action').removeClass('open');
            $(this).parent('.action').addClass('open');
        }
	});
}

// Init VALIDATE
function init_validate() {
    'use strict';
	$('form#action_login').on('submit', function(event) {
        event.preventDefault();

        var $form,
            $input_email,
            $input_password;
        var email,
            password,
            error_count;

        $form = $(this);
        $input_email = $form.find('input[name="email"]');
        $input_password = $form.find('input[name="password"]');

        $('body').removeClass('error');
        $form.find('*').removeClass('error');

        error_count = 0;
        email = $input_email.val();
        password = $input_password.val();

        if (email === '') {
            error_count++;
        }

        if (password === '') {
            error_count++;
        }

        if (error_count > 0) {
            $('body').addClass('error');

            $input_email.focus();

            return false;
        }

        $('body').addClass('error');

        return false;
    });
}
