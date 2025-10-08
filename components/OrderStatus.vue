
<template>
  <div
    class="status text-capitalize"
    :class="`bg-${order.status}`"
  >
    {{
      statusorder?.[order.type_for_customer]?.[order.status] ||
      order.status_value
    }}
  </div>
</template>


<script setup>
defineProps({
  order: {
    type: Object,
    required: true,
  },
  statusorder: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});
</script>



<style scoped>
.status {
  display: inline-block;
  padding: 0px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.bg-booking_done,
.bg-pricing_entry {
  background-color: #ecfaf2;
  color: #41c980;
}

.bg-car_under_inspection,
.bg-under_examination {
  background-color: #f3e5f5;
  color: #6a1b9a;
}

.bg-report_ready,
.bg-pricing_has_been_completed,
.bg-the_inspection_report_is_ready {
  background-color: #ede7f6;
  color: #4527a0;
}

.bg-car_under_maintenance,
.bg-in_preparation {
  background-color: #fff3e0;
  color: #ef6c00;
}

.bg-car_ready,
.bg-ready_for_pickup {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.bg-order_finished,
.bg-it_was_received {
  background-color: #eceff1;
  color: #37474f;
}

.bg-canceled {
  background-color: #ffebee; 
  color: #c62828;
}

.bg-car_is_fine {
  background-color: #e0f2f1;
  color: #00695c;
}

/*  spare_part */
.bg-picked_up {
  background-color: #e3f2fd;
  color: #1565c0;
}

.bg-on_delivery {
  background-color: #fbe9e7;
  color: #d84315;
}

/*  wench-order & wench-requests */
.bg-pending {
  background-color: #fffde7;
  color: #f9a825;
}

.bg-on_our_date {
  background-color: #e0f7fa;
  color: #00838f;
}

.bg-truck_is_on_its_way_to_you,
.bg-your_car_is_on_its_way_to_branch,
.bg-the_car_is_on_way_to_you {
  background-color: #fff8e1;
  color: #f57f17;
}
</style>
