angular.module('game')
  .factory('levelTemplateService', () => {
    const templates = [
      {
        name: 'the big boy',
        matrix: `
          oooooooooo
          oooooooooo
          oooooooooo
          oooooooooo
          oooooooooo
          oooooooooo
        `,
        corners: {
          tl: '#258EA6',
          tr: '#549F93',
          bl: '#9FAF90',
          br: '#E2B1B1',
        },
      },
    ];

    return {
      templates,
    };
  })
;
