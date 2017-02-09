define(
	'view', ['model'],
	function() {
		function View(model) {
			let self = this;

			function init() {
				self.elements = {
					template: document.querySelector("template"),
					section: document.querySelector("section"),
					card: document.querySelector(".card")
				};

				self.render(model.data);
				self.focus(model.data[0].id);
			};

			self.render = function(data, index = -1, unshift) {
				let fragment = document.createDocumentFragment();

				data.forEach(function(photo, i) {
					let templateClone = document.importNode(self.elements.template.content, true);
					let card = templateClone.querySelector(".card");
					card.style.background = `url(${photo.url_s}) center no-repeat`;
					card.style.backgroundSize = `cover`;
					card.dataset.id = photo.id;
					let section = document.querySelector("section");
					if (!unshift && (i > index)) {
						self.elements.section.appendChild(templateClone);
					}
					if (unshift && (i < index)) {
						fragment.appendChild(templateClone);
					}
				});

				if (unshift) {
					self.elements.section.insertBefore(fragment, self.elements.section.firstChild)
				}
			};

			self.focus = function(id, prevId) {
				let card = document.querySelector(`[data-id='${id}']`);
				if (card) {
					if (prevId) {
						document.querySelector(`[data-id='${prevId}']`).classList.remove('active')
					}
					card.classList.add("active");
				}
			}

			self.remove = function(index, shift) {
				let cards = document.querySelectorAll(".card");
				if (!shift) {
					for (let i = 0; i < index; i++) {
						cards[i].parentNode.removeChild(cards[i]);
					}
				} else {
					for (let i = index; i < 50; i++) {
						cards[i].parentNode.removeChild(cards[i]);
					}
				}
			}

			init();
		};
		return View;
	}
);