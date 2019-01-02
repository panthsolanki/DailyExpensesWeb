module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/DailyExpensesWeb/'
    : '/',
  pages: {
    index: {
      entry: 'dist/index.html',
      template: 'dist/index.html',
      filename: 'index.html',
      title: 'Index Page'
    }
  }
}
