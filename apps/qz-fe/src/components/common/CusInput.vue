<template>
  <div class="cus-search-box">
    <input
      class="cus-search-input"
      type="text"
      :placeholder="placeholder"
      v-model="inputValue"
      @keyup.enter="onSearch"
    />
    <slot name="suffix">
      <button class="cus-search-btn" @click="onSearch">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="7" stroke="#A6CEF6" stroke-width="2" />
          <line
            x1="13.2929"
            y1="13.7071"
            x2="17"
            y2="17.4142"
            stroke="#A6CEF6"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </slot>
  </div>
</template>

<script setup lang="ts" name="CusInput">
  import { ref, defineProps, defineEmits, watch } from 'vue';
  const props = defineProps({
    placeholder: {
      type: String,
      default: '请输入关键字'
    },
    modelValue: String
  });
  const emit = defineEmits(['update:modelValue', 'search']);
  const inputValue = ref(props.modelValue || '');

  function onSearch() {
    emit('search', inputValue.value);
  }

  watch(
    () => props.modelValue,
    (val) => {
      inputValue.value = val;
    }
  );
  watch(inputValue, (val) => {
    emit('update:modelValue', val);
  });
</script>

<style lang="scss" scoped>
  .cus-search-box {
    display: flex;
    width: 360px;
    height: 38px;
    padding: 10px 22px;
    align-items: center;
    gap: 18px;
    border-radius: 19px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px #a6cef6;
    justify-content: space-between;

    .cus-search-input {
      width: 248px;
      flex-shrink: 0;
      border: none;
      outline: none;
      font-size: 16px;
      background: transparent;
      color: #333;
    }

    .cus-search-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  }
</style>
