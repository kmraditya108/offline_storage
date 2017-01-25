// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','controller'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    //creating databse
    var db=window.openDatabase("testDb","3.9.2","myApp","1000000");
    db.transaction(openDatabse,successDb,errorDb);
    
    //function to create table
    function openDatabse(tx){
		tx.executeSql("create table login(username text, password text)");
	}
	
	//on success table creation
	function successDb(res){
		console.log("Table created succefully : "+JSON.stringify(res));
	}
	
	//on failed of table creation
	function errorDb(res){
		console.log("Table created failed : "+JSON.stringify(res));
	}
	
  });
})

.config(function($stateProvider,$urlRouterProvider){
	$stateProvider.state('login',{
		url:'/',
		templateUrl:'templates/login.html',
		controller:'loginCtrl'
	}).state('registration',{
		url:'/registration',
		templateUrl:'templates/registration.html',
		controller:'registrationCtrl'
	}).state('home',{
		url:'/home',
		templateUrl:'templates/home.html',
		controller:'homeCtrl'
	});
	
	$urlRouterProvider.otherwise('/');
})
