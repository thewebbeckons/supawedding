<script setup lang="ts">
const props = defineProps<{
    guests: Array<{ id: string; name: string; table: string }>;
}>();

const emit = defineEmits<{
    edit: [guest: { id: string; name: string; table: string }]
    delete: [id: string]
}>();

const editGuest = (guest: { id: string; name: string; table: string }) => {
    emit('edit', guest);
};

const deleteGuest = (id: string) => {
    emit('delete', id);
};
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
        <div v-for="guest in guests" :key="guest.id">
            <UCard class="relative group">
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <UDropdown :items="[
                        [
                            {
                                label: 'Edit',
                                icon: 'i-heroicons-pencil',
                                click: () => editGuest(guest)
                            },
                            {
                                label: 'Delete',
                                icon: 'i-heroicons-trash',
                                click: () => deleteGuest(guest.id)
                            }
                        ]
                    ]">
                        <UButton icon="i-heroicons-ellipsis-vertical" size="sm" color="gray" variant="ghost" />
                    </UDropdown>
                </div>
                <h3 class="text-xl font-semibold">{{ guest.name }}</h3>
                <p>{{ guest.table }}</p>
            </UCard>
        </div>
    </div>
</template>