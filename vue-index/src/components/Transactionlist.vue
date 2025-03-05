<template>
    <h3>History</h3>
    <ul id="list" class="list">
      <li 
        v-for="transaction in transactions"
        :key="transaction.items" 
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
      >
        {{ transaction.items }} <span>${{ transaction.amount.toFixed(2) }}</span>
        <button @click="deleteTransaction(transaction.items)" class="delete-btn">x</button>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const emit = defineEmits(['transactionDeleted']);
  
  const props = defineProps({
    transactions: {
      type: Array,
      required: true,
    },
  });
  
  const deleteTransaction = (items) => {
    emit('transactionDeleted', items); 
  };
  </script>