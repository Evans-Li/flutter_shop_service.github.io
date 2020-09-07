const { consoleLevel } = require('egg-mock');

const Controller = require('egg').Controller
class HomeController extends Controller {
  // 首页数据
  async homeData() {
    let bannerList = await this.app.mysql.select('banner');
    let cateList = await this.app.mysql.select('category');
    let adPicture = await this.app.mysql.select('ad');
    let company = await this.app.mysql.select('company');
    let floor = await this.app.mysql.select('floor_goods');
    let recommendList = await this.app.mysql.select('recommend');
    let floorType = await this.app.mysql.select('goods_type');

    // 楼层数据
    let floorType1 = floorType.filter(e => e.type_id == 1);
    let floorType2 = floorType.filter(e => e.type_id == 2);
    let floor1 = floor.filter(e => e.goods_type == 1);
    let floor2 = floor.filter(e => e.goods_type == 2);
    let floor1GodsList = {
      floor1Title: floorType1[0].type_img,
      goodsList: floor1
    };
    let floor2GodsList = {
      floor2Title: floorType2[0].type_img,
      goodsList: floor2
    };
    this.ctx.body = {
      data: {
        bannerList,
        cateList,
        adPicture,
        company,
        recommendList,
        floor1GodsList,
        floor2GodsList
      }
    }
    console.log('[ok] /homeData')
  }

  //首页火爆商品
  async getHomeHotGoods() {
    let page = this.ctx.request.body.page;
    // 每次上拉加载特定个数
    let sql  = `
      SELECT hot_goods.id as id,
      hot_goods.image as image,
      hot_goods.name as name,
      hot_goods.price as price,
      hot_goods.mallprice as mallprice,
      hot_goods.type_id as typeId,
      goods_type.type_name as typeName FROM hot_goods LEFT JOIN goods_type ON hot_goods.type_id = goods_type.type_id  
      ORDER BY hot_goods.id LIMIT ${page},2
      `
    let hotGoodList = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: hotGoodList,
    }
  }
}

module.exports = HomeController;