
db.ref('/about').once('value', (snapshot) => {
	localStorage.setItem('aboutTitle', JSON.stringify( snapshot.val().title));
	localStorage.setItem('abourImgUrl', JSON.stringify( snapshot.val().bookImg));
	localStorage.setItem('aboutDescription', JSON.stringify( snapshot.val().description));

	
	
});

const aboutTitle = JSON.parse(window.localStorage.getItem('aboutTitle'));
const abourImgUrl = JSON.parse(window.localStorage.getItem('abourImgUrl'));
const aboutDescription = JSON.parse(window.localStorage.getItem('aboutDescription'));

$('.about').append(`<h1 class="mt-5 text-center text-lg-left" style="font-weight: 900;">${aboutTitle}</h1>`);
$('.about').append(`<p class="content mt-4 text-center text-lg-left" style="font-weight: 400;">${aboutDescription}</p>`);
$('.img').html(`<img id='book-img' class="mt-5 w-100 mr-lg-4" src="${abourImgUrl}" alt=""></img>`);



$(document).on('click', '#x-btn', () => {
	$('.navbar-side').css({ left: '-200rem' });
	$('#toggleBtn').css('transform', 'rotate(-180deg)');
});

$(document).on('click', '#toggleBtn', () => {
	const heightOfContainer = $('html').height();
	$('.navbar-side').css({ left: '0rem', height: `${heightOfContainer}` });
	$('#toggleBtn').css('transform', 'rotate(90deg)');
});

// Join Us
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(document).on('click','#join-btn',(e)=>{
	e.preventDefault()
	const fullName  = $('#join-fullName').val();
	const email  = $('#join-email').val();
 
	db.ref('/joinUs')
	.push()
	.set({
		 email: email,
		 fullName: fullName
	});
 
	toastr.options = {
	 "closeButton": false,
	 "debug": false,
	 "newestOnTop": false,
	 "progressBar": false,
	 "positionClass": "toast-top-right",
	 "preventDuplicates": false,
	 "onclick": null,
	 "showDuration": "300",
	 "hideDuration": "1000",
	 "timeOut": "5000",
	 "extendedTimeOut": "1000",
	 "showEasing": "swing",
	 "hideEasing": "linear",
	 "showMethod": "fadeIn",
	 "hideMethod": "fadeOut"
   }
 
   toastr.success('You have successfully joined us');
   $('#loginModal').modal('hide');
 })