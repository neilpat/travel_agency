var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: 'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/', {
		controller: 'BooksController',
		templateUrl: 'views/books.html'
	})
	.when('/books/details/:id', {
		controller: 'BooksController'
		templateUrl 'views/book_details.html'
	})
	.otherwise({
		redirectTO: '/'
	});
});