<template>
  <div class="lang-select">
    <el-dropdown trigger="click" class="international" @command="onHandleSetLanguage">
      <div>
        <el-tooltip :content="$t('navBar.lang')" :effect="effect">
          <span id="guide-lang">
            <svg-icon icon="language" className="lang-select-icon header-icon" />
          </span>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language === 'zhCn'" command="zhCn"> 中文 </el-dropdown-item>
          <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingStore } from '@/store/modules/setting';

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
const language = computed(() => settingStore.language);

// 切换语言的方法
const i18n = useI18n();

// 切换i18n语言状态
const onHandleSetLanguage = (lang: string) => {
  // 切换i18n里的locale
  i18n.locale.value = lang;
  settingStore.setLanguage(lang);
  ElMessage.success(i18n.t('toast.switchLangSuccess'));
};
</script>

<style lang="scss" scoped>
.lang-select {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
  .lang-select-icon {
    font-size: 24px;
  }
}
</style>
