<template>
    <div class="alert alert-danger" role="alert">
        {{ capitalize(error) }}
        <!-- {{ error }} -->
    </div>
    <div v-if="message" class="alert alert-success" role="alert">
      {{ message }}
    </div>
</template>

<script>
export default {
    props: ['error', 'message'],
    methods: {
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
}
</script>

<style></style>
