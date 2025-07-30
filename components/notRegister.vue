<template>
  <div>
    <div v-if="IsNotRegitser" class="text-center py-5">
      <h1 class="text-capitalize create text-danger">
        {{ message }}
      </h1>
      <button
        @click="navigateTo('/createaccount')"
        class="btn-create mt-3 text-capitalize"
      >
        create account
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  IsNotRegitser: Boolean,
  message: String,
});
</script>

<style scoped>
.btn-create {
  background-color: var(--main-color);
  border: none;
  padding: 10px 60px;
  border-radius: 20px;
  margin-bottom: 200px;
}
.create {
  font-family: var(--font-main);
  font-weight: 600;
  font-style: SemiBold;
  font-size: 28px;
  color: #27273c;
  margin-bottom: 25px;
  margin-top: 25px;
}
</style>
