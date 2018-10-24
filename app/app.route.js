angular.module('app')
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/play/1');
    $locationProvider.html5Mode(true);
  });
