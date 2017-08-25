<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <!--ref一定要写成驼峰的形式-->
      <ul class="menu">
        <li v-for="(item,index) in goods" @click="selectMenu(index)" class="menu-item border-1px" :class="{'current':currentIndex===index}">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]">
            </span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>

              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      shopcart: shopcart,
      cartcontrol: cartcontrol
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    created() {
      this.$http.get('./api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
// 实时监测滚动的位置
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foolist = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foolist.length; i++) {
          let item = foolist[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        let foolist = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foolist[index];
        this.foodScroll.scrollToElement(el, 300);
//        console.log(index);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position absolute
    display flex
    overflow hidden
    width 100%
    top 174px
    bottom 46px
    .menu-wrapper
      width 80px
      flex 0 0 80px
      background #f3f5f7
      .menu
        width 56px
        margin:0 auto;
        .menu-item
          display table
          height 54px
          width 56px
          line-height 14px
          border-1px(rgba(7,17,27,0.1))
          &.current
            position relative
            margin-top -1px
            background #fff
            font-weight 700
          .icon
            display inline-block
            width 12px
            height 12px
            margin-right 2px
            vertical-align top
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
           .text
             display table-cell
             font-size 12px
             vertical-align middle
             text-align center

    .food-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        background rgb(#f3f5f7)
        border-left 2px solid rgb(#d9dde1)
        font-size 12px
        color rgb(147,153,159)
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          &:after
            display none
            margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
          .desc,.extra
            line-height 12px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
          .cartcontrol-wrapper
            position absolute
            right 0px
            bottom 12px
            .now
              margin-right 8px
              font-size 14px
              color red
            .old
              font-size 10px
              text-decoration line-through
              color rgb(147,153,159)
</style>
