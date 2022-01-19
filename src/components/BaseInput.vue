<template>
  
    <input
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :value="modelValue"
      @input="provideValue"
    />
</template>

<script>
export default {
  props: {
    type: {
      default: "text",
      type: String,
    },
    placeholder: {
      default: "Please provide value",
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    provideValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
</style>