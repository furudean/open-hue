angular.module('game')
  .factory('levelTemplateService', () => {
    const templates = [
      {
        name: 'the big boy',
        matrix: 'xoooox\n'.repeat(7),
        corners: {
          tl: '#392ACD',
          tr: '#FA1AC2',
          bl: '#6DF0BA',
          br: '#ECFF42',
        },
      },
    ];

    return {
      templates,
    };
  });
