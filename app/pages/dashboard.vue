<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const eventDate = ref(new Date().toISOString().split('T')[0])

const { data: guests, refresh: refreshGuests } = await useAsyncData('guests', async () => {
    try {
        if (!user.value?.id) {
            return []
        }

        const { data, error } = await supabase
            .from('guests')
            .select('*')
            .eq('user_id', user.value.id)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching guests:', error)
        toast.add({
            title: 'Error',
            description: 'Failed to load guest list.',
            color: 'error',
            duration: 3000,
        })
        return []
    }
})

const { data: tables, refresh: refreshTables } = await useAsyncData('tables', async () => {
    try {
        if (!user.value?.id) {
            return []
        }

        const { data, error } = await supabase
            .from('tables')
            .select('*')
            .eq('user_id', user.value.id)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching tables:', error)
        toast.add({
            title: 'Error',
            description: 'Failed to load tables.',
            color: 'error',
            duration: 3000,
        })
        return []
    }
})

// const deleteGuest = async (id: string) => {
//     console.log('What is the ID:', id)
//     try {
//         const { error } = await supabase
//             .from('guests')
//             .delete()
//             .eq('id', id)

//         if (error) throw error

//         toast.add({
//             title: 'Guest deleted',
//             description: 'Guest has been successfully removed from the list.',
//             color: 'success',
//             duration: 2000
//         })

//         // Refresh the guest list
//         await refresh()
//     } catch (error) {
//         console.error('Error deleting guest:', error)
//         toast.add({
//             title: 'Error',
//             description: 'Failed to delete guest. Please try again.',
//             color: 'error',
//             duration: 3000
//         })
//     }
// }
// const editGuest = (id: string) => {
//     // Logic to edit guest
//     console.log('Edit guest with ID:', id)
// }
const importCsv = () => {
    // Logic to import CSV
    toast.add({
        title: 'Import CSV',
        description: 'CSV import functionality is not yet implemented.',
        color: 'info',
        duration: 3000,
    })
}

const deleteGuest = async (id: string) => {
    try {
        const { error } = await supabase
            .from('guests')
            .delete()
            .eq('id', id)

        if (error) throw error

        toast.add({
            title: 'Guest deleted',
            description: 'Guest has been successfully removed from the list.',
            color: 'success',
            duration: 2000
        })

        await refreshGuests()
    } catch (error) {
        console.error('Error deleting guest:', error)
        toast.add({
            title: 'Error',
            description: 'Failed to delete guest. Please try again.',
            color: 'error',
            duration: 3000
        })
    }
}

const editGuest = (guest: any) => {
    console.log('Edit guest:', guest)
    // TODO: Implement edit functionality
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
                    <GuestsAddModal @add="() => refreshGuests()" />
                    <TablesAddModal @add="() => refreshTables()" />
                    <UButton icon="i-lucide-sheet" @click="importCsv" color="neutral" variant="soft"
                        class="cursor-pointer">
                        Import CSV
                    </UButton>
                </div>
            </div>
            <GuestsTable :guests="guests || []" @delete="deleteGuest" @edit="editGuest" />
        </div>
    </UContainer>
</template>