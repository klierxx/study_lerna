<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg1">
            <User />
          </el-icon>
          <div class="card-content">
            <count-up class="card-num color1" :end="6666" />
            <div>用户访问量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg2">
            <ChatDotRound />
          </el-icon>
          <div class="card-content">
            <count-up class="card-num color2" :end="168" />
            <div>系统消息</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg3">
            <Goods />
          </el-icon>
          <div class="card-content">
            <count-up class="card-num color3" :end="8888" />
            <div>商品数量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg4">
            <ShoppingCartFull />
          </el-icon>
          <div class="card-content">
            <count-up class="card-num color4" :end="568" />
            <div>今日订单量</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard"></script>

<style lang="scss">
  .card-body {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0;

    .bg1 {
      background: #2d8cf0;
    }

    .bg2 {
      background: #64d572;
    }

    .bg3 {
      background: #f25e43;
    }

    .bg4 {
      background: #e9a745;
    }

    .card-content {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #999;
      padding: 0 20px;

      .card-num {
        font-size: 30px;
      }

      .color1 {
        color: #2d8cf0;
      }

      .color2 {
        color: #64d572;
      }

      .color3 {
        color: #f25e43;
      }

      .color4 {
        color: #e9a745;
      }
    }

    .card-icon {
      font-size: 50px;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      color: #fff;
    }
  }
</style>
