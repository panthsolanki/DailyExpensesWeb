<template>
  <div class="expenses">
    <h1 class="subheading grey--text">Expenses</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="expense in myexpenses" :key="expense.id">
          <div slot="header">{{expense.date}}</div>
        <v-card>
          <v-card-text class="px-4 grey--text">
            <div class="font-weight-bold">due by {{expense.title}}</div>
            <div>{{expense.type}}</div>
          </v-card-text>
        </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb'
export default {
  data() {
    return{
      projects: [],
      expenses: [],
      dates: []
    }
  },
  computed: {
    myProjects(){
      return this.projects.filter(project => {
        return project.person === 'Panth Solanki'
      })
    },
    myexpenses(){
      console.log(this.expenses);
      return this.expenses
    },
    getAlldates(){
      db.collection('expenses').orderBy('date', '').onSnapshot(res => {
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
  created() {
    db.collection('expenses').onSnapshot(res => {
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
}
</script>
