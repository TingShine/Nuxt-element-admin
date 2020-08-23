<template>
  <div class="content">
    <el-row class="main-row" type="flex" justify="center" align="center">
      <el-col :span="10">
        <el-card>
          <div slot="header" class="home-header">
            {{$t('home.title')}}
          </div>
          
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-row {
    width: 100%;
    .home-header {
      text-align: center;
      text-transform: uppercase;
      color: white;
      font-family: 'Economica', sans-serif;
      text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
      font-size: 3vw;
      margin: 0;
      -webkit-transition: font-size 0.3s;
      transition: font-size 0.3s;
      vertical-align: middle;
      &:hover {
        font-size: 3.4vw;
        text-shadow: 1px 1px 3px grey;
      }
      home-text {
          font-size: 2.5vw;
      }
    }
  }
}
</style>
