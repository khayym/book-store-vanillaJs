
db.ref('/bookCatagory').once('value', (snapshot) => {
    let options = Object.entries(snapshot.val()).map((e) => {
        for (i in e) {
            reData = {
                id: e[0],
                ...e[1],
            };
        }
        return reData;
    });

    localStorage.setItem('reData', JSON.stringify(options));
    let localData = JSON.parse(window.localStorage.getItem('reData'));
    

    $(".home-items-1").append(
        localData.reverse().map((opt) => {
            return `<button class="btn my-3 mx-xl-3 mx-lg-3 mx-md-3 mx-sm-3 mx-0 home-btn-item" id='${opt.inputVal}'> ${opt.inputVal}</button>`
        })
    )})


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



// setTimeout(() =>{
// 	console.log('xxxxxx');
// 	document.getElementById("new Books").click();
// },5000)

$(document).on('click','.home-btn-item',(e)=>{
    e.preventDefault();
    location.href = "./catalog.html";
})