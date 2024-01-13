$(document).ready(() => {
	// Init aos plugin
	AOS.init();

	// Generate year from Date() to show on the footer content
	$('.footer .footer-content span').append(new Date().getFullYear());

	// List paginations
	let options = {
		valueNames: ['name'],
		page: 5,
		pagination: true,
	}
	var pubsList = new List('pubs-list', options);

	// Cache selectors
	var lastId,
		topMenu = $('#menu'),
		topMenuHeight = topMenu.outerHeight() + 14,
		// All list items
		menuItems = topMenu.find('a'),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr('href'));
			if (item.length) {
				return item;
			}
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function (e) {
		e.preventDefault();
		var href = $(this).attr('href'),
			offsetTop = href === '#' ? 0 : $(href).offset().top - topMenuHeight + 15;
		$('html, body').stop().animate(
			{
				scrollTop: offsetTop
			},
			600
		);
	});

	// Bind to scroll
	$(window).scroll(function () {
		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop) return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		// Check if scrolled at bottom
		var id = ($(window).scrollTop() + $(window).height() != $(document).height()) ? (cur && cur.length ? cur[0].id : '') : id = 'contacts';

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems.parent().removeClass('active').end().filter("[href='#" + id + "']").parent().addClass('active');
		}
	});

});
