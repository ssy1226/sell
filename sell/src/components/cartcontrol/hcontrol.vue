<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCount">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="addCount"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCount() {
        if (this.food.count > 0) {
          this.food.count--;
        }
      },
      addCount(event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-increase
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
    .cart-decrease
      display inline-block
      padding 6px
      &.fade-enter-active, .fade-leave-active
        transition: opacity 1s all linear
        transform translate3D(0,0,0)
      &.fade-enter, .fade-leave-to
        opacity: 0
        transform translate3D(24px,0,0)
      .inner
        font-size 24px
        line-height 24px
        color rgb(0,160,220)
    .cart-count
      display inline-block
      vertical-align top
      line-height 24px
      padding-top 6px
      text-align center
      font-size 10px
      color rgb(147,153,159)
      width 12px

</style>
