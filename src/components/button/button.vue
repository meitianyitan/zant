<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    @click="handleClick">
    <Icon v-if="loading" class="zant-load-loop" type="load-c"></Icon>
    <Icon v-if="icon && !loading" :type="icon"></Icon>
    <span v-if="showSlot" ref="slot"><slot></slot></span>
  </button>
</template>

<script>
import Icon from '../icon';
import { oneOf } from '../../utils/util';

const prefixCls = 'zant-btn';

export default {
  name: 'Button',
  components: { Icon },
  props: { // validator
    type: {
      validator (value) {
        return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default']);
      }
    },
    size: {
      validator (value) {
        return oneOf(value, ['default', 'small', 'large']);
      }
    },
    htmlType: {
      default: 'button',
      validator (value) {
        return oneOf(value, ['button', 'submit', 'reset']);
      }
    },
    shape: {
      validator (value) {
        return oneOf(value, ['circle', 'circle-outline']);
      }
    },
    long: {
      type: Boolean,
      default: false
    },
    icon: String,
    loading: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      showSlot: true
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
        }
      ];
    }
  },
  methods: {
    handleClick (event) {
      // click（点击事件）
      this.$emit('click', event);
    }
  },
  mounted () {
    // only icon（只有icon）
    this.showSlot = this.$slots.default !== undefined;
  }
}
</script>

