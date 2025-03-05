<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="items">Item Name</label>
      <input 
        type="text" 
        id="items" 
        v-model="items" 
        placeholder="Enter item name..." 
      />
    </div>
    <div class="form-control">
      <label for="amount">
        Amount <br />
        (negative - expense, positive - income)
      </label>
      <input 
        type="number" 
        id="amount" 
        v-model="amount" 
        placeholder="Enter amount..." 
      />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const items = ref('');
const amount = ref('');

const emit = defineEmits(['transactionsubmitted']);
const toast = useToast();

const onSubmit = () => {
  if (!items.value || !amount.value) {
    toast.error('Both fields are required');
    return;
  }

  const transactionData = {
    items: items.value,  
    amount: parseFloat(amount.value),
  };

  emit('transactionsubmitted', transactionData);

  items.value = '';
  amount.value = '';
};
</script>

