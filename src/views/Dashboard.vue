<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">by project title</span>
          </v-btn>
          <span>Sort project by Project Title</span>
        </v-tooltip>
        <v-tooltip top>
        <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
          <v-icon left small>person</v-icon>
          <span class="caption text-lowercase">by person</span>
        </v-btn>
        <span>Sort project by Person</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text caption my-2`">{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        projects: [
          { title: 'Design a new website', person: 'Panth', due: '1st Jan, 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex delectus tempore soluta deleniti doloremque aliquam repellat eos hic voluptatem ullam. Pariatur harum architecto consequuntur accusantium odio commodi fugiat quibusdam in.'},
          { title: 'Algo a new website', person: 'Solanki', due: '12st Jan, 2019', status: 'completed', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia libero porro beatae. In, similique iste perspiciatis quis facere libero mollitia assumenda explicabo molestiae quae ratione officia temporibus quidem commodi iusto.'},
          { title: 'Sethew a new website', person: 'abc', due: '11st Jan, 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ab doloribus, quasi voluptatibus illo commodi minima impedit at repudiandae corrupti, deleniti officiis ipsa quisquam in inventore voluptates, excepturi tenetur ex?'},
          { title: 'Design a new website', person: 'xyz', due: '16st Jan, 2019', status: 'overdue', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit accusamus dignissimos nam, fugiat placeat odit beatae eligendi, praesentium a explicabo suscipit omnis voluptate dolores sint facilis, modi voluptatibus ipsum molestias?'}
        ]
      }
    },
    methods: {
      sortBy(type){
        this.projects.sort((a,b) => a[type] < b[type] ? -1 : 1)
      }
    }
  }
</script>

<style>
  .project.completed{
    border-left: 4px solid #3cd1c2;
  }
  .project.ongoing{
    border-left: 4px solid orange;
  }
  .project.overdue{
    border-left: 4px solid tomato;
  }
  .v-chip.completed{
    background: #3cd1c2;
  }
  .v-chip.ongoing{
    background: orange;
  }
  .v-chip.overdue{
    background: tomato;
  }
</style>

