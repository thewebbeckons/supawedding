<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const eventDate = ref(new Date().toISOString().split('T')[0])

const { data: guests } = await useAsyncData('guests', async () => {
    try {
        const { data, error } = await supabase
            .from('guests')
            .select('*')
            .eq('user_id', user.value?.id)

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching guests:', error)
        toast.add({
            title: 'Error',
            description: 'Failed to load guest list.',
            variant: 'danger',
            duration: 3000,
        })
    }

})



const importCsv = () => {
    // TODO: Implement CSV import functionality
    console.log('Import CSV clicked')
}
</script>

<template>
    <UContainer>
        <div class="py-8 space-y-8">
            <!-- Title Section -->
            <div class="">
                <h1 class="text-3xl font-bold">
                    Event Dashboard
                </h1>
            </div>

            <!-- Guest List Section -->
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Guest List
                </h2>
                <div class="flex gap-3">
                    <GuestsAddModal />
                    <UButton icon="i-lucide-sheet" @click="importCsv" color="neutral" variant="outline">
                        Import CSV
                    </UButton>
                </div>
            </div>
            <GuestsTable :guests="guests" />
        </div>
    </UContainer>
</template>