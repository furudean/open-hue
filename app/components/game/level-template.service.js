angular.module('game')
  .factory('levelTemplateService', () => {
    const templates = [
      {
        name: 'the big boy',
        matrix: 'xooooox\n'.repeat(7),
        corners: {
          tl: '#FF8711',
          tr: '#FF8711',
          bl: '#FF3F11',
          br: '#FF3F11',
        },
      },
    ];

    return {
      templates,
    };
  });
