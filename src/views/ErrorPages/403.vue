<template>
  <div class="app-container">
    <div class="app-container-inner">
      <div class="http-container">
        <div class="http">
          <div class="http-img">
            <img class="img-parent" src="@/assets/images/403.png" alt="403" />
            <img class="img-child left" src="@/assets/images/error_cloud.png" alt="403" />
            <img class="img-child mid" src="@/assets/images/error_cloud.png" alt="403" />
            <img class="img-child right" src="@/assets/images/error_cloud.png" alt="403" />
          </div>
          <div class="http-btn">
            <div class="btn-noauth">{{ $t('toast.noAuth403Title') }}</div>
            <div class="btn-info">{{ $t('toast.noAuthInfo') }}</div>
            <router-link to="/" class="btn">{{ $t('toast.noAuthBackHome') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.http-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .http {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;
    .http-img {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;
      .img-parent {
        width: 100%;
      }
      .img-child {
        position: absolute;
        &.left {
          top: 17px;
          left: 220px;
          width: 80px;
          opacity: 0;
          animation-name: cloudLeft;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }
        &.mid {
          top: 10px;
          left: 420px;
          width: 46px;
          opacity: 0;
          animation-name: cloudMid;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1.2s;
          animation-fill-mode: forwards;
        }
        &.right {
          top: 100px;
          left: 500px;
          width: 62px;
          opacity: 0;
          animation-name: cloudRight;
          animation-duration: 2s;
          animation-timing-function: linear;
          animation-delay: 1s;
          animation-fill-mode: forwards;
        }

        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }
          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }
          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }
          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }

        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }
          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }
          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }
          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }

        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }
          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }
          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }
          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }
    .http-btn {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      .btn-noauth {
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      .btn-info {
        margin-bottom: 30px;
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      .btn {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #1482f0;
        border-radius: 100px;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }

      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(60px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}
a {
  text-decoration: none;
}
</style>
