requirejs.config({
	paths: {
		'jquery': 'jquery-1.9.1',
		'tmpl': 'tmpl'
	},
	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'tmpl': {
			exports: 'tmpl'
		}
	}
});

require(
	['jquery', 'tmpl', 'model', 'view', 'controller'],
	function(jquery, tmpl, model, view, controller) {

		var firstToDoList = ['JavaScript', 'HTML', 'CSS', 'jQuery'];
		var model = new model(firstToDoList);
		var view = new view(model);
		var controller = new controller(model, view);
	}
);