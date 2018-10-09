angular.module('app')
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/game');
  });
