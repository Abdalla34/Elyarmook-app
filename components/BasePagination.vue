<template>
  <div class="pagination d-flex justify-content-center gap-2 mt-4">
    <button 
      class="btn btn-secondary"
      @click="$emit('prev')"
      :disabled="currentPage <= 1"
    >
      Previous
    </button>
    
    <span class="btn btn-light">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button 
      class="btn btn-secondary"
      @click="$emit('next')"
      :disabled="currentPage >= totalPages"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number
})
</script>