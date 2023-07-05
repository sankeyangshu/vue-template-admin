<template>
  <div class="component-size">
    <el-dropdown trigger="click" class="international" @command="onChangeComponentSize">
      <div>
        <el-tooltip :content="$t('navBar.componentSize')" :effect="effect">
          <span id="guide-lang">
            <svg-icon icon="componentsize" className="component-size-icon header-icon" />
          </span>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="componentSize === 'default'" command="default">
            {{ $t('componentSize.default') }}
          </el-dropdown-item>
          <el-dropdown-item :disabled="componentSize === 'large'" command="large">
            {{ $t('componentSize.large') }}
          </el-dropdown-item>
          <el-dropdown-item :disabled="componentSize === 'small'" command="small">
            {{ $t('componentSize.small') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore, componentSizeType } from '@/store/modules/setting';

// 获取父组件传递的值
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value: string) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1;
    },
  },
});

// 获取全局设置
const settingStore = useSettingStore();

// 获取全局设置中国际化默认值
const componentSize = computed(() => settingStore.componentSize);

// 切换组件尺寸
const onChangeComponentSize = (size: componentSizeType) => {
  settingStore.setComponentSize(size);
};
</script>

<style lang="scss" scoped>
.component-size {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
  .component-size-icon {
    font-size: 24px;
  }
}
</style>
