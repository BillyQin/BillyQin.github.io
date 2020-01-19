module.exports = {
  title: "BillyQin's Blog",
  description: 'This is BillyQin Blog',
  home: false,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/BillyQin/BillyQin.github.io' },
    ],
    sidebar: [
      '/git/1',
      '/git/2',
    ],
    displayAllHeaders: true,
    sidebarDepth: 2
  }
}