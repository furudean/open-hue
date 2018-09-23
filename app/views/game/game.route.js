'use strict';

angular.module('game')
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('game', {
      url: '/game',
      controller: 'game as ctrl',
      templateUrl: 'views/game/game.html',
    });
  });
