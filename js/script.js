var app = angular.module("app",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl : "partials/mainpage.html",
		controller  : "maincontroller"
	}) 
	.when('/collection/:id/:name',{
		templateUrl:"partials/collection.html",
		controller: "collectioncontroller"
	})
	.when('/category/:id/:name',{
		templateUrl:"partials/category.html",
		controller:"categorycontroller"
	})
	.otherwise({ 
		redirectTo: '/' 
	});
});

app.filter('myDate', function($filter){
    return function(input){
        if(input == null){ return "";}
        var date = $filter('date')(new Date(input), 'dd MMMM yyyy @ hh:mm a');
        return date;
    };
});


app.controller("maincontroller",function($scope,$http){
	$http.get("data.json").then(function(response){
		$scope.data = response.data;
	});
});


app.controller("collectioncontroller",function($scope,$http,$routeParams){
	$scope.subCollection = $routeParams.name;
	$scope.array1 = [];
	$http.get("data.json").then(function(response){
		$scope.data = response.data;
		angular.forEach($scope.data.events,function(each){
			if($routeParams.id == each.collections){
				$scope.array1.push(each);				
			}
		});
	});

	$scope.datefilter = function(startDate,endDate) {
        $scope.error = '';
        var ts = moment("startDate", "M/D/YYYY H:mm").valueOf();
       	
        alert(ts);

        if(new Date(startDate) > new Date(endDate)){
          $scope.error = 'End Date should be greater than start date';
          return false;
        }
        else{
        	$http.get("data.json").then(function(response){
				$scope.data = response.data;
				angular.forEach($scope.data.events,function(each){
				if($routeParams.id == each.collections && each.start_date >= sd){
							alert("success");


				}
			});
			});
        }


    }; 

});

app.controller("categorycontroller",function($scope,$http,$routeParams){
	$scope.subCategory = $routeParams.name;
	$scope.array2 = [];
	$http.get("data.json").then(function(response){
		$scope.data = response.data;
		angular.forEach($scope.data.categories,function(each){
			if($routeParams.id == each.id){
				$scope.array2.push(each);
			}
		});
	});
});