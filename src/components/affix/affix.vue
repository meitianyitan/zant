<template>
  <div>
    <div ref="point" :class="classes" :style="styles">
      <slot></slot>
    </div>
    <div v-show="slot" :style="slotStyle"></div>
  </div>
</template>

<script>
  import { on, off } from '../../utils/dom';
  import getScroll from '../../utils/getScroll';
  const prefixCls = 'vvu-affix';

  function getOffset (element, target) {
    // 元素的大小及其相对于视口的位置
    const elemRect = element.getBoundingClientRect();

    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
      top: elemRect.top + scrollTop - clientTop,
      left: elemRect.left + scrollLeft - clientLeft
    }
  }

  export default {
    name: 'Affix',
    props: {
      offsetTop: {
        type: Number,
        default: 0
      },
      offsetBottom: {
        type: Number
      }
    },
    data () {
      return {
        affix: false,
        styles: {},
        slot: false,
        slotStyle: {}
      }
    },
    computed: {
      offsetType () {
        let type = 'top';
        if (this.offsetBottom >= 0) {
          type = 'bottom';
        }
        return type;
      },
      classes () {
        return [{
          [`${prefixCls}`]: this.affix
        }]
      }
    },
    mounted () {
      on(window, 'scroll', this.handleScroll);
      on(window, 'resize', this.handleScroll);
    },
    beforeDestroy () {
      off(window, 'scroll', this.handleScroll);
      off(window, 'resize', this.handleScroll);
    },
    methods: {
      handleScroll () {
        const affix = this.affix;
        const scrollTop = getScroll(window, true);
        const affixNode = this.$el;
        const elOffset = getOffset(affixNode, window);
        const windowHeight = window.innerHeight;
        const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight;

        // Fixed Top
        if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType == 'top' && !affix) {
          this.affix = true;
          this.slotStyle = {
            width: this.$refs.point.clientWidth + 'px',
            height: this.$refs.point.clientHeight + 'px'
          };

          this.slot = true;
          this.styles = {
            top: `${this.offsetTop}px`,
            left: `${elOffset.left}px`,
            width: `${this.$el.offsetWidth}px`
          };

          this.$emit('on-change', true);
        } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType == 'top' && affix) {
          this.slot = false;
          this.slotStyle = {};
          this.affix = false;
          this.styles = null;

          this.$emit('on-change', false);
        }

        // Fixed Bottom
        if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType == 'bottom' && !affix) {
          this.affix = true;
          this.styles = {
            bottom: `${this.offsetBottom}px`,
            left: `${elOffset.left}px`,
            width: `${this.$el.offsetWidth}px`
          };

          this.$emit('on-change', true);
        } else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType == 'bottom' && affix) {
          this.affix = false;
          this.styles = null;

          this.$emit('on-change', false);
        }
      }
    }
  }
</script>