module.exports = (app)=>{
  const {router,controller} = app;
  router.post('/default/homeData',controller.default.index.homeData);  // 首页数据
}