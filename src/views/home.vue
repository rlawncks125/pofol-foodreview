<template>
  <div>
    <p>home</p>
    <SearchAddress @search-address="onSearchddress">
      <div class="border">주소 검색</div>
    </SearchAddress>
    <RouterLink to="chat">푸드채팅</RouterLink>
  </div>
</template>

<script setup lang="ts">
import SearchAddress from "@/components/search-address.vue";

const onSearchddress = (address: any) => {
  console.log(address);
};
</script>

<style scoped></style>
