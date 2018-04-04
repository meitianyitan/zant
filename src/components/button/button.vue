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
import { isContains } from '../../utils/util';

const prefixCls = 'zant-btn';

export default {
  name: 'Button',
  components: { Icon },
  props: {
    htmlType: {
      default: 'button',
      validator (value) {
        return isContains(value, ['button', 'submit', 'reset']);
      }
    },
    type: {
      validator (value) {
        return isContains(value, ['primary', 'ghost', 'dashed', 'danger', 'info', 'success', 'warning', 'error', 'default']);
      }
    },
    shape: {
      validator (value) {
        return isContains(value, ['circle', 'circle-outline']);
      }
    },
    size: {
      validator (value) {
        return isContains(value, ['default', 'small', 'large']);
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
      this.$emit('click', event);
    }
  },
  mounted () {
    this.showSlot = this.$slots.default !== undefined;
  }
}
</script>

