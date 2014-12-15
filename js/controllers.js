/* Controllers */
var dmhyBotCtrls = angular.module('dmhyBotCtrls', ['ngCookies']);

dmhyBotCtrls.run(function($http){
    $http.defaults.xsrfCookieName = 'csrftoken';//auto get the value of 'csrftoken' in the cookie
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';//auto add csrf token into the post header 
});

dmhyBotCtrls.controller('homeCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.reverse = true;
        $scope.column  = 'last_update';
        $scope.tasks = { "tasklist":[] };
        $http.get('/dmhy/api/tasklist/').
        success(function( data, status, header, config ){
            if( status == 200 ){
                $scope.tasks = data['tasklist'];
                angular.forEach( data['tasklist'], function( val, idx ){
                    $scope.tasks[idx]['last_update'] = val['last_update'].substr(0,19);
                });
            }
        }).
        error( function( data, status, header, config ){
            $scope.tasks = { "error": status, "tasklist":[] };
        }); 
    }]);

dmhyBotCtrls.controller('historyCtrl', ['$scope','$http',
    function($scope, $http) {
        $http.get('/dmhy/api/history/').
        success( function( data, status, header, config){
            $scope.records = data;
            angular.forEach( data, function( val, idx ){
                $scope.records[idx]['date'] = val['date'].substr(0,19);
            });
        }).
        error( function( data, status, header, config){
    
        });
        
}]);

dmhyBotCtrls.controller('searchingCtrl', ['$scope', '$http',
    function( $scope, $http ){
        $scope.keywords = '';
        $scope.result = {};
        $scope.addTask = true;
        $scope.sendKeyword = function(k){
            request = $http.get('/dmhy/api/search/',{ "params":{ "keyword":k }});
            request.success(function( data ){
                $scope.result = data;
            });
            request.error(function(e){
                $scope.result = "An error occured <br>" + e;
            });

        };
        $scope.addToQueue = function(){
            
        };
}]);

dmhyBotCtrls.controller('loginCtrl', ['$scope', '$http', '$location', '$cookies', 
    function( $scope, $http, $location, $cookies ){
        $scope.username = $scope.password = '';           
        var csrftoken = $cookies.csrftoken; 

        $scope.login = function(username, password)
        {
            var login_data = {'username':username, 'password':password};
            $http.post('/dmhy/login/', angular.toJson( login_data )).
            success(function( data ){
                $scope.result = data;
            }).
            error(function(){});
        }
}]);

dmhyBotCtrls.controller('logoutCtrl', ['$scope', '$http', '$location',
    function( $scope, $http, $location ){
        request = $http.get('/dmhy/logout');
        $location.path('/home').replace();
}]);

dmhyBotCtrls.controller('navCtrl', ['$scope', '$location', 
    function($scope, $location ){
        $scope.navbarActive = function(nowPage){
            path = $location.path().substr(1);
            if( nowPage == path  )return 'active';
            else return '';
        };
}]);
    
