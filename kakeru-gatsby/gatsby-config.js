module.exports = {
  siteMetadata: {
    title: `KAKERU NEYAGAWA`,
    description: `大阪府寝屋川市にある雑居ビル。異業種が集まり新たな価値を創造する場として、Cafe 6D、レンタルスペース、プログラミングスクールが入居。`,
    author: `@kakeru_neyagawa`,
    siteUrl: `https://kakeru-neyagawa.com`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ],
}