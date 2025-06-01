<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
definePageMeta({
  title: 'Sign In - Weddy',
  layout: 'auth',
})
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(false)

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { email, password } = event.data

  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    toast.add({
      title: 'Sign in successful',
      description: 'Welcome back!',
      variant: 'success',
      duration: 3000
    })

  } catch (error) {
    toast.add({
      title: 'Sign in failed',
      description: error.message || 'An unexpected error occurred.',
      variant: 'danger',
      duration: 5000
    })
  } finally {
    loading.value = false
  }
}

// Redirect if already logged in
watchEffect(() => {
  if (user.value) {
    navigateTo('/dashboard')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <UContainer class="h-full">
      <div class="max-w-md mx-auto">
        <UCard class="p-8">
          <div class="flex flex-col text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Sign In to Weddy
            </h1>
            <p class="text-gray-600 dark:text-gray-300 mt-2">
              Welcome back! Please sign in to your account.
            </p>
          </div>
          <div class="space-y-6">
            <UForm :schema="schema" @submit.prevent="onSubmit" :state="state" class="flex flex-col space-y-6">
              <UFormField label="Email" name="email">
                <UInput v-model="state.email" type="email" placeholder="Enter your email" required :disabled="loading"
                  class="w-full" />
              </UFormField>

              <UFormField label="Password" name="password">
                <UInput v-model="state.password" type="password" placeholder="Enter your password" required
                  :disabled="loading" class="w-full" />
              </UFormField>

              <UButton type="submit" block class="cursor-pointer" :loading="loading">
                Sign In
              </UButton>
            </UForm>
            <div class="flex flex-col mt-6 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?
                <ULink to="/register" class="text-primary-600 hover:text-primary-500">
                  Sign up
                </ULink>
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
