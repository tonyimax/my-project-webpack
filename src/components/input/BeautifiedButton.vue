<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
    :style="customStyle"
  >
    <!-- 加载动画 -->
    <span v-if="loading" class="v-button__loading">
      <svg class="v-button__loading-icon" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
      </svg>
    </span>

    <!-- 图标 -->
    <span v-if="icon && !loading" class="v-button__icon">
      <slot name="icon">
        <i :class="['icon', `ic--${icon}`]"></i>
      </slot>
    </span>

    <!-- 内容 -->
    <span class="v-button__content">
      <slot></slot>
    </span>

    <!-- 右侧图标（如果有的话） -->
    <span v-if="iconRight" class="v-button__icon-right">
      <i :class="['icon', `icon-${iconRight}`]"></i>
    </span>

    <!-- 悬浮效果 -->
    <span v-if="!disabled && !text" class="v-button__hover"></span>

    <!-- 涟漪效果 -->
    <span v-if="ripple && !disabled" class="v-button__ripple"></span>
  </button>
</template>

<script>
export default {
  name: 'VButton',

  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return ['primary', 'secondary', 'success', 'warning', 'danger', 'info'].includes(value)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['large', 'medium', 'small', 'mini'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: true
    },
    outline: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    hoverColor: {
      type: String,
      default: ''
    }
  },

  computed: {
    buttonClasses () {
      return [
        'v-button',
        `v-button--${this.type}`,
        `v-button--${this.size}`,
        {
          'v-button--disabled': this.disabled,
          'v-button--loading': this.loading,
          'v-button--block': this.block,
          'v-button--round': this.round,
          'v-button--shadow': this.shadow,
          'v-button--outline': this.outline,
          'v-button--text': this.text
        }
      ]
    },

    customStyle () {
      const styles = {}

      if (this.backgroundColor) {
        styles['--button-bg-color'] = this.backgroundColor
      }
      if (this.textColor) {
        styles['--button-text-color'] = this.textColor
      }
      if (this.borderColor) {
        styles['--button-border-color'] = this.borderColor
      }
      if (this.hoverColor) {
        styles['--button-hover-color'] = this.hoverColor
      }

      return styles
    }
  },

  methods: {
    handleClick (event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event)

        // 添加涟漪效果
        if (this.ripple) {
          const button = event.currentTarget
          const ripple = button.querySelector('.v-button__ripple')

          if (ripple) {
            ripple.classList.remove('v-button__ripple--animate')
            // 触发重绘
            void ripple.offsetWidth
            ripple.classList.add('v-button__ripple--animate')
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.v-button {
  --button-primary: #409eff;
  --button-success: #67c23a;
  --button-warning: #e6a23c;
  --button-danger: #f56c6c;
  --button-info: #909399;
  --button-secondary: #6c757d;

  --button-bg-color: var(--button-primary);
  --button-text-color: white;
  --button-border-color: transparent;
  --button-hover-color: rgba(255, 255, 255, 0.1);

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid var(--button-border-color);
  border-radius: 6px;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  outline: none;
  min-width: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 按钮类型 */
.v-button--primary {
  --button-bg-color: var(--button-primary);
}

.v-button--secondary {
  --button-bg-color: var(--button-secondary);
}

.v-button--success {
  --button-bg-color: var(--button-success);
}

.v-button--warning {
  --button-bg-color: var(--button-warning);
}

.v-button--danger {
  --button-bg-color: var(--button-danger);
}

.v-button--info {
  --button-bg-color: var(--button-info);
}

/* 尺寸 */
.v-button--large {
  padding: 12px 24px;
  font-size: 16px;
  min-width: 100px;
}

.v-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  min-width: 80px;
}

.v-button--small {
  padding: 8px 16px;
  font-size: 13px;
  min-width: 70px;
}

.v-button--mini {
  padding: 6px 12px;
  font-size: 12px;
  min-width: 60px;
}

/* 状态和变体 */
.v-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.v-button--loading {
  cursor: wait;
}

.v-button--block {
  display: flex;
  width: 100%;
}

.v-button--round {
  border-radius: 50px;
}

.v-button--shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.v-button--shadow:hover:not(.v-button--disabled) {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.v-button--outline {
  background-color: transparent;
  color: var(--button-bg-color);
  border-color: var(--button-bg-color);
}

.v-button--outline:hover:not(.v-button--disabled) {
  background-color: var(--button-bg-color);
  color: white;
}

.v-button--text {
  background-color: transparent;
  border-color: transparent;
  color: var(--button-bg-color);
  box-shadow: none;
}

.v-button--text:hover:not(.v-button--disabled) {
  background-color: rgba(var(--button-bg-color-rgb), 0.1);
}

/* 悬停效果 */
.v-button__hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--button-hover-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.v-button:hover:not(.v-button--disabled):not(.v-button--loading) .v-button__hover {
  opacity: 1;
}

/* 涟漪效果 */
.v-button__ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  pointer-events: none;
  width: 100px;
  height: 100px;
  opacity: 0;
}

.v-button__ripple--animate {
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* 加载动画 */
.v-button__loading {
  display: inline-flex;
  align-items: center;
}

.v-button__loading-icon {
  width: 16px;
  height: 16px;
  animation: rotate 1s linear infinite;
}

.v-button__loading-icon circle {
  stroke: currentColor;
  stroke-linecap: round;
  stroke-dasharray: 80;
  stroke-dashoffset: 60;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

/* 图标 */
.v-button__icon,
.v-button__icon-right {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
}

.v-button__content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* 鼠标按下效果 */
.v-button:active:not(.v-button--disabled) {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 移除默认焦点样式 */
.v-button:focus {
  outline: none;
}

/* 自定义焦点样式 */
.v-button:focus-visible {
  box-shadow: 0 0 0 3px rgba(var(--button-bg-color-rgb), 0.3);
}
</style>
