angular.module('game')
  .factory('levelTemplateService', () => {
    const templates = [
      {
        name: 'first steps',
        matrix:
          'xxx\n' +
          'xox\n'.repeat(8) +
          'xxx\n',
        corners: {
          tl: '#ffc711',
          tr: '#ffc711',
          bl: '#ff760d',
          br: '#ff760d',
        },
      },
      {
        name: 'the big boy',
        matrix: 'xooox\n'.repeat(5),
        corners: {
          tl: '#3F0039',
          tr: '#820046',
          bl: '#B10D45',
          br: '#E05917',
        },
      },
    ];

    return {
      templates,
    };
  });
