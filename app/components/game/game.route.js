angular.module('game')
  .config(($stateProvider) => {
    $stateProvider.state('game', {
      url: '/game',
      controller: 'gameController as $ctrl',
      templateUrl: 'components/game/game.html',
    });
  });
