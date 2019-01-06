'use strict';

// Import dependencies
const koa = require('koa');
const koaRouter = require('koa-router');
const render = require('koa-ejs');
const path = require('path');

// Declare app constants
const app = new koa();
const router = new koaRouter();

// Error handling
app.use(async (ctx, next) => {
   try {
      await next();
   } catch(err) {
      console.log(err.status);
      ctx.status = err.status || 500;
      ctx.body = err.message;
   }
});

// Templating params
render(app, {
   root: path.join(__dirname, 'views'),
   layout: 'layout',
   viewExt: 'html',
   cache: false,
   debug: true
});

// URL routing
router.get('test', '/', ctx => {
   let koala_attributes = [
      {meta_name: 'Color', meta_value: 'Black and white'},
      {meta_name: 'Native Country', meta_value: 'Australia'},
      {meta_name: 'Animal Classification', meta_value: 'Mammal'},
      {meta_name: 'Life Span', meta_value: '13 - 18 years'},
      {meta_name: 'Are they bears?', meta_value: 'no!'}
   ];

   return ctx.render('index', {
      attributes: koala_attributes
   });
});

// Response
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(1234, () => console.log('Server is running on port 1234'));