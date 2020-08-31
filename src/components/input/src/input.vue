<template>
  <div class="app-input-wr">
    <div class="app-input-row">
      <span v-if="$slots.prefix" class="app-input-prefix">
        <slot name="prefix"></slot>
      </span>

      <span class="app-input-main">
        <input :value="value"
              :type="type"
              :placeholder="placeholder"
              :name="name"
              :disabled="disabled"
              class="app-input"
              @input="onInput"
      />
      </span>

      <span v-if="$slots.suffix" class="app-input-suffix">
        <slot name="suffix"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-input',

  props: {
    value: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: 'text'
    },

    placeholder: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onInput ({ target }) {
      this.$emit('input', target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-input {
  &-row {
    display: flex;
    align-items: center;
  }
}
</style>