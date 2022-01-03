// $(window).ready(function () {
// 	setTimeout(() => {
// 		return $(".loader").fadeOut("slow");
// 	}, 1200)
// });

db.ref('/books').once('value', snapshot => {
	options = Object.entries(snapshot.val()).map((e) => {
		for (i in e) {
			reData = {
				id: e[0],
				...e[1],
			};
		}
		return reData;
	});

	localStorage.setItem('booksData', JSON.stringify(options));
});

let localData = JSON.parse(window.localStorage.getItem('booksData'));

	$(".slick-carousel").append(
		localData.map((opt) => {
			return `
					<div class="slick-cards d-flex flex-column align-items-center mx-4 my-5" style='height:332px ;width: 184px;'>
							<img src="./assets/img/new.svg"  class='${opt.isNew}'  alt="" > 
							<img src="${opt.bookImageUrl}" style="width:134px; height:190px" class='mt-3' alt="">
							<h3 class="mt-4" style='font-size:16px; font-weight: 700;' >${opt.bookName.slice(0, 15) + '...'}</h3>
							<p style='font-size: 12px; font-weight: 400'>${opt.authorName.length < 3 ? 'Anonymous' : opt.authorName.slice(0, 15)}</p>
							<button class="btn text-center d-flex align-items-center justify-content-center readmore text-white" onclick="readmore(this)" id='${opt.id}'data-new="${opt.isNew}" data-publicYear="${opt.publicYear}" data-img="${opt.bookImageUrl}" data-bn="${opt.bookName}" data-authorName="${opt.authorName}" style='height:29px; width: 136px; font-weight: 900; font-size:12px'>READ MORE</button>
					</div>
					`;
		})
	);

	
// Bestseller Functions 
const booksforCount = [];
localData.map((e)=>{if (e.viewCount) booksforCount.push(e);});

const bestsellerBooks = booksforCount.sort((a, b) => (a.viewCount < b.viewCount) ? 1 : -1)
console.log(bestsellerBooks);


	$(".bes-slick").append(
		
		bestsellerBooks.map((opt) => {
			return `
					<div class="slick-cards d-flex flex-column align-items-center mx-4 my-xl-5 my-lg-5 my-md-5 my-sm-3 my-3" style='height:332px ;width: 184px;'>
							<img src="./assets/img/new.svg"  class='${opt.isNew}-2'  alt="" > 
							<img src="${opt.bookImageUrl}" style="width:134px; height:190px" class='mt-3' alt="">
							<h3 class="mt-4" style='font-size:16px; font-weight: 700;' >${opt.bookName.slice(0, 15) + '...'}</h3>
							<p style='font-size: 12px; font-weight: 400'>${opt.authorName.length < 3 ? 'Anonymous' : opt.authorName.slice(0, 15)}</p>
							<button class="btn text-center d-flex align-items-center justify-content-center readmore text-white" onclick="readmore(this)"  id='${opt.id}' data-new="${opt.isNew}" data-publicYear="${opt.publicYear}" data-img="${opt.bookImageUrl}" data-bn="${opt.bookName}" data-authorName="${opt.authorName}" style='height:29px; width: 136px; font-weight: 900; font-size:12px'>READ MORE</button>
					</div>
					`;
		})
		
	);

	$(".new-slick").append(
		localData.reverse().map((opt) => {
			return `
					<div class="slick-cards d-flex flex-column align-items-center mx-4 my-xl-5 my-lg-5 my-md-5 my-sm-3 my-3" style='height:332px ;width: 184px;'>
							<img src="./assets/img/new.svg"  class='${opt.isNew}-2' alt="" > 
							<img src="${opt.bookImageUrl}" style="width:134px; height:190px" class='mt-3' alt="">
							<h3 class="mt-4" style='font-size:16px; font-weight: 700;' >${opt.bookName.slice(0, 15) + '...'}</h3>
							<p style='font-size: 12px; font-weight: 400'>${opt.authorName.length < 3 ? 'Anonymous' : opt.authorName.slice(0, 15)}</p>
							<button class="btn text-center d-flex align-items-center justify-content-center readmore text-white" onclick="readmore(this)"  id='${opt.id}' data-new="${opt.isNew}" data-publicYear="${opt.publicYear}" data-img="${opt.bookImageUrl}" data-bn="${opt.bookName}" data-authorName="${opt.authorName}" style='height:29px; width: 136px; font-weight: 900; font-size:12px'>READ MORE</button>
					</div>
					`;
		})
	);

// ------------------------------------------------------

// -------------------------------------------------------

db.ref('/bookCatagory').once('value', snapshot => {
	let options = Object.entries(snapshot.val()).map((e) => {
		for (i in e) {
			reData = {
				id: e[0],
				...e[1],
			};
		}
		return reData;
	});
	localStorage.setItem('bookCatagory', JSON.stringify(options));

});
let bookCatagory = JSON.parse(window.localStorage.getItem('bookCatagory'));

$("#dinamicNav-product").append(
	bookCatagory.map((opt) => {
		return `
			<li class="nav-item">
				<button class="catalog-item cursor-pointer" id="${opt.inputVal}" onclick="getBooksForCat(this)">${opt.inputVal}</button>
			</li>
			`;
	})
);


function filterBooks(val) {
		$(".slick-carousel").append(
			localData.map((opt) => {
				if (opt.catagory == val) {
					return `
					<div class="slick-cards d-flex flex-column align-items-center mx-4 my-5" style='height:332px ;width: 184px;'>
					<img src="./assets/img/new.svg"  class='newCheckImg' style='display: none !important;' alt="" > 
							<img src="${opt.bookImageUrl}" style="width:134px; height:190px" class='mt-3' alt="">
							<h3 class="mt-4" style='font-size:16px; font-weight: 700;' >${opt.bookName.slice(0, 15) + '...'}</h3>
							<p style='font-size: 12px; font-weight: 400'>${opt.authorName.length < 3 ? 'Anonymous' : opt.authorName.slice(0, 15)}</p>
							<button class="btn text-center d-flex align-items-center justify-content-center readmore text-white" onclick="readmore(this)"  id='${opt.id}' data-new="${opt.isNew}" data-publicYear="${opt.publicYear}" data-img="${opt.bookImageUrl}" data-bn="${opt.bookName}" data-authorName="${opt.authorName}" style='height:29px; width: 136px; font-weight: 900; font-size:12px'>READ MORE</button>
					</div>
					`;
				}
			})
		);
};



// // return $(".all-books-items").load(location.href + ".all-books-items");

function getBooksForCat(data) {
	$(".slick-carousel").slick('unslick');
	$(".slick-carousel").empty();
	// $('.slick-carousel').removeClass('slick-initialized')
	filterBooks(data.id);
	return slickSet()
}

function slickSet() {
	$('.slick-carousel').not('.slick-initialized').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});

	$('.new-slick').not('.slick-initialized').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});

	$('.bes-slick').not('.slick-initialized').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					dots: false,
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});
}

setTimeout(() => slickSet(), 500)

// ReadMore




function readmore(c) {

	// ViewCounter
	db.ref('/books').once('value', snapshot => {
	options = Object.entries(snapshot.val()).map((e) => {
		for (i in e) {
			reData = {
				id: e[0],
				...e[1],
			};
		}
		return reData;
	});

	options.map((opt)=>{
	if(opt.id == c.id){

		let newCount = opt.viewCount + 1;
		db.ref('books').child(`${c.id}`).update({
			viewCount: newCount
		})
	}
	})	
});

	// ViewCounter

	
	let data_img = $(c).attr('data-img');
	let data_bName = $(c).attr('data-bn');
	let authorName = $(c).attr('data-authorName');
	let isNew = $(c).attr('data-new');
	let publicYear = $(c).attr('data-publicYear');

	// full-pro-block
	// catalog-full-block
	setTimeout(() => {
		$('.catalog-full-block').css('display', 'none');
	}, 500)

	$('.full-pro-block').css('display', 'block');

	$(document).on('click', '.goBack', () => {
		$('.catalog-full-block').css('display', 'block');
		$('.full-pro-block').css('display', 'none');
	})

	$('#fullpage-pro').html(`
		<section class="book-page ml-lg-5 pl-lg-5 mr-lg-2 col-lg-6 justify-content-lg-end mt-5">
		<div class="product-buttons d-flex flex-column">
			<button class='btn back-btn-pro text-white goBack' style="width: 100px; background-color: var(--main-Orange-color); font-weight: 900;">< BACK</button>
			<button class='btn btn-primary year-btn-pro d-flex text-center align-items-center justify-content-center'>${publicYear}</button>
		</div>
		<h1  class="mt-3 text-center text-lg-left" id='product-title' style="font-weight: 700;font-size: 35px;">${data_bName}</h1>
		<h5 class="mt-3" style="font-weight: 400; font-size:22px">${authorName}</h5>
		<p class="content mt-4 text-center text-lg-left" style="font-weight: 400;">
		We work without holidays and weekends! Residents of Kiev can receive an order on the day of its registration. Customers from other cities of Ukraine can receive an order 
		within 1-5 days, depending on the location of the settlement and the selected delivery method. 
		Orders over UAH 1000 are delivered free of charge *. You can see the available methods, exact terms and cost
			of delivery during checkout in the order basket, after selecting the delivery city.
			<br>
			More details
		</p>
		</section>
		<section class="col-lg-6 mt-xl-5 mt-lg-5 mt-0 ml-xl-2 ml-lg-2 d-flex justify-content-center flex-column">
		<button class='btn back-btn-pro-2 text-white goBack'  style="width: 100px; background-color: var(--main-Orange-color); font-weight: 900;">< BACK</button>
		<img id='product-img' class="" src="${data_img}" alt="">
		<button class='btn btn-primary year-btn-pro-2 d-flex text-center align-items-center justify-content-center'>${publicYear}</button>
		</section>
	`);

}


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