<template>
  <ol class="modern-list">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      :class="{ completed: item.completed }"
      @click="toggleItem(item)"
      :style="{ marginBottom: itemSpacing + 'px' }"
    >
      <div
        class="list-number"
        :style="{
          backgroundColor: customColor || '#3a86ff',
          fontSize: customFontSize || '1rem'
        }"
      >{{ index + 1 }}</div>
      <div class="list-content">
        <h3
          class="list-title"
          :style="{ fontSize: customFontSize || '1rem' }"
        >{{ item.title }}</h3>
        <p
          class="list-description"
          :style="{ fontSize: `calc(${customFontSize || '1rem'} - 2px)` }"
        >{{ item.description }}</p>
      </div>
      <div class="list-status">
        <span v-if="item.completed" class="status-completed">已完成</span>
        <span v-else class="status-pending">进行中</span>
      </div>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'ListModern',

  props: {
    items: {
      type: Array,
      required: true
    },
    customOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      localItems: []
    }
  },

  computed: {
    customColor () {
      return this.customOptions.color
    },

    customFontSize () {
      return this.customOptions.fontSize
    },

    itemSpacing () {
      return this.customOptions.itemSpacing || 10
    }
  },

  watch: {
    items: {
      immediate: true,
      handler (newItems) {
        this.localItems = JSON.parse(JSON.stringify(newItems))
      }
    }
  },

  methods: {
    toggleItem (item) {
      item.completed = !item.completed
      this.$emit('item-toggle', item)
    }
  }
}
</script>

<style scoped>
.modern-list {
  list-style: none;
  counter-reset: item-counter;
  padding: 0;
  margin: 0;
}

.modern-list li {
  counter-increment: item-counter;
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background-color: #f8fafc;
  border-radius: 10px;
  border-left: 4px solid #3a86ff;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.modern-list li:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.modern-list li.completed {
  background-color: #f0f9ff;
  border-left-color: #10b981;
  opacity: 0.9;
}

.list-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  margin-right: 1rem;
  flex-shrink: 0;
}

.list-content {
  flex: 1;
}

.list-title {
  margin: 0 0 0.25rem 0;
  color: #1e293b;
}

.list-description {
  margin: 0;
  color: #64748b;
}

.list-status {
  margin-left: 1rem;
  flex-shrink: 0;
}

.status-completed {
  background-color: #10b981;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-pending {
  background-color: #f59e0b;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.modern-list li.completed .list-number {
  background-color: #10b981 !important;
}

.modern-list li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(58, 134, 255, 0.1), transparent);
  transition: width 0.5s ease;
}

.modern-list li:hover::before {
  width: 100%;
}
</style>
