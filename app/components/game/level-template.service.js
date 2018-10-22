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
          topLeft: '#86D3E6',
          topRight: '#86D3E6',
          bottomLeft: '#006E90',
          bottomRight: '#006E90',
        },
      },
      {
        name: 'the big boy',
        matrix: 'xooox\n'.repeat(5),
        corners: {
          topLeft: '#3F0039',
          topRight: '#820046',
          bottomLeft: '#B10D45',
          bottomRight: '#E05917',
        },
      },
    ];

    return {
      templates,
    };
  });
