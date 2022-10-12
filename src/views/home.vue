<template>
  <div>
    <p>home</p>
    <SearchAddress @search-address="onSearchddress">
      <p>주소 검색</p>
    </SearchAddress>
  </div>
</template>

<script setup lang="ts">
import SearchAddress from "@/components/search-address.vue";

const onSearchddress = (address: any) => {
  console.log(address);
};
</script>

<style scoped></style>
