<template>
  <li class="item clearfix" :class="type">
    <img class="item-img" :src="pic">
    <div class="item-info-wrap">
      <div class="item-info">
        <p class="item-name">{{ name }}</p>
        <p><span class="item-singer" v-if="singer">{{ singer }} </span><span class="item-public-time">{{ publicTime }}</span></p>
      </div>
      <i class="iconfont btn-into" v-if="showInto">&#xe606;</i>
    </div>
  </li>
</template>

<script>
export default {
  props: ['type', 'id', 'name', 'pic', 'singer', 'publicTime', 'showInto']
}
</script>


<style lang="scss" scoped>
.item {
  position: relative;
  margin-bottom: 2px;
  background-color: #fff;

  .item-img {
    float: left;
    height: 72px;
  }

  .item-info-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    // margin-left: 10px;
    color: #000;
    border-bottom: 0.5px solid #ddd;

    .item-info {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding-right: 10px;
      width: 100%;
      line-height: 30px;
    }

    p {
      width: 92%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .item-singer {
      margin-right: 6px;
      height: 30px;
      font-size: 14px;
    }

    .item-public-time {
      font-size: 14px;
      color: #666;
    }

    .btn-into {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      padding-right: 10px;
      font-size: 20px;
      color: #666;
      line-height: 70px;
    }
  }

  &.album .item-info-wrap {
    width: 77%;
  }
  &.mv .item-info-wrap {
    width: 60%;
  }
}
</style>
