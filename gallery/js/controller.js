define(
	'controller', ['model', 'view'],
	function() {
		function Controller(model, view) {
			let self = this;
			window.addEventListener('wheel', debounce(onScrollEventHandler, 400));
			window.addEventListener('keydown', onKeyEventHandler)


			let focus = (function() {
				let id = model.data[0].id;

				function move(index) {
					let currentFocusIndex = model.data.map(function(photo) {
						return photo.id;
					}).indexOf(id);

					let prevId = id;
					let currentIndex = currentFocusIndex + index;
					// currentIndex = currentIndex > 0 ? currentIndex : 0;
					id = model.data[currentIndex].id;
					let ajaxNextPages = {
						40: 1,
						41: 1,
						42: 1,
						43: 1,
						44: 1
					};
					let ajaxPrevPages = {
						0: 1,
						1: 1,
						2: 1,
						3: 1,
						4: 1
					}

					if ((index === 1) && ((currentIndex % 5) === 0)) {
						scroll(1);
					}
					if ((index === -1) && ((currentIndex % 5) === 4)) {
						scroll(-1);
					}
					if (index === 5) {
						scroll(1);
					}
					if (index === -5) {
						scroll(-1);
					}

					view.focus(id, prevId);

					if (ajaxNextPages[currentIndex]) {
						ajax(35, function(response) {
							model.addPhotos(response.photos.photo);
							view.remove(35);
							view.render(model.data, 14);
						})
					}

					if (ajaxPrevPages[currentIndex]) {
						ajax(35, function(response) {
							model.addPhotos(response.photos.photo, true);
							view.remove(15, true);
							view.render(model.data, 35, true);
							scrollPosition();
						}, true);
					}
				}
				return {
					move
				}
			})()


			function onScrollEventHandler(e) {
				if (e.wheelDelta < 0) {
					focus.move(5);
				} else {
					focus.move(-5);
				}
			}

			function scroll(k) {
				let s = 10;
				let height = document.querySelector(".card").offsetHeight;
				height = (view.elements.section.scrollTop < height / 2) ? ((height + 320) / 2) : height + 100;

				let scrollAnimate = setInterval(function() {
					if (height > 0) {
						height = height - s;
						view.elements.section.scrollTop = view.elements.section.scrollTop + s * k;
					} else {
						clearInterval(scrollAnimate);
					}
				}, 5);
			}

			function onKeyEventHandler(e) {
				switch (e.keyCode) {
					case 37:
						{
							focus.move(-1);
							break;
						}
					case 38:
						{
							focus.move(-5);
							break;
						}
					case 39:
						{
							focus.move(1);
							break;
						}
					case 40:
						{
							focus.move(5);
							break;
						}
					default:
						return false
				}
			};

			function scrollPosition() {
				let height = document.querySelector(".card").offsetHeight;
				height = (view.elements.section.scrollTop < height / 2) ? ((height + 320) / 2) : height + 100;
				view.elements.section.scrollTop = view.elements.section.scrollHeight - 4.5 * height;
			}

			function debounce(fn, delay) {
				let timer = null;
				return function() {
					let context = this,
						args = arguments;
					clearTimeout(timer);
					timer = setTimeout(function() {
						fn.apply(context, args);
					}, delay);
				};
			}
		};
		return Controller;
	}
);