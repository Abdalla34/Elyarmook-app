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

.item-name {
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 24px;
  line-height: 1.3;
  color: #14142b;
  margin: 0;
  text-align: left;
  flex: 1;
  transition: color 0.3s ease;
}

.item-name:hover {
  color: #0f0f23;
}

/* Price */
.item-price {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 70px;
  color: #3d3d3d;
}

.item-price:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.price-value {
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 1.4rem;
  color: #2c3e50;
  line-height: 1;
}

.price-currency {
  font-family: var(--font-main);
  font-weight: 500;
  font-size: 0.8rem;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
    font-size: 1.15rem;
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
</style>
