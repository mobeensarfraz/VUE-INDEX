<template>
  <Header />
  <div class="container">
   <Balance :total="+total"/>
   <IncomeExpences :income="+income" :expences="+expences" />
   <Transtionlist :transactions="transactions " @transactionDeleted="handeltransactiondeleted " />
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
 import { ref,computed, onMounted } from 'vue';
 const toast=useToast();
 const transactions = ref([]);

onMounted(() =>{
  const savedTransactions= 
  JSON.parse(localStorage.getItem('transactions'));

  if( savedTransactions){
    transactions.value=savedTransactions; 

  }
});

  //get total
  const total=computed(()=>{
    return transactions.value.reduce((acc,transaction)=>{
      return acc + transaction.amount;
    }, 0);
  });
  //get income
  const income=computed(()=>{
    return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc,transaction)=>{
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
  });


  //get expence
  const expences=computed(()=>{
    return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc,transaction)=>{
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
  });
  //add transaction
  const handeltransactionsubmitted= (transactionData) => {
    transactions.value.push({
      id:generateuniqueId(),
      text: transactionData. text,
      amount: transactionData. amount,
    });

    saveTransactionsToLocalStroage();
    toast.success('transaction added');
  };
//geterate unique id
const generateuniqueId= () =>{
 return Math.floor(Math.random()* 100000);
};
//delet
const handeltransactiondeleted=(id) => {
transactions.value= transactions.value.filter((transaction) => 
transaction.id !==id);
saveTransactionsToLocalStroage();
 toast.success('transaction deleted')
};
//local stroage
const saveTransactionsToLocalStroage=() =>{
  localStorage.setItem('transactions',JSON.stringify(transactions.value));
}
</script>