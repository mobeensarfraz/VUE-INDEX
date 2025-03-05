<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpences :income="+income" :expences="+expences" />
    <Transtionlist :transactions="transactions" @transactionDeleted="handeltransactiondeleted" />
    <AddTranstion @transactionsubmitted="handeltransactionsubmitted" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpences from './components/IncomeExpences.vue';
import Transtionlist from './components/Transactionlist.vue';
import AddTranstion from './components/AddTransaction.vue';
import { useToast } from 'vue-toastification';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const toast = useToast();
const transactions = ref([]);


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/items');
    transactions.value = response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    toast.error('Failed to load transactions');
  }
});

//  Compute total balance
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0);
});

//  income
const income = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
});

//  Compute expenses
const expences = computed(() => {
  return transactions.value
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);
});

// Add a new transaction
const handeltransactionsubmitted = async (transactionData) => {
  if (!transactionData.items || transactionData.amount === undefined || transactionData.amount === '') {
    toast.error('Please enter a valid item name and amount');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/api/items', {
      items: transactionData.items, 
      amount: Number(transactionData.amount),
    });

    transactions.value.push(response.data);
    toast.success('Transaction added successfully');
  } catch (error) {
    console.error('Error adding transaction:', error.response?.data || error);
    toast.error('Failed to add transaction');
  }
};

// Delete a transaction by name
const handeltransactiondeleted = async (items) => {
  if (!items) {
    toast.error('Invalid transaction name');
    return;
  }

  try {
    await axios.delete(`http://localhost:3000/api/items/${items}`);

    transactions.value = transactions.value.filter(transaction => transaction.items !== items);

    toast.success('Transaction deleted successfully');
  } catch (error) {
    console.error('Error deleting transaction:', error.response?.data || error);
    toast.error('Failed to delete transaction');
  }
};
</script>
