<template>
  <div class="checkbox-container">
    <label class="checkbox">
      <input
        @input="(event) => $emit('update:checked', event.target.checked)"
        type="checkbox"
        :checked="checked"
        id="checkbox"
      />
      <span></span>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    checked: {
      type: Boolean,
    },
  },
};
</script>
<style scoped lang="scss">
.checkbox-container {
  height: 50px;
}
.checkbox {
  cursor: pointer;
  position: relative;
}
.checkbox > input {
  height: 40px;
  width: 50px;
  position: absolute;
  left: -25px;
  top: 0rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border-radius: 25px;
  outline: none;
  transition-duration: 0.3s;
  background-color: #a2f6f2;
  cursor: pointer;
}
.checkbox > input:checked {
  background-color: #a2f6f2;
}
.checkbox > input:checked + span::before {
  font-size: 2.4em;
  content: "\2713";
  text-align: center;
  color: white;
  position: absolute;
  left: -0.5rem;
  top: 0rem;
}
.checkbox > input:active {
  border: 2px solid #34495e;
}
.checkbox-container:hover {
  transform: scale(0.9);
}
</style>
