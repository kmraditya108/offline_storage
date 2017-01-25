var app = angular.module('controller',[]);

app.controller('loginCtrl',function($scope,$ionicPopup,$window){
	var db=window.openDatabase("testDb","3.9.2","myApp","1000000");
	
	//login function
	$scope.login=function(data){
		console.log(JSON.stringify(data));
		if(data == undefined){
			$ionicPopup.alert({title:'Alert',template:'Enter username/password'});
		}else if(data.name == "" || data.name == undefined){
			$ionicPopup.alert({title:'Alert',template:'Enter username'});
		}else if(data.password == "" || data.password == undefined){
			$ionicPopup.alert({title:'Alert',template:'Enter password'});
		}else{
			db.transaction(function(tx){
				tx.executeSql("select * from login",[],function(tx1,res){
					if(res.rows.length > 0){
						angular.forEach(res.rows, function(value, key){
							if(value.username != data.name || value.password != data.password){
								$ionicPopup.alert({title:'Alert',template:'Please check your Login credential'});
							}else{
								$window.location.href="#/home";
							}
						});
					}else{
						$ionicPopup.alert({title:'Alert',template:'Please register yourself'});
					}
				});
			});
		}
	}
	
	//function to registeration
	$scope.callRegistrationPage=function(){
		console.log("button click");
		$window.location.href="#/registration";
	}
});

app.controller('registrationCtrl',function($scope,$ionicPopup,$window){
	var db=window.openDatabase("testDb","3.9.2","myApp","1000000");
	$scope.registration=function(data){
		console.log(JSON.stringify(data));
		if(data == undefined){
			$ionicPopup.alert({title:'Alert',template:'Enter username/password'});
		}else if(data.name == "" || data.name == undefined){
			$ionicPopup.alert({title:'Alert',template:'Enter username'});
		}else if(data.password == "" || data.password == undefined){
			$ionicPopup.alert({title:'Alert',template:'Enter password'});
		}else if(data.re_password == "" || data.re_password == undefined){
			$ionicPopup.alert({title:'Alert',template:'Verify your password'});
		}else if(data.password != data.re_password){
			$ionicPopup.alert({title:'Alert',template:'Password mismatch'});
		}else{
			db.transaction(function(tx){
				tx.executeSql("insert into login(username, password) values(?,?)",[data.name, data.password]);
				$window.location.href="#/"
			});
		}
	}
});

app.controller('homeCtrl',function($scope,$ionicPopup,$window){
	$scope.dbData=[];
	
	var db=window.openDatabase("testDb","3.9.2","myApp","1000000");
	$scope.homeInit=function(data){
		db.transaction(function(tx){
			tx.executeSql("select * from login",[],function(tx1,res){
				if(res.rows.length > 0){
					angular.forEach(res.rows, function(value, key){
						$scope.dbData.push(value);
					});
				}
			});
		});
	}
});
