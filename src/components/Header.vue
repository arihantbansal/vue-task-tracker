<template>
	<header>
		<h1>{{ title }}</h1>
		<Button
			v-show="homePage"
			@btn-click="$emit('toggle-task-form')"
			:text="showTaskForm ? 'Close' : 'Add Task'"
			:color="showTaskForm ? 'red' : 'green'"
		/>
	</header>
</template>

<script>
import Button from "./Button";

export default {
	name: "Header",
	props: {
		title: String,
		showTaskForm: Boolean,
	},
	components: {
		Button,
	},
	computed: {
		homePage() {
			if (this.$route.path === "/") {
				return true;
			}
			return false;
		},
	},
};
</script>

<style scoped>
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
</style>
