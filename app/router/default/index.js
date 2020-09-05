module.exports = (app)=>{
  const {router,controller} = app;
  router.get('/default/homeData',controller.default.index.homeData);  // 首页数据
}