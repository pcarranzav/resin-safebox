$(function() {

	// Initialize varibles
	var $window = $(window);
	var connected = false;
	var current_state;
	$('.page').hide();

	var socket = io();

	toastr.options = {
		'closeButton': false,
		'debug': false,
		'newestOnTop': false,
		'progressBar': false,
		'positionClass': 'toast-top-center',
		'preventDuplicates': false,
		'onclick': null,
		'showDuration': '300',
		'hideDuration': '500',
		'timeOut': '3500',
		'extendedTimeOut': '1000',
		'showEasing': 'swing',
		'hideEasing': 'linear',
		'showMethod': 'fadeIn',
		'hideMethod': 'fadeOut'
	};

	var sendInput = function(){
		socket.emit('input', {
			email: $('#email').val(),
			phone: $('#phone').val(),
			country: $('#country').val(),
			code: $('#code').val()
		});
		$('#code').val('');
	};
	$window.keydown(function (event) {
		// When the client hits ENTER on their keyboard
		if (event.which === 13) {
			sendInput();
		}
	});
	$('.submit-button').click(function(){
		sendInput();
	});

	socket.emit('status');

	socket.on('status', function(data){
		console.log('new status');
		console.log(data);
		current_state = data.state;
		$('.page').hide();
		$('.' + data.state + '.page').show();
	});

	socket.on('display', function(data){
		$('#display').val(data);
	});

	socket.on('notice', function(data){
		toastr.warning(data);
	});

	$('.key').on('click', function(){
		var val = $(this).html();
		
		if(val == 'OK'){
			sendInput();
		} else if(val == 'CLR'){
			$('#code').val('');
		} else {
			$('#code').val($('#code').val() + val);
		}


	});
});