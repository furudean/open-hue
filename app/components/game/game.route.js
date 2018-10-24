angular.module('game')
  .config(($stateProvider) => {
    $stateProvider.state('game', {
      url: '/play/{id:int}',
      controller: 'gameController as $ctrl',
      templateUrl: 'components/game/game.html',
    });
  });
