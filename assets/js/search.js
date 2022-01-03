toastr.options = {
	"closeButton": false,
	"debug": true,
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


function flickering() {
	$('#lop').not('.slick-initialized').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});
}

flickering();

$('#lop').not('.slick-initialized').slick({
	infinite: true,
	speed: 300,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				dots: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				dots: false,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				dots: false,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	]
});

function notslick() {
	$('#lop').slick('unslick');
}

$(document).on('click', '#search-btn-searchpage', (e) => {

	e.preventDefault();
	$('.imgSlider-section').css('opacity', '1%');
	let val = $('#search-input').val().trim().toLowerCase().replace(/[\n\r\s\t]+/g, '');


	if (val.length < 4) return toastr.info('The title of the book should not be less than 3 letters');


	const firstLet = val[0];
	const senterLet = val[Math.floor(val.length / 2)];
	const lastLet = val[val.length - 1]
	const um = val.length - 3;
	const n = Math.floor((um / 2) + 1);
	const l = um - n;
	const dot = '.';
	let final = `${firstLet}${dot.repeat(n)}${senterLet}${dot.repeat(l)}${lastLet}`;

	console.log(final);

	db.ref('/books').on('value', snapshot => {
		let options = Object.entries(snapshot.val()).map((e) => {
			for (i in e) {
				reData = {
					id: e[0],
					...e[1],
				};
			}
			return reData;
		});

		$("#lop").append(
			options.map((opt) => {
				filterOpt = opt.bookName.replace(/[\n\r\s\t]+/g, '');
				filter = filterOpt.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
				if (filter.match(final)) {
					setTimeout(() => {
						flickering();
						$('.imgSlider-section').css('opacity', '99%');
					}, 200)

					setTimeout(() => { notslick() }, 100);
					$('#search-input').val('');

					return `
					<div class="d-flex flex-xl-row flex-column search-slider-content">
					<img src="${opt.bookImageUrl}" class='mr-3' alt="">
					<div class="content-items-search d-flex flex-column">
						<h2 class='mt-xl-0 mt-5' style="font-size:24px; font-weight: 700;">${opt.bookName.length > 40 ? opt.bookName.slice(0, 40) + '...' : opt.bookName}</h2>
						<h6 style="font-size:18px; font-weight: 400;">${opt.authorName.length < 3 ? 'Anonymous' : opt.authorName.slice(0, 40)}</h6>
						<p class='mt-4' style="font-size:14px; font-weight:400">
							We work without holidays and weekends! Residents of Kiev can receive an order on the day of its registration.
							Customers from other cities of
							Ukraine can receive an
							order within 1-5 days, depending on the
							location of the settlement and the selected delivery method.
							Orders over UAH 1000 are delivered  free of charge *. You can see the available methods, exact
							terms and cost of delivery during checkout in the order basket, after selecting the delivery city     
						</p>
					</div>
					</div>
					`
				}

				// else if (filter.match(final) == null) {
				// console.log('sssssssss');
				// $('.no-data-anime').css('left','18rem');
				// setTimeout(() =>$('.no-data-anime').css('left','200rem'),3000);
				// $('#search-input').val('');
				// }
			})

		)
	})
})


// Join Us
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(document).on('click','#join-btn',()=>{
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