<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
<template>
    <UContainer>
        <div class="flex items-center justify-between py-8 border-t border-gray-200 dark:border-gray-800">
            <div class="text-sm text-gray-600 dark:text-gray-400">
                © {{ currentYear }} SupaWedding. All rights reserved.
            </div>

            <div class="flex items-center space-x-4">
                <ULink to="/privacy"
                    class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Privacy Policy
                </ULink>
            </div>
        </div>
    </UContainer>
</template>
