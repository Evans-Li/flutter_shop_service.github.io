module.exports = (app)=>{
  const {router,controller} = app;
  router.post('/default/homeData',controller.default.index.homeData);  // 首页数据
  router.post('/default/getHomeHotGoods',controller.default.index.getHomeHotGoods);  // 首页火爆商品
}