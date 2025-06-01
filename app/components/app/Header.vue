<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signIn = () => {
    navigateTo('/login')
}

const signOut = async () => {
    try {
        await supabase.auth.signOut()
    } catch (error) {
        console.error('Sign out failed:', error)
    } finally {
        navigateTo('/')
    }
}
</script>
<template>
    <UContainer>
        <div class="flex items-center justify-between py-4">
            <div class="flex items-center">
                <NuxtLink to="/dashboard" class="text-xl font-bold text-gray-900 dark:text-white">
                    SupaWedding
                </NuxtLink>
            </div>

            <div class="flex items-center">
                <UButton v-if="!user" @click="signIn" variant="solid" color="primary" class="cursor-pointer">
                    Sign In
                </UButton>
                <UButton v-else @click="signOut" variant="soft" color="neutral" class="cursor-pointer">
                    Sign Out
                </UButton>
            </div>
        </div>
    </UContainer>
</template>