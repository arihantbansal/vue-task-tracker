<template>
	<div class="about">
		<h3>Version 1.1.0</h3>
		<router-link to="/">Go Back</router-link>
	</div>
</template>

<script>
export default {
	name: "About",
	inheritAttrs: false, // disable 'non-props' warning
};
</script>

<style scoped>
.about {
	text-align: center;
}
</style>
