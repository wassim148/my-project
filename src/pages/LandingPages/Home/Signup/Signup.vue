<template>
    <div class="registration-form">
        <h2 class="text-2xl font-bold text-center mb-4">Registration Form</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
            <div :class="cn('space-y-4', step > 1 && 'hidden')" v-auto-animate>
                <div>
                    <label for="profile-picture" class="block text-sm font-medium text-gray-700">Browse Photo</label>
                    <div class="flex items-center mt-1">
                        <input type="file" id="profile-picture" accept="image/*" @change="handleFileUpload"
                            class="hidden" />
                        <label for="profile-picture"
                            class="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-300 transition duration-300">
                            Click to add profile picture
                        </label>
                    </div>
                    <img v-if="profilePicturePreview" :src="profilePicturePreview" alt="Profile Picture Preview"
                        class="mt-2 w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-300" />
                </div>
                <!-- Firstname -->
                <div>
                    <label for="firstname" class="block text-sm font-medium text-gray-700">Firstname</label>
                    <input type="text" id="firstname" v-model="firstname"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" v-model="email"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>
                <Button class="w-full" @click="async () => {
                        const validation = await form.validate({ mode: 'silent' })
                        if ('code' in validation.errors) {
                            form.validateField('code')
                            return
                        }
                        step++
                    }
                    " type="button">
                    Next
                </Button>
            </div>



            <!-- Password -->
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Set up password</label>
                <input type="password" id="password" v-model="password" @input="validatePassword"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required />
                <p class="mt-2 text-sm text-gray-500">
                    Please create a secure password including the following criteria:
                </p>
                <ul class="list-disc pl-5 text-sm text-gray-600">
                    <li>Lowercase letters</li>
                    <li>Numbers</li>
                    <li>Capital letters</li>
                    <li>Special characters</li>
                </ul>
                <p v-if="passwordStrengthFeedback" class="mt-2 text-sm text-red-500">
                    {{ passwordStrengthFeedback }}
                </p>
            </div>

            <!-- Profile Picture -->

            <!-- Gender -->
            <div>
                <label class="block text-sm font-medium text-gray-700">Gender</label>
                <div class="mt-2 space-y-2">
                    <div class="flex items-center">
                        <input type="radio" id="male" name="gender" value="Male" v-model="gender"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label for="male" class="ml-3 block text-sm font-medium text-gray-700">Male</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" id="female" name="gender" value="Female" v-model="gender"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                        <label for="female" class="ml-3 block text-sm font-medium text-gray-700">Female</label>
                    </div>
                </div>
            </div>

            <!-- Profession -->
            <div>
                <label for="profession" class="block text-sm font-medium text-gray-700">Profession</label>
                <input type="text" id="profession" v-model="profession"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <button type="submit"
                class="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md mt-6 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Complete
            </button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
    data() {
        return {
            firstname: '',
            email: '',
            password: '',
            passwordStrengthFeedback: '',
            profilePicturePreview: null,
            gender: 'Male',
            profession: '',
            error: '',
            message: '',
        }
    },
    methods: {
        validatePassword() {
            const hasLowercase = /[a-z]/.test(this.password)
            const hasUppercase = /[A-Z]/.test(this.password)
            const hasNumbers = /\d/.test(this.password)
            const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(this.password)

            let feedback = []

            if (!hasLowercase) feedback.push('Include lowercase letters')
            if (!hasUppercase) feedback.push('Include capital letters')
            if (!hasNumbers) feedback.push('Include numbers')
            if (!hasSpecialChars) feedback.push('Include special characters')

            this.passwordStrengthFeedback = feedback.length > 0 ? feedback.join(', ') : ''
        },
        handleFileUpload(event) {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.profilePicturePreview = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },
        async submitForm() {
            if (this.passwordStrengthFeedback) {
                alert('Please ensure your password meets all criteria.')
                return
            }

            const formData = {
                firstname: this.firstname,
                email: this.email,
                password: this.password,
                gender: this.gender,
                profession: this.profession,
                profilePicture: this.profilePicturePreview,
            }

            try {
                const response = await axios.post('/auth/Signup', formData, {
                    headers: { 'X-localization': localStorage.getItem('lan') },
                })
                this.message = response.data.message
                this.$router.push('/sign-in')
            } catch (error) {
                this.error =
                    error.response && error.response.data
                        ? `Error occurred: ${error.response.data.message}`
                        : `Error occurred: ${error.message}`
                console.log('catch', error)
            }
        },
    },
}
const step = ref<number>(1)

</script>

<style scoped>
.registration-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
