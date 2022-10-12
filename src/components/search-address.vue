<template>
  <button @click="onFinedAddress"><slot /></button>
</template>

<script setup lang="ts">
const emtis = defineEmits<{
  (e: "searchAddress", adress: any): any;
}>();

const onFinedAddress = async () => {
  // @ts-ignore
  new daum.Postcode({
    oncomplete: async function (data: any) {
      // console.log(data);
      const adress = await naverMapsFindAddress(data.address);
      if (adress) {
        emtis("searchAddress", adress[0]);
        // console.log(adress);
      }
    },
  }).open();
};

const naverMapsFindAddress = (
  addr: string
): Promise<naver.maps.Service.AddressItemV2[] | null> => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.geocode(
      {
        query: addr,
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.OK) {
          const addresses = response.v2.addresses;
          if (addresses.length > 0) {
            resolve(addresses);
          } else {
            alert("도로명 또는 주소를 찾을수없음");
          }
        }
      }
    );
  });
};
</script>

<style scoped></style>
