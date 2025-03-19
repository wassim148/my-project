<template>
    <div class="space-y-6">
        <h1 class="text-3xl font-bold">Profile</h1>

        <!-- Profile Picture Upload -->
        <div class="flex flex-col items-center space-y-2">
            <div class="relative">
                <img 
                    v-if="profilePicturePreview || userStore.user?.avatar" 
                    :src="profilePicturePreview || userStore.user.avatar" 
                    alt="Profile Picture" 
                    class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
                <input type="file" id="profile-picture" accept="image/*" @change="handleFileUpload" class="hidden" />
                <label for="profile-picture" 
                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full opacity-0 hover:opacity-100 cursor-pointer transition">
                    Change
                </label>
            </div>
            <button v-if="profilePictureFile" @click="uploadProfilePicture" class="bg-blue-500 text-white px-4 py-2 rounded-md">
                Send
            </button>
        </div>

        <!-- User Info -->
        <div class="flex space-x-4">
            <div class="flex-1 flex items-center">
                <p class="font-semibold">Name</p>
            </br>
                <p class="text-sm text-gray-500 ml-2">{{ userStore.user?.username }}</p>
                <button @click="isEditing = true" class="ml-2 text-gray-500 hover:text-gray-700 flex items-center">
                    📌 <!-- Edit Icon -->
                </button>
            </div>
            <div class="flex-1">
                <p class="font-semibold">Email</p>
                <p class="text-sm text-gray-500">{{ userStore.user?.email }}</p>
            </div>
        </div>

        <div class="flex space-x-4">
            <div class="flex-1">
                <p class="font-semibold">Role</p>
                <p class="text-sm text-gray-500">{{ userStore.user?.role }}</p>
            </div>
            <div class="flex-1">
                <p class="font-semibold">Joined</p>
                <p class="text-sm text-gray-500">{{ userStore.user?.created_at }}</p>
            </div>
        </div>

        <!-- Edit Name Modal -->
        <div v-if="isEditing" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 class="text-lg font-bold mb-4">Edit Profile</h2>

                <div class="mb-4">
                    <label class="font-semibold">Name</label>
                    <input v-model="editableName" type="text" class="border p-2 rounded-md w-full" />
                </div>

                <div class="flex justify-end space-x-2">
                    <button @click="isEditing = false" class="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
                    <button @click="updateProfile" class="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from '@/core/stores/user.store';
import axios from 'axios';

const userStore = useUserStore();
const isEditing = ref(false);
const editableName = ref("");
const profilePicturePreview = ref(null);
const profilePictureFile = ref(null);

onMounted(async () => {
    await userStore.fetchUser();
    editableName.value = userStore.user?.username || "";
});


const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    profilePictureFile.value = file;
    const reader = new FileReader();
    reader.onload = () => {
        profilePicturePreview.value = reader.result;
    };
    reader.readAsDataURL(file);
};

const uploadProfilePicture = async () => {
    if (!profilePictureFile.value) return;

    const formData = new FormData();
    formData.append("avatar", profilePictureFile.value);
    console.log(formData);

    await userStore.uploadProfilePicture(formData);
};

const updateProfile = async () => {
    const data = { username: editableName.value };
    await userStore.updateProfile(data);
    isEditing.value = false;
};
</script>
