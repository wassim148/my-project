<template>
  <div class="flex col-span-3 md:col-span-1 flex-col px-12 py-12 w-full h-full bg-background font-['Inter']">
    <div class="flex flex-col space-y-12">
      <div class="text-foreground hover:!text-primary w-fit cursor-pointer h-full flex flex-row space-x-2 items-center">
        <RouterLink to="/">
          <div class="border rounded-sm shadow-sm p-2 bg-background">
            <Icon icon="ant-design:thunderbolt-filled" class="text-inherit h-4 w-4"></Icon>
          </div>
        </RouterLink>
        <span class="text-sm tracking-wider text-inherit uppercase font-semibold flex items-center">Factory Bliz</span>
      </div>
      <main class="flex flex-col space-y-6">
        <h1 class="font-semibold text-lg">Create Your Account</h1>
        <form class="text-base" @submit.prevent="onSubmit">
          <div :class="cn('space-y-4', step > 1 && 'hidden')" v-auto-animate>
            <div>
              <label for="profile-picture" class="block text-sm font-medium text-gray-700">Browse Photo</label>
              <div class="flex items-center mt-1">
                <input type="file" id="profile-picture" accept="image/*" @change="handleFileUpload" class="hidden" />
                <label for="profile-picture"
                  class="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-300 transition duration-300">
                  Click to add profile picture
                </label>
              </div>
              <img v-if="profilePicturePreview" :src="profilePicturePreview" alt="Profile Picture Preview"
                class="mt-2 w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-300" />
            </div>
            <FormField name="firstname" v-slot="{ field, errorMessage }">
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="username" v-bind="field" />
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>
            <FormField name="email" v-slot="{ field, errorMessage }">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@example.com" v-bind="field" />
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>
            <Button class="w-full" @click="nextStep" type="button">Next</Button>
          </div>
          <div :class="cn('space-y-4', step <= 1 && 'hidden')" v-auto-animate>
            <FormField name="password" v-slot="{ field, errorMessage }">
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" v-bind="field" />
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <select id="role" v-model="role" required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <FormField name="profession" v-slot="{ field, errorMessage }">
              <FormItem>
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Software Engineer" v-bind="field" />
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>
            <FormField name="cin" v-slot="{ field, errorMessage }">
              <FormItem>
                <FormLabel>CIN (National Identity Card Number)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="12345678" v-bind="field" />
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>
            <div class="w-full py-4 justify-center flex space-x-4">
              <Button variant="secondary" class="w-full" @click="step--" type="button">Back</Button>
              <Button type="submit" class="w-full">Sign Up</Button>
            </div>
          </div>
        </form>
        <Separator />
        <span class="text-xs">
          Already have an account?
          <RouterLink to="/sign-in" class="text-primary hover:text-primary/60">Sign in now</RouterLink>
        </span>
      </main>
    </div>
    <div class="flex-grow"></div>
    <div class="flex justify-between items-center w-full">
      <RouterLink to="/" class="flex space-x-1 items-center text-xs my-auto">
        <img class="h-4 w-5" src="@/assets/img/DATIUM-02.png" />
        <span>Datuim-sass</span>
      </RouterLink>
      <span class="text-xs">© Datuim-sass 2021</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ref } from 'vue';
import { cn } from '@/shared/lib/utils';
import { useUserStore } from '@/core/stores/user.store';
import Button from '@components/ui/button/Button.vue';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import Input from '@/shared/components/ui/input/Input.vue';
import Separator from '@/shared/components/ui/separator/Separator.vue';
import { Icon } from '@iconify/vue';

const formSchema = toTypedSchema(
  z.object({
    firstname: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address!' }),
    password: z.string()
      .min(8, { message: 'Password is too short' })
      .max(20, { message: 'Password is too long' }),
    profession: z.string().min(3, { message: 'Profession must be at least 3 characters.' }),
    cin: z.string().min(8, { message: 'CIN must be at least 9 digits.' }).regex(/^\d+$/, {
      message: 'CIN must only contain numbers.',
    }),
  }),
);

const { handleSubmit, values, errors } = useForm({
  validationSchema: formSchema,
});

const userStore = useUserStore();

const onSubmit = handleSubmit(async (values) => {
  try {
    await userStore.signup({ ...values, role: role.value });
    alert('Account created successfully!');
    window.location.href = '/sign-in';
  } catch (error) {
    console.error(error);
    alert('An error occurred while creating your account.');
  }
});

const step = ref<number>(1);
const nextStep = async () => {
  const validation = await handleSubmit();
  if (!Object.keys(errors.value).length) {
    step.value++;
  }
};

const profilePicturePreview = ref<string | null>(null);
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicturePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
};

const role = ref<string>('Employee');
</script>

<style scoped>
.trapez {
  transform: skewX(-20deg);
}
.trapez-content {
  transform: skewX(20deg);
}
</style>