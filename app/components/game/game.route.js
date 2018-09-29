'use strict';

angular.module('game')
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('game', {
      url: '/game',
      controller: 'game as ctrl',
      templateUrl: 'components/game/game.html',
    });
  });
