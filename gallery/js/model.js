define(
	'model', [],
	function() {
		function Model(data) {
			let self = this;
			self.data = data;
			self.addPhotos = function(addData, unshift) {
				if (unshift) {
					self.data = [...addData, ...self.data.slice(0, 15)]
				} else {
					self.data = [...self.data.slice(35), ...addData];
				}
			}
		};
		return Model;
	}
);