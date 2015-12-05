describe('Routes test', function() {
  // Mock our module in our tests
  beforeEach(module('Shoutbox'));

  var location, route, rootScope;

  beforeEach(inject(
    function(_$location_, _$route_, _$rootScope_) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
    }
  ));

  describe('index route', function() {
    beforeEach(inject(
      function($httpBackend) {
        $httpBackend.expectGET('main.html')
          .respond(200, 'main HTML');
      }
    ));

    it('should load the index page on successful load of /', function() {
      location.path('/');
      rootScope.$digest(); // call the digest loop
      expect(route.current.controller).toBe('mainController');
    });

  });

  describe('login route', function() {
    beforeEach(inject(
      function($httpBackend) {
        $httpBackend.expectGET('login.html')
          .respond(200, 'login HTML');
      }
    ));

    it('should load the login page on successful load of /login', function() {
      location.path('/login');
      rootScope.$digest(); // call the digest loop
      expect(route.current.controller).toBe('authController');
    });

  });

  describe('register route', function() {
    beforeEach(inject(
      function($httpBackend) {
        $httpBackend.expectGET('register.html')
          .respond(200, 'register HTML');
      }
    ));

    it('should load the register page on successful load of /register', function() {
      location.path('/register');
      rootScope.$digest(); // call the digest loop
      expect(route.current.controller).toBe('authController');
    });

  });
});