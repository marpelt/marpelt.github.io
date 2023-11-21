// --- ScrollReveal ---
ScrollReveal({
	reset: true,
	distance: '80px',
	duration: 2000,
	delay: 200,
});

ScrollReveal().reveal('.welcome-content, .heading', { origin: 'top' });
ScrollReveal().reveal(
	'.home-img img, .service-container, .portfolio-box, .testimonial-wrapper, .contact form',
	{ origin: 'bottom' }
);
ScrollReveal().reveal('.welcome-content h1, #about .grid-container .grid-item h3, #experience .content h3, #projects .content .container h3, #testimonials .content .container h3', { origin: 'left' });
ScrollReveal().reveal('.welcome-content h3, .welcome-content p, #about .grid-container .row2 h4, #about .grid-container .row2 p', {
	origin: 'right',
});

//  --- Calculate Age ---

let age = new Date().getFullYear() - 2007;
let ageText = document.querySelector('#about .grid-container .grid-item div p span');
ageText.replaceWith(age);

// --- Swiper ---
// var swiper = new Swiper('.mySwiper', {
// 	slidesPerView: 1,
// 	spaceBetween: 50,
// 	loop: true,
// 	grabCursor: true,
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true,
// 	},
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
// 	},
// });