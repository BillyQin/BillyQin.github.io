module.exports = {
  title: "BillyQin's Blog",
  description: '覃昶栋的博客',
  keywords: '覃昶栋的博客',
  home: false,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      // { text: '关于', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/BillyQin' },
    ],
    sidebar: {
        '/git/': [
          '1',
          '2'
        ],
        '/dataStruct/': [
          'queue'
        ],
        '/js/': [
          'hoisting',
          'this',
          'transformation',
          'promise',
        ],
        '/react/': [
          'hooks'
        ],
        '/algo/': [
          'bsearch'
        ],
        '/money/': [
          'option'
        ]
    },
    // displayAllHeaders: true,
    // sidebarDepth: 2
  },
}