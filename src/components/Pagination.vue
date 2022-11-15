<template>
  <div class="pagination-wrap">
    <span class="pagination-start" @click="chnagePagination(1)">처음</span>
    <span
      class="pagination"
      @click="chnagePagination(current - 1)"
      :class="current === 1 ? '!bg-gray-200 !cursor-default' : ''"
    >
      &lt;
    </span>
    <span
      v-for="(page, index) in Array.from(
        { length: roopRepeat },
        (v, index) => index + startPage
      )"
      :class="current === page ? 'pagination-active' : 'pagination'"
      :key="index"
      @click="chnagePagination(+page)"
    >
      {{ page }}
    </span>
    <span
      class="pagination"
      @click="chnagePagination(current + 1)"
      :class="current === totalPage ? '!bg-gray-200 !cursor-default' : ''"
      >&gt;</span
    >
    <span class="pagination-end" @click="chnagePagination(totalPage)">끝</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  // 페이지당 행수
  rowsPerPage?: number;
  length?: number;
  showCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  rowsPerPage: 1,
  length: 0,
  showCount: 3,
});

const emits = defineEmits<{
  (e: "triggerPagination", payload: { min: number; max: number }): void;
}>();

// Pagination

const passNumber = Math.floor(props.showCount / 2);
const roopRepeat = ref<number>(0);

// 현재 페이지
const current = ref<number>(1);

const startPage = ref<number>(1);
const totalPage = ref<number>(0);

const chnagePagination = (v: number) => {
  let select = v;

  if (v > totalPage.value) {
    select = totalPage.value;
  }
  if (0 >= v) {
    select = 1;
  }

  current.value = select;
  updatePagination();
};

const updatePagination = () => {
  totalPage.value = Math.ceil(props.length / props.rowsPerPage);

  roopRepeat.value = Math.min(totalPage.value, props.showCount);

  const end = totalPage.value - (roopRepeat.value - 1);

  const start = Math.max(current.value - passNumber, 1);

  end > start ? (startPage.value = start) : (startPage.value = end);

  const min = props.rowsPerPage * (current.value - 1);
  const max = min + props.rowsPerPage;

  emits("triggerPagination", { min, max });
};

const initPagintationNumber = () => {
  chnagePagination(1);
};

watch(props, () => {
  updatePagination();
});

defineExpose({
  initPagintationNumber,
});
</script>

<style scoped></style>
