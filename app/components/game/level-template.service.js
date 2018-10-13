angular.module('game')
  .factory('levelTemplateService', () => {
    const levels = [
      [
        [['#0A2342'], ['#2CA58D']],
        [['#FFFDF7'], ['#84BC9C']],
        [['#F46197'], ['#0A2342']],
      ],
    ];

    return {
      levels,
    };
  })
;
