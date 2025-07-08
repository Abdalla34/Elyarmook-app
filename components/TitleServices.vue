<template>
  <div class="parent">
    <div class="text-details">
      <div class="item-info">
        <h1 class="item-name">{{ title }}</h1>
        <div class="item-price">
          <span class="price-value">{{ currency }}</span>
          <span class="price-currency">{{ sar }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  currency: [String, Number],
  sar: String,
});
</script>

<style scoped>
.text-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px;
}

.item-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 40px;
}

@media (max-width: 576px) {
  .text-title h1 {
    font-size: 2rem;
  }

  .text-title p {
    font-size: 1rem;
    padding: 0 10px;
  }

  .preview-slide {
    padding: 15px;
  }

  .text-details {
    padding: 0 5px;
    gap: 15px;
  }

  .item-info {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .item-name {
    font-size: 1.1rem;
    text-align: center;
  }

  .item-price {
    padding: 6px 10px;
    border-radius: 10px;
    min-width: 60px;
    align-items: center;
  }

  .price-value {
    font-size: 1.2rem;
  }

  .price-currency {
    font-size: 0.7rem;
  }
}

@media (min-width: 577px) and (max-width: 768px) {
  .text-title h1 {
    font-size: 2.2rem;
  }

  .text-details {
    padding: 0 8px;
  }

  .item-name {
    font-size: 15px;
  }

  .item-price {
    padding: 7px 11px;
    min-width: 65px;
  }

  .price-value {
    font-size: 1.3rem;
  }

  .price-currency {
    font-size: 0.75rem;
  }
}

@media (min-width: 992px) {
  .text-details {
    padding: 0 12px;
  }

  .item-name {
    font-size: 23px;
  }

  .item-price {
    padding: 9px 13px;
    min-width: 75px;
    font-size: 16px;
    color: #0a0b0b;
  }

  .price-currency {
    font-size: 0.85rem;
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  .item-name {
    font-size: 18px;
  }
}
</style>
