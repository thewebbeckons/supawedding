<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
const props = defineProps<{
    guests: Array<{ id: string; name: string; table: string }>;
}>();
const supabase = useSupabaseClient()
const toast = useToast()

const getDropdownItems = (guest: { id: string; name: string; table: string }) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil',
            onSelect() {

            }
        },
        {
            label: 'Delete',
            icon: 'i-heroicons-trash',
            color: 'error',
            onSelect() {
                emit('delete', guest.id);
                console.log('Delete guest with ID:', guest.id);
            }
        }
    ]
]
const emit = defineEmits(['delete', 'edit'])

</script>

<template>
    <div v-if="guests.length === 0">
        <div
            class="outline-2 outline-offset-2 outline-dashed py-24 rounded-lg flex flex-col items-center justify-center text-gray-500 ">
            <UIcon name="i-heroicons-user-group" class="w-8 h-8 mb-2" />
            <p>No guests added yet. Click "Add Guest" to start.</p>
        </div>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="guest in guests" :key="guest.id" :content="{
            align: 'start',
            side: 'bottom'
        }">
            <UCard class="relative group">
                <div class="absolute top-2 right-2 ">
                    <UDropdownMenu :items="getDropdownItems(guest)" :content="{
                        align: 'start',
                        side: 'bottom',
                        sideOffset: 8
                    }" class="cursor-pointer">
                        <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
                    </UDropdownMenu>
                </div>
                <h3 class="text-xl font-semibold">{{ guest.name }}</h3>
                <p>{{ guest.table }}</p>
            </UCard>
        </div>
    </div>
</template>