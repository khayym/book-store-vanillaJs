$( document ).ready( function() {

})
const singInAdminPanelBtn = document.getElementById('singInAdminPanelBtn');
const adminDashboard = $('.adminPanelLogin');
const mainDashboard = $('#main-dasboard');

const errorName = $('#errorName');
const errorPassword = $('#errorPassword');

localStorage.getItem('adminPass') === null ? offline() : activeUser();
$(document).on('click', '#singInAdminPanelBtn', (e) => {
	e.preventDefault();
	let nameInp = $('#adminName').val();
	let passInp = $('#adminPassword').val();
	db.ref('/adminPanel').once('value', (snapshot) => {
		const adminName = snapshot.val().adminName;
		const adminPass = snapshot.val().password;

		if (nameInp == adminName && passInp == adminPass) {
			localStorage.setItem('adminPass', adminPass);
			localStorage.setItem('adminName', adminName);
			localStorage.setItem('nameInp', nameInp);
			localStorage.setItem('passInp', passInp);
			setTimeout(() => {
				if (adminName == nameInp) {
					errorName.addClass('d-none');
				}
				if (passInp == adminPass) {
					errorPassword.addClass('d-none');
				}
				activeUser();
			}, 1000);
			activeUser();
		} else {
			if (adminName != nameInp) {
				errorName.removeClass('d-none');
			}
			if (passInp != adminPass) {
				errorPassword.removeClass('d-none');
			}
			localStorage.clear();
		}
	});
});

function activeUser() {
	adminDashboard.addClass('d-none');
	mainDashboard.removeClass('d-none');
}

function offline() {
	adminDashboard.removeClass('d-none');
	mainDashboard.addClass('d-none');
}

// $(document).on('click', '#adminLogOut', () => {
// 	localStorage.clear();
// 	location.reload();
// });

$('.logOutBtn').on('click', () => {
	localStorage.clear();
	location.reload();
});

// $(document).ready(function () {
// 	$('#searching-input').on('keyup', (e) => {
// 		e.preventDefault();
// 		$('#searching-results-contanier').removeClass('d-none');
// 		if (e.target.value.trim().length > 3) {
// 			$('lottie-player').addClass('d-none');
// 			$('#searching-results').empty();
// 			getBookInfo(e.target.value.trim());
// 		}else{
// 			$('#searching-results-contanier').removeClass('d-none');
// 		}
// 	});
// });

// $(document).on('click', '[data-datRes]', (e) => {
// 	setBookData(e.target.id);
// });

// getBookInfo = (data) => {
// 	const settings = {
// 		async: true,
// 		crossDomain: true,
// 		url: `https://goodreads-books.p.rapidapi.com/search?q=${data}&page=1`,
// 		method: 'GET',
// 		headers: {
// 			'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
// 			'x-rapidapi-key': '9d9588302emsh58804fa5a30d4d9p1b947ajsn659ea6ae2269',
// 		},
// 	};

// 	$.ajax(settings).then((res) => {
// 		// $('#searching-results-contanier').removeClass('d-none');
// 		$('#searching-results').append(
// 			res.map((booksInfo) => {
// 				console.log(booksInfo);
// 				return `
//                <span class='row align-items-center' data-datRes  style='color: #BCBCBC;'>
//                    <i class="far fa-clock mb-3 ml-3" aria-hidden="true"></i>
//                    <p class='ml-4' style="cursor: pointer" id="${booksInfo.title}">${
// 					booksInfo.title.length > 30 ? booksInfo.title.slice(0, 30) + '...' : booksInfo.title
// 				}</p>
//                </span>
//                `;
// 			})
// 		);
// 	});
// };

// setBookData = (data) => {
// 	const settings = {
// 		async: true,
// 		crossDomain: true,
// 		url: `https://goodreads-books.p.rapidapi.com/search?q=${data}&page=1`,
// 		method: 'GET',
// 		headers: {
// 			'x-rapidapi-host': 'goodreads-books.p.rapidapi.com',
// 			'x-rapidapi-key': '9d9588302emsh58804fa5a30d4d9p1b947ajsn659ea6ae2269',
// 		},
// 	};

// 	$.ajax(settings).then((res) => {
// 		for (let i = 0; i < res.length; i++) {
// 			if (data == res[i].title) {
// 				$('[data-form-inputs="bookName"]').attr('value', res[i].title);
// 				$('[data-form-inputs="authorName"]').attr('value', res[i].author);
// 				$('[data-form-inputs="bookImageUrl"]').attr('value', res[i].smallImageURL);
// 				$('[data-form-inputs="publicYear"]').attr('value', res[i].publicationYear);
// 			}
// 		}
// 		$('#searching-results-contanier').addClass('d-none');
// 	});
// };




$(document).on('keyup', '#searching-input', (e) => {

	e.preventDefault();
	let val = $('#searching-input').val().trim().toLowerCase().replace(/[\n\r\s\t]+/g, '');
	console.log('#searching-input',val);
	$('#searching-results-contanier').removeClass('d-none');
	$('lottie-player').addClass('d-none');
	$('#searching-results').empty();
	// if (val.length < 4) return toastr.info('The title of the book should not be less than 3 letters');

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

		$("#searching-results").append(
			options.map((opt) => {
				filterOpt = opt.bookName.replace(/[\n\r\s\t]+/g, '');
				filter = filterOpt.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
				if (filter.match(final)) {
			
					console.log(opt);
						// 			res.map((booksInfo) => {
						// 				console.log(booksInfo);
						// 				return `
						            //    <span class='row align-items-center' data-datRes  style='color: #BCBCBC;'>
						            //        <i class="far fa-clock mb-3 ml-3" aria-hidden="true"></i>
						            //        <p class='ml-4' style="cursor: pointer" id="${booksInfo.title}">${
									// 		booksInfo.title.length > 30 ? booksInfo.title.slice(0, 30) + '...' : booksInfo.title
									// 	}</p>
						            //    </span>
					return `
					<span class='row align-items-center' data-datRes  style='color: #BCBCBC;'>
					<i class="far fa-clock mb-3 ml-3" aria-hidden="true"></i>
					<p class='ml-4 idresever' style="cursor: pointer" id="${opt.id}">${opt.bookName}</p>
					</span>
					`
				}

			})

		)
	})
})

let booksData = JSON.parse(window.localStorage.getItem('booksData'));

function setBookData(data){
	
		for (let i = 0; i < booksData.length; i++) {
			if (data == booksData[i].id) {
				$('[data-form-inputs="bookName"]').attr('value', booksData[i].bookName);
				$('[data-form-inputs="authorName"]').attr('value', booksData[i].authorName);
				$('[data-form-inputs="bookImageUrl"]').attr('value', booksData[i].bookImageUrl);
				$('[data-form-inputs="publicYear"]').attr('value', booksData[i].publicYear);
				document.getElementById("exampleFormControlTextarea1").value = booksData[i].description;
				$( "#defaultCheck1" ).prop( "checked", booksData[i].isNew === 'new' ? true : false );
			}
		}
		$('#searching-results-contanier').addClass('d-none');
};


$(document).on('click', '[data-datRes]', (e) => {
	console.log(e.target.id);
	setBookData(e.target.id);
});

console.log(booksData);


	let a = 'The Feeling May Remain'
	if (Object.values(booksData).includes("AdaMaryam")){
		 console.log('tr');
	 }else{
		console.log('vvv');
	 }




// Add Books

$('#btn-book-from').on('click', (e) => {
	e.preventDefault();
	let checked = '';
	$('#defaultCheck1').is(':checked') ? (checked = 'new') : (checked = 'not');
	const bookImgUrlStandart = $('[data-form-inputs="bookImageUrl"]').val()

	if ($("[data-form-inputs='catagory'] :selected").val() == 'none')
		toastr.info('Please select a catagory')
	else if (
		$('[data-form-inputs="bookName"]').val() == '' &&
		$('[data-form-inputs="authorName"]').val() == '' &&
		$('[data-form-inputs="bookImageUrl"]').val() == '' &&
		$('[data-form-inputs="publicYear"]').val() == ''
	) {
		alert('zehmet olmasa tam doldur');
	} else {


			// db.ref('books').child(`${id}`).update({
			// 	bookName: $('[data-form-inputs="bookName"]').val(),
			// 	authorName: $('[data-form-inputs="authorName"]').val(),
			// 	bookImageUrl: bookImgUrlStandart,
			// 	publicYear: $('[data-form-inputs="publicYear"]').val(),
			// 	description: $('[data-form-inputs="description"]').val(),
			// 	catagory: $("[data-form-inputs='catagory'] :selected").val(),
			// 	isNew: checked,
			// })

			
			// toastr.options = {
			// 	"closeButton": false,
			// 	"debug": false,
			// 	"newestOnTop": false,
			// 	"progressBar": false,
			// 	"positionClass": "toast-top-right",
			// 	"preventDuplicates": false,
			// 	"onclick": null,
			// 	"showDuration": "300",
			// 	"hideDuration": "1000",
			// 	"timeOut": "5000",
			// 	"extendedTimeOut": "1000",
			// 	"showEasing": "swing",
			// 	"hideEasing": "linear",
			// 	"showMethod": "fadeIn",
			// 	"hideMethod": "fadeOut"
			//  }

			// return  toastr.success('Book update successfully');
			
			console.log('er');
			db.ref('/books')
			.push()
			.set({
				bookName: $('[data-form-inputs="bookName"]').val(),
				authorName: $('[data-form-inputs="authorName"]').val(),
				bookImageUrl: bookImgUrlStandart,
				publicYear: $('[data-form-inputs="publicYear"]').val(),
				description: $('[data-form-inputs="description"]').val(),
				catagory: $("[data-form-inputs='catagory'] :selected").val(),
				isNew: checked,
				viewCount: 0
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
			  setTimeout(()=>{
				$('[data-form-inputs="bookName"]').val(null)
				$('[data-form-inputs="authorName"]').val(null)
				$('[data-form-inputs="publicYear"]').val(null)
				$('[data-form-inputs="description"]').val(null)
				$('[data-form-inputs="bookImageUrl"]').val(null)
			  },500)
			  return  toastr.success('Book added successfully');
		}


		// New Functions
		// let filterUrlImg = bookImgUrlStandart.replace(/_...._./,"");

		// db.ref('/books')
		// 	.push()
		// 	.set({
		// 		bookName: $('[data-form-inputs="bookName"]').val(),
		// 		authorName: $('[data-form-inputs="authorName"]').val(),
		// 		bookImageUrl: bookImgUrlStandart,
		// 		publicYear: $('[data-form-inputs="publicYear"]').val(),
		// 		description: $('[data-form-inputs="description"]').val(),
		// 		catagory: $("[data-form-inputs='catagory'] :selected").val(),
		// 		isNew: checked,
		// 		viewCount: 0
		// 	});

		// 	toastr.options = {
		// 		"closeButton": false,
		// 		"debug": false,
		// 		"newestOnTop": false,
		// 		"progressBar": false,
		// 		"positionClass": "toast-top-right",
		// 		"preventDuplicates": false,
		// 		"onclick": null,
		// 		"showDuration": "300",
		// 		"hideDuration": "1000",
		// 		"timeOut": "5000",
		// 		"extendedTimeOut": "1000",
		// 		"showEasing": "swing",
		// 		"hideEasing": "linear",
		// 		"showMethod": "fadeIn",
		// 		"hideMethod": "fadeOut"
		// 	 }
		// 	  setTimeout(()=>{
		// 		$('[data-form-inputs="bookName"]').val(null)
		// 		$('[data-form-inputs="authorName"]').val(null)
		// 		$('[data-form-inputs="publicYear"]').val(null)
		// 		$('[data-form-inputs="description"]').val(null)
		// 		$('[data-form-inputs="bookImageUrl"]').val(null)
		// 	  },500)
		// 	  return  toastr.success('Book added successfully');
			 
	}
);

// ------------------------

$('#dropdown-btn').on('click', (e) => {
	e.preventDefault();
	const dropdownInput = $('#dropdown-input').val();
	console.log(dropdownInput);
	setBookCatagory(dropdownInput);
});

function setBookCatagory(inputVal) {
	db.ref('/bookCatagory').push().set({inputVal});
}

// DB on for book catagory
							
	db.ref('/bookCatagory').on('value', snapshot => {
		let options = Object.entries(snapshot.val()).map((e) => {
			for (i in e) {
				reData = {
					id: e[0],
					...e[1],
				};
			}
			return reData;
		});
		
	
		$("[data-form-inputs='catagory']").html(
			options.reverse().map((opt) => {
				return `<option class='w-100'>${opt.inputVal}</option>`;
			})
		);
	});

// about us js //

$('#btn-about-from').on('click', (e) => {
	let textArea = $('#exampleFormControlTextarea2').val();
	let aboutImg = $('[data-form-inputs="about-imgUrl"]').val();
	let aboutTitle = $('[data-form-inputs="about-title"]').val();
	e.preventDefault();
	db.ref('/about').set({
		description: textArea,
		bookImg: aboutImg,
		title: aboutTitle,
	});
});

db.ref('/about').once('value', (snapshot) => {
	localStorage.setItem('aboutTitle', JSON.stringify(snapshot.val().title));
	localStorage.setItem('abourImgUrl', JSON.stringify(snapshot.val().bookImg));
	localStorage.setItem('aboutDescription', JSON.stringify(snapshot.val().description));

});

	
const aboutTitle = JSON.parse(window.localStorage.getItem('aboutTitle'));
const abourImgUrl = JSON.parse(window.localStorage.getItem('abourImgUrl'));
const aboutDescription = JSON.parse(window.localStorage.getItem('aboutDescription'));

$('#aboutTitle').attr('value', aboutTitle);
$('[data-form-inputs="about-imgUrl"]').attr('value', abourImgUrl);
$('#exampleFormControlTextarea2').text(aboutDescription);
// about us js end //

// Hamburger Side Nav

$('.x-logo').on('click', () => {
	$('#side-nav').css({ left: '-50rem' });
	$('#toggleBtn').css('transform', 'rotate(-180deg)');
});

$('#toggleBtn').on('click', () => {
	const heightOfContainer = $('html').height();
	$('#side-nav').css({ left: '0rem', height: `${heightOfContainer}` });
	$('#toggleBtn').css('transform', 'rotate(90deg)');
});

//Join Us Here
db.ref('/joinUs').on('value', (snapshot) => {
	let joinUs_data = Object.entries(snapshot.val()).map((e) => {
		for (i in e) {
			reData = {
				id: e[0],
				...e[1],
			};
		}
		return reData;
	});

	for (let i = joinUs_data.length - 4; i < joinUs_data.length; i++) {
		$('#joinUs-tbody').append(
			`
        <tr id="tr-${i}">
        <th scope="row">${i}</th>
        <td>${joinUs_data[i].fullName}</td>
        <td>${joinUs_data[i].email}</td>
        </tr>
         `
		);
	}
});
// Join Us Here

// Contackt us here

db.ref('/contactUs').once('value', (snapshot) => {
	let contactUs_data = Object.entries(snapshot.val()).map((e) => {
		for (i in e) {
			reData = {
				id: e[0],
				...e[1],
			};
		}
		return reData;
	});
	
	for (let i = contactUs_data.length - 4; i < contactUs_data.length; i++) {
		$('#contact-us-body').append(
			`
            <tr id='tr-${i}'>
                <th scope="row">${i}</th>
                <td>${contactUs_data[i].fullName}</td>
                <td>${contactUs_data[i].address}</td>
                <td>${contactUs_data[i].email}</td>
                <td>${contactUs_data[i].phone}</td>
            </tr>
                `
		);
	}
});

// Contackt Us Page here

toastr.options = {
	"closeButton": false,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-bottom-right",
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

$('#x-btn').on('click', () => {
	$('.navbar-side').css({ left: '-200rem' });
	$('#toggleBtn').css('transform', 'rotate(-180deg)');
});

$('#toggleBtn').on('click', () => {
	const heightOfContainer = $('html').height();
	$('.navbar-side').css({ left: '0rem', height: `${heightOfContainer}` });
	$('#toggleBtn').css('transform', 'rotate(90deg)');
});

  


// Contackt Us Page here
const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

$(document).on('click', '#btn-sent-contactPG', () => {

	if(!$("[data-inp='name']").val() || !$("[data-inp='email']").val() || !$("[data-inp='address']").val() || !$("[data-inp='phone']").val()) {
		toastr.error('Forumu tam doldurun')
	}else if (!$("[data-inp='email']").val().match(regexp)){
		toastr.error('Duzgun Email yazin')
	}
	else {
		
		db.ref('/contactUs').push().set({
			fullName :$("[data-inp='name']").val(),
			email : $("[data-inp='email']").val(),
			address : $("[data-inp='address']").val(),
			phone :$("[data-inp='phone']").val(),
		})

		$("[data-inp='name']").val(null)
		$("[data-inp='email']").val(null)
		$("[data-inp='address']").val(null)
		$("[data-inp='phone']").val(null)
		return toastr.success('Sorğunuz uğurla həyata keçirildi','Uğurlu əməliyyat')
	}
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