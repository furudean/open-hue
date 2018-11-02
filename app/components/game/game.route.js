angular.module('game')
  .config(($stateProvider) => {
    $stateProvider.state('game', {
      url: '/play/{id:int}',
      controller: 'GameController as $ctrl',
      templateUrl: 'game.html',
    });
  });
