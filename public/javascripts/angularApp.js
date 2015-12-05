var app = angular.module('Shoutbox', ['ngRoute', 'ngResource']).run(function($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  //add to $rootScope so users can logout straight from nav
  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
  });

//directive for user, used in login.html and register.html
app.directive('user', function() {
  var directive = {};
  //new element
  directive.restrict = 'E';
  directive.template = "<input type='username' ng-model='user.username' placeholder='Username' class='form-control'><br>" +
  "<input type='password' ng-model='user.password' placeholder='Password' class='form-control'><br>";
  //use parent scope
  directive.scope = false;

  return directive;
});

//use $resource in postService factory, so we don't
//have to manually call out to our endpoint with each type of request
app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});

app.controller('mainController', function($rootScope, $scope, postService){
  $scope.posts = postService.query();
  $scope.newPost = {created_by: '', text: '', created_at: ''};

  $scope.post = function(){
   $scope.newPost.created_by = $rootScope.current_user;
   $scope.newPost.created_at = Date.now();
   postService.save($scope.newPost, function(){
    $scope.posts = postService.query();
    $scope.newPost = {created_by: '', text: '', created_at: ''};
  });
 };
});

app.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});