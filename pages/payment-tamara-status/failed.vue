<template>
  <div class="container text-center py-10">
    <h1 class="text-danger text-3xl font-bold mb-4">فشل الدفع. يرجى المحاولة مرة أخرى.</h1>
<!-- 
    <div
      v-if="Object.keys(route.query).length"
      class="mt-6 p-4 border rounded bg-gray-50"
    >
      <h2 class="text-xl font-semibold mb-2">تفاصيل العملية:</h2>
      <pre class="text-left text-sm bg-white p-3 rounded shadow"
        >{{ route.query }}
      </pre>
    </div> -->

 
    <NuxtLink
      to="/"
      class="mt-8 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
    >
      العودة للصفحة الرئيسية
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
</style>
