module.exports = {
  title: "BillyQin's Blog",
  description: 'This is BillyQin Blog',
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
          'promise',
          'hoisting',
          'transformation'
        ]
    },
    // displayAllHeaders: true,
    // sidebarDepth: 2
  },
}