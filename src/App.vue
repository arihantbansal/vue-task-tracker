<template>
	<div class="container">
		<Header
			@toggle-task-form="toggleTaskForm"
			title="Task Tracker"
			:showTaskForm="showTaskForm"
		/>
		<div v-show="showTaskForm">
			<TaskForm @add-task="addTask" />
		</div>
		<Tasks
			@toggle-reminder="toggleReminder"
			@delete-task="deleteTask"
			:tasks="tasks"
		/>
	</div>
</template>

<script>
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";

export default {
	name: "App",
	components: {
		Header,
		Tasks,
		TaskForm,
	},
	data() {
		return {
			tasks: [],
			showTaskForm: false,
		};
	},
	methods: {
		toggleTaskForm() {
			this.showTaskForm = !this.showTaskForm;
		},
		async deleteTask(id) {
			if (confirm("Are you sure?")) {
				const res = await fetch(`api/tasks/${id}`, {
					method: "DELETE",
				});

				res.status === 200
					? (this.tasks = this.tasks.filter(task => task.id !== id))
					: alert("Error deleting task");
			}
		},
		async toggleReminder(id) {
			const taskToToggle = await this.fetchTask(id);
			const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

			const res = await fetch(`api/tasks/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(updatedTask),
			});

			const data = await res.json();

			this.tasks = this.tasks.map(task =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			);
		},
		async addTask(newTask) {
			const res = await fetch("api/tasks", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(newTask),
			});

			const data = await res.json();
			this.tasks = [...this.tasks, data];
		},
		async fetchTasks() {
			const res = await fetch("api/tasks");
			const data = await res.json();

			return data;
		},
		async fetchTask(id) {
			const res = await fetch(`api/tasks/${id}`);
			const data = await res.json();

			return data;
		},
	},
	async created() {
		this.tasks = await this.fetchTasks();
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
body {
	font-family: "Poppins", sans-serif;
}
.container {
	max-width: 500px;
	margin: 30px auto;
	overflow: auto;
	min-height: 300px;
	border: 1px solid steelblue;
	padding: 30px;
	border-radius: 5px;
}
.btn {
	display: inline-block;
	background: #000;
	color: #fff;
	border: none;
	padding: 10px 20px;
	margin: 5px;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	font-size: 15px;
	font-family: inherit;
}
.btn:focus {
	outline: none;
}
.btn:active {
	transform: scale(0.98);
}
.btn-block {
	display: block;
	width: 100%;
}
</style>
