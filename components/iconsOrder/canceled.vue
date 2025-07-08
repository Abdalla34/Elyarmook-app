<template>
  <div>
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8906 17.3594L11.1406 14.6094"
        :fill="isActive ? '#000' : 'none'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.8594 14.6406L11.1094 17.3906"
        :fill="iaActive ? '#000' : 'none'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.30945 2L5.68945 5.63"
        :fill="isActive ? '#000' : 'none'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.6895 2L19.3095 5.63"
        :fill="isActive ? '#000' : 'none'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 7.85156C2.5 6.00156 3.49 5.85156 4.72 5.85156H20.28C21.51 5.85156 22.5 6.00156 22.5 7.85156C22.5 10.0016 21.51 9.85156 20.28 9.85156H4.72C3.49 9.85156 2.5 10.0016 2.5 7.85156Z"
        stroke="#7E7E7E"
        stroke-width="1.5"
      />
      <path
        d="M4 10L5.41 18.64C5.73 20.58 6.5 22 9.36 22H15.39C18.5 22 18.96 20.64 19.32 18.76L21 10"
        :fill="isActive ? '#000' : 'none'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
<script setup>
defineProps({
  isActive: Boolean,
});
</script>
