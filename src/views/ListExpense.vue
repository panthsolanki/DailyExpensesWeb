<template>
  <div class="expenses">
    <h1 class="subheading grey--text">Expenses</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="ed in myexpenses" :key="ed.id">
          <div slot="header" >
            <div class="left">
              <div class="expansion-panel-title">{{ed.details[0].date}}</div>
            </div>
            <div class="right">
              <v-chip small class="total white--text caption my-1">{{ed.totalamount}}</v-chip>
            </div>
          </div>
          <v-card>
            <v-card-text>
              <v-layout row wrap v-for="expense in ed.details" :key="expense.id" :class="`px-4 pa-3 project ${expense.type}`">
                <v-flex xs12 md3>
                  <div>{{expense.type}}</div>
                  <div class="caption grey--text">{{expense.subtype}}</div>
                </v-flex>
                <v-flex xs6 sm4 md5>
                  <div>{{expense.title}}</div>
                </v-flex>
                <v-flex xs6 sm4 md1>
                  <div class="caption grey--text">Subtype</div>
                  <div>{{expense.subtype}}</div>
                </v-flex>
                <v-flex xs6 sm4 md3>
                  <div class="right">
                    <v-chip small :class="`${expense.type} white--text caption my-2`">{{expense.amount}}</v-chip>
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'
// import _ from 'lodash';
export default {
  data() {
    return{
      projects: [],
      expenses: [],
      dates: [],
      expensesDatewise: {}
    }
  },
  methods: {
    calmyexpenses(){
      this.expenses.forEach(expense => {
        if(!this.expensesDatewise[expense.date]){
          this.expensesDatewise[expense.date] = {};
          this.expensesDatewise[expense.date].details = [];
          this.expensesDatewise[expense.date].totalamount = 0;
        }
        
        this.expensesDatewise[expense.date].details.push({
          ...expense
        })
        this.expensesDatewise[expense.date].totalamount += +expense.amount
      })
      return this.expensesDatewise
    },
    getData(){
      db.collection('expenses').orderBy('date', 'asc').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === 'added'){
            if(this.expenses)
            this.expenses.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
    }
  },
  computed: {
    myProjects(){
      return this.projects.filter(project => {
        return project.person === 'Panth Solanki'
      })
    },
    myexpenses() {
      return this.calmyexpenses()
    }
  },
  created() {
    // console.log(_.isEmpty() ? 'Lodash is available here!' : 'Uh oh..');
    this.getData()
  }
}
</script>

<style>
  .expansion-panel-title{
    line-height:32px;
    font-size:18px;
  }
  .project.food{
    border-left: 4px solid #3cd1c2;
  }
  .project.transport{
    border-left: 4px solid orange;
  }
  .project.monthly{
    border-left: 4px solid tomato;
  }
  .v-chip.food{
    background: #3cd1c2;
  }
  .v-chip.transport{
    background: orange;
  }
  .v-chip.monthly{
    background: tomato;
  }
  .v-chip.total{
    background: rgb(62, 43, 228);
  }
</style>
