<template>
  <svg
    class="icon-links-fix"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.4889 14.6604L2.96891 13.1404C2.34891 12.5204 2.34891 11.5004 2.96891 10.8804L4.4889 9.36039C4.7489 9.10039 4.9589 8.59038 4.9589 8.23038V6.08036C4.9589 5.20036 5.6789 4.48038 6.5589 4.48038H8.7089C9.0689 4.48038 9.5789 4.27041 9.8389 4.01041L11.3589 2.49039C11.9789 1.87039 12.9989 1.87039 13.6189 2.49039L15.1389 4.01041C15.3989 4.27041 15.9089 4.48038 16.2689 4.48038H18.4189C19.2989 4.48038 20.0189 5.20036 20.0189 6.08036V8.23038C20.0189 8.59038 20.2289 9.10039 20.4889 9.36039L22.0089 10.8804C22.6289 11.5004 22.6289 12.5204 22.0089 13.1404L20.4889 14.6604C20.2289 14.9204 20.0189 15.4304 20.0189 15.7904V17.9403C20.0189 18.8203 19.2989 19.5404 18.4189 19.5404H16.2689C15.9089 19.5404 15.3989 19.7504 15.1389 20.0104L13.6189 21.5304C12.9989 22.1504 11.9789 22.1504 11.3589 21.5304L9.8389 20.0104C9.5789 19.7504 9.0689 19.5404 8.7089 19.5404H6.5589C5.6789 19.5404 4.9589 18.8203 4.9589 17.9403V15.7904C4.9589 15.4204 4.7489 14.9104 4.4889 14.6604Z"
      stroke="currentColor"
      :fill="isActive ? '#000' : 'none'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.5 15L15.5 9"
      stroke="currentColor"
      :fill="isActive ? '#000' : 'none'"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.9945 14.5H15.0035"
      stroke="currentColor"
      :fill="isActive ? '#000' : 'none'"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.99451 9.5H10.0035"
      stroke="currentColor"
      :fill="isActive ? '#000' : 'none'"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
defineProps(["isActive"]);
</script>
