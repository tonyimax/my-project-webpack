<template>
  <div
    class="beautified-input"
    :class="inputClasses"
  >
    <!-- 标签 -->
    <label
      v-if="label"
      class="input-label"
      :for="inputId"
    >
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <!-- 输入区域 -->
    <div class="input-wrapper">
      <!-- 前缀图标 -->
      <div v-if="prefixIcon" class="prefix-icon">
        <component :is="prefixIcon" />
      </div>

      <!-- 文本输入框 -->
      <input
        v-if="type !== 'textarea'"
        :id="inputId"
        ref="inputRef"
        :type="actualType"
        :value="value"
        :placeholder="actualPlaceholder"
        :disabled="disabled || loading"
        :required="required"
        :autocomplete="autocomplete"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleEnter"
        class="input-element"
      />

      <!-- 文本区域 -->
      <textarea
        v-else
        :id="inputId"
        ref="textareaRef"
        :value="value"
        :placeholder="actualPlaceholder"
        :disabled="disabled || loading"
        :required="required"
        :rows="rows"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        class="input-element textarea-element"
      />

      <!-- 后缀区域 -->
      <div class="suffix-area">
        <!-- 加载指示器 -->
        <div v-if="loading" class="loading-indicator">
          <div class="loading-spinner"></div>
        </div>

        <!-- 清除按钮 -->
        <button
          v-else-if="clearable && hasValue && !disabled"
          type="button"
          class="clear-button"
          @click="handleClear"
          aria-label="清除内容"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <!-- 密码显示切换 -->
        <button
          v-else-if="showPasswordToggle && type === 'password' && !disabled"
          type="button"
          class="password-toggle"
          @click="togglePasswordVisibility"
          aria-label="切换密码可见性"
        >
          <svg v-if="showPassword" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
          </svg>
        </button>

        <!-- 后缀图标 -->
        <div v-else-if="suffixIcon" class="suffix-icon">
          <component :is="suffixIcon" />
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div v-if="hint" class="hint-text">
      {{ hint }}
    </div>

    <!-- 错误信息 -->
    <div v-if="hasError" class="error-text">
      {{ actualErrorMessage }}
    </div>

    <!-- 验证信息 -->
    <div v-if="status === 'success' && !hasError" class="success-text">
      {{ successMessage || '验证通过' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeautifiedInput',

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    // 输入值（使用 v-model）
    value: {
      type: [String, Number],
      default: ''
    },

    // 输入类型
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'password', 'email', 'tel', 'number', 'textarea', 'search'].includes(value)
    },

    // 标签文本
    label: {
      type: String,
      default: ''
    },

    // 占位符
    placeholder: {
      type: String,
      default: ''
    },

    // 是否必填
    required: {
      type: Boolean,
      default: false
    },

    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },

    // 是否显示加载状态
    loading: {
      type: Boolean,
      default: false
    },

    // 是否可清除
    clearable: {
      type: Boolean,
      default: false
    },

    // 是否显示密码切换按钮
    showPasswordToggle: {
      type: Boolean,
      default: false
    },

    // 前缀图标组件
    prefixIcon: {
      type: Object,
      default: null
    },

    // 后缀图标组件
    suffixIcon: {
      type: Object,
      default: null
    },

    // 样式变体
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'outlined', 'filled', 'rounded', 'minimal'].includes(value)
    },

    // 状态
    status: {
      type: String,
      default: '',
      validator: (value) => ['', 'success', 'warning'].includes(value)
    },

    // 验证规则数组
    rules: {
      type: Array,
      default: () => []
    },

    // 是否在输入时实时验证
    validateOnChange: {
      type: Boolean,
      default: false
    },

    // 错误消息
    errorMessage: {
      type: String,
      default: ''
    },

    // 成功消息
    successMessage: {
      type: String,
      default: ''
    },

    // 提示信息
    hint: {
      type: String,
      default: ''
    },

    // 自动完成
    autocomplete: {
      type: String,
      default: 'off'
    },

    // 文本区域行数
    rows: {
      type: Number,
      default: 3
    }
  },

  data () {
    return {
      isFocused: false,
      showPassword: false,
      internalError: '',
      inputId: `input-${Math.random().toString(36).substring(2, 9)}`
    }
  },

  computed: {
    inputClasses () {
      return [
        `variant-${this.variant}`,
        this.status,
        {
          'has-error': this.hasError,
          'has-focus': this.isFocused,
          'has-value': this.hasValue,
          'is-disabled': this.disabled,
          'is-loading': this.loading,
          'has-prefix-icon': this.prefixIcon,
          'has-suffix-icon': this.suffixIcon || this.showPasswordToggle || this.clearable
        }
      ]
    },

    hasValue () {
      return this.value !== null && this.value !== undefined && this.value !== ''
    },

    hasError () {
      return this.errorMessage || this.internalError
    },

    actualErrorMessage () {
      return this.errorMessage || this.internalError
    },

    actualPlaceholder () {
      if (this.placeholder) return this.placeholder
      if (this.label && this.variant === 'minimal') return this.label
      return ''
    },

    actualType () {
      if (this.type === 'password' && this.showPassword) return 'text'
      return this.type
    }
  },

  watch: {
    value (newVal) {
      if (this.validateOnChange && this.rules.length > 0) {
        this.validate(newVal)
      }
    }
  },

  methods: {
    handleInput (event) {
      const value = event.target.value
      this.$emit('input', value)
    },

    handleFocus (event) {
      this.isFocused = true
      this.$emit('focus', event)
    },

    handleBlur (event) {
      this.isFocused = false

      if (this.rules.length > 0) {
        this.validate(this.value)
      }

      this.$emit('blur', event)
    },

    handleEnter (event) {
      this.$emit('enter', event)
    },

    handleClear () {
      this.$emit('input', '')
      this.$emit('clear')

      this.$nextTick(() => {
        const el = this.$refs.inputRef || this.$refs.textareaRef
        if (el) el.focus()
      })
    },

    togglePasswordVisibility () {
      this.showPassword = !this.showPassword
    },

    validate (value = this.value) {
      if (!this.rules || this.rules.length === 0) {
        this.internalError = ''
        this.$emit('validate', { valid: true, message: '' })
        return true
      }

      for (const rule of this.rules) {
        if (rule.validator && !rule.validator(value)) {
          this.internalError = rule.message
          this.$emit('validate', { valid: false, message: rule.message })
          return false
        }
      }

      this.internalError = ''
      this.$emit('validate', { valid: true, message: '' })
      return true
    },

    focus () {
      const el = this.$refs.inputRef || this.$refs.textareaRef
      if (el) el.focus()
    },

    blur () {
      const el = this.$refs.inputRef || this.$refs.textareaRef
      if (el) el.blur()
    }
  },

  mounted () {
    // 如果组件挂载时已经有值，进行初始验证
    if (this.value && this.rules.length > 0) {
      this.validate(this.value)
    }
  }
}
</script>

<style scoped>
.beautified-input {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  transition: all 0.3s ease;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a5568;
  transition: color 0.2s;
}

.required-mark {
  color: #f56565;
  margin-left: 2px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-element {
  flex: 1;
  width: 100%;
  padding: 14px 16px;
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background-color: white;
  color: #2d3748;
  transition: all 0.3s ease;
  outline: none;
  box-sizing: border-box;
}

.input-element:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
}

.input-element::placeholder {
  color: #a0aec0;
}

.textarea-element {
  resize: vertical;
  min-height: 44px;
  line-height: 1.5;
}

/* 图标样式 */
.prefix-icon,
.suffix-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
  transition: color 0.2s;
}

.prefix-icon {
  position: absolute;
  left: 14px;
  z-index: 1;
}

.has-prefix-icon .input-element {
  padding-left: 44px;
}

.suffix-area {
  position: absolute;
  right: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.has-suffix-icon .input-element,
.has-prefix-icon.has-suffix-icon .input-element {
  padding-right: 44px;
}

/* 清除按钮 */
.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 4px;
  border-radius: 50%;
  color: #a0aec0;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-button:hover {
  color: #718096;
  background-color: #f7fafc;
}

.clear-button:active {
  transform: scale(0.9);
}

/* 密码切换按钮 */
.password-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  color: #a0aec0;
  cursor: pointer;
  transition: all 0.2s;
}

.password-toggle:hover {
  color: #4299e1;
  background-color: #f7fafc;
}

/* 加载指示器 */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-top-color: #4299e1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 提示和错误消息 */
.hint-text {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #718096;
}

.error-text {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #f56565;
  font-weight: 500;
}

.success-text {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #48bb78;
  font-weight: 500;
}

/* 状态样式 */
.beautified-input.has-error .input-element {
  border-color: #f56565;
}

.beautified-input.has-error .input-element:focus {
  border-color: #f56565;
  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.15);
}

.beautified-input.has-error .input-label {
  color: #f56565;
}

.beautified-input.has-error .prefix-icon,
.beautified-input.has-error .suffix-icon {
  color: #f56565;
}

.beautified-input.status-success .input-element {
  border-color: #48bb78;
}

.beautified-input.status-success .input-element:focus {
  border-color: #48bb78;
  box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.15);
}

.beautified-input.status-success .prefix-icon,
.beautified-input.status-success .suffix-icon {
  color: #48bb78;
}

.beautified-input.status-warning .input-element {
  border-color: #ed8936;
}

.beautified-input.status-warning .input-element:focus {
  border-color: #ed8936;
  box-shadow: 0 0 0 3px rgba(237, 137, 54, 0.15);
}

/* 禁用状态 */
.beautified-input.is-disabled .input-element {
  background-color: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

.beautified-input.is-disabled .input-label {
  color: #a0aec0;
}

/* 变体样式 */
.beautified-input.variant-outlined .input-element {
  background-color: transparent;
  border-width: 1px;
}

.beautified-input.variant-filled .input-element {
  background-color: #f7fafc;
  border-color: transparent;
}

.beautified-input.variant-filled .input-element:focus {
  background-color: white;
  border-color: #4299e1;
}

.beautified-input.variant-rounded .input-element {
  border-radius: 24px;
}

.beautified-input.variant-rounded.textarea-element {
  border-radius: 16px;
}

.beautified-input.variant-minimal .input-element {
  border: none;
  border-bottom: 2px solid #e2e8f0;
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
  background-color: transparent;
}

.beautified-input.variant-minimal .input-element:focus {
  border-bottom-color: #4299e1;
  box-shadow: none;
}

.beautified-input.variant-minimal.has-prefix-icon .input-element {
  padding-left: 30px;
}

.beautified-input.variant-minimal .prefix-icon {
  left: 0;
}

.beautified-input.variant-minimal .input-label {
  position: absolute;
  top: 14px;
  left: 0;
  font-size: 1rem;
  color: #a0aec0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1;
}

.beautified-input.variant-minimal.has-value .input-label,
.beautified-input.variant-minimal.has-focus .input-label,
.beautified-input.variant-minimal.has-prefix-icon .input-label {
  top: -20px;
  font-size: 0.85rem;
  color: #4299e1;
}

.beautified-input.variant-minimal.has-error .input-label {
  color: #f56565;
}

/* 聚焦时标签动画 */
.beautified-input:not(.variant-minimal).has-focus .input-label {
  color: #4299e1;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .input-element {
    padding: 12px 14px;
    font-size: 16px; /* 防止iOS缩放 */
  }

  .has-prefix-icon .input-element {
    padding-left: 40px;
  }

  .has-suffix-icon .input-element,
  .has-prefix-icon.has-suffix-icon .input-element {
    padding-right: 40px;
  }

  .prefix-icon {
    left: 12px;
  }

  .suffix-area {
    right: 12px;
  }
}
</style>
