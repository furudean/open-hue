angular.module('game')
  .factory('levelTemplateService', () => {
    const templates = [
      {
        name: 'the big boy',
        matrix: 'ooooo\n'.repeat(7),
        corners: {
          tl: 'rgb(57, 42, 205)',
          tr: 'rgb(250, 26, 194)',
          bl: '#rgb(109, 240, 86)',
          br: '#rgb(236, 255, 66)',
        },
      },
    ];

    return {
      templates,
    };
  })
;
