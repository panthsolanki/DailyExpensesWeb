<template>
	<div class="add-expense">
		<v-snackbar v-model="snackbar" :timeout="3000" top color="success">
      <span>Great! You added a new expense.</span>
      <v-btn flat color="white" @click="snackbar = false"> Close</v-btn>
    </v-snackbar>
		<h1 class="subheading grey--text">Add Expense</h1>
		<v-container class="my-5">
			<v-card row class="mb-3">
				<v-card-text xs12 lg12>
					<v-form class="px-3" ref="form">
						<v-radio-group v-model="type" prepend-icon="" label="Type of Expense" row mandatory>
							<v-radio v-for="t in types"	:key="t" :label="`${t}`" :value="t"></v-radio>
						</v-radio-group>
						<v-radio-group v-if="subtypes[type]" v-model="subtype" prepend-icon="" label="SubType of Expense" row mandatory>
							<v-radio v-for="t in subtypes[type]"	:key="t" :label="`${t}`" :value="t"></v-radio>
						</v-radio-group>
						<v-text-field v-if="!subtypes[type]" label="SubType" v-model="subtype" prepend-icon="folder" :rules="inputRules"></v-text-field>
						<v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
						<v-text-field label="Amount" v-model="amount" prepend-icon="folder"></v-text-field>
						<v-switch label="Reimbursable"	v-model="reimbursable"></v-switch>
						<v-spacer></v-spacer>
						<v-btn flat class="success mx-0 mt-3" @click="submit" :loading="loading">Add Expense</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'

export default {
	data() {
		return {
			types: ['food', 'transport', 'monthly', 'misc'],
			subtypes: {
				'food':['breakfast', 'lunch', 'snacks', 'dinner', 'water'], 
				'transport':['fromHome', 'toHome'],
				'monthly':['rent', 'internetBill', 'electricBill', 'maintance', 'maid', 'cook']
			},
			month: format(new Date(), 'MMMM'),	
			today: format(new Date(), 'DD/MM/YY'),
			type: '',
			subtype: '',
			title: '',
			amount: '',
			reimbursable: false,
			due: null,
			snackbar: false,
			inputRules: [
				v => v.length >3 || 'Minimum length is 3 characters'
			],
			loading: false,
			dialog: false
		}
	},
	methods: {
		submit() {
			if(this.$refs.form.validate()){
				this.loading = true;

				const expense = {
					month: this.month,	
					today: this.today,
					type: this.type,
					subtype: this.subtype,
					title: this.title,
					amount: this.amount,
					reimbursable: true,
				}
				console.log(expense);
				db.collection('expenses').add(expense).then(() => {
					this.loading = false
					this.dialog = false
					this.snackbar = true
					this.clearForm()
				})
			}
		},
		clearForm() {
			this.type = 'food'
			this.subtype = ''
			this.title = ''
			this.amount = ''
			this.reimbursable = false
		}
	},
	computed: {
		formattedDate() {
			return this.due ? format(this.due, 'Do MMM YYYY') : '' 
		}
	},
	created() {
		this.clearForm()
	}
}
</script>
