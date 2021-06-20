import { request } from "./request";

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getRecommend(){
    return request({
        url: '/recommend'
    })
}

export function Goods(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.highNowPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
}

export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParams{
    constructor(info,rule){
        this.image = info.images ? info.images[0] : ''
        this.infos = info.set
        this.sizes = rule.tables
    }
}