<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const isOpen = ref(false)
const tableName = ref('')

const emit = defineEmits<{
    add: []
}>()

const addTable = async () => {
    if (!tableName.value.trim()) {
        toast.add({
            title: 'Error',
            description: 'Table name is required.',
            color: 'error',
            duration: 3000
        })
        return
    }

    if (!user.value?.id) {
        toast.add({
            title: 'Error',
            description: 'You must be logged in to create tables.',
            color: 'error',
            duration: 3000
        })
        return
    }

    try {
        const { error } = await supabase
            .from('tables')
            .insert({
                name: tableName.value.trim(),
                user_id: user.value.id
            } as any)

        if (error) throw error

        toast.add({
            title: 'Table created',
            description: `Table "${tableName.value}" has been created successfully.`,
            color: 'success',
            duration: 3000
        })

        // Reset form and close modal
        tableName.value = ''
        isOpen.value = false

        // Emit event to refresh tables
        emit('add')
    } catch (error) {
        console.error('Error creating table:', error)
        toast.add({
            title: 'Error',
            description: 'Failed to create table. Please try again.',
            color: 'error',
            duration: 3000
        })
    }
}
</script>

<template>
    <div>
        <UButton icon="i-heroicons-plus" @click="isOpen = true" color="info" variant="soft" class="cursor-pointer">
            Add Table
        </UButton>

        <UModal v-model:open="isOpen">
            <template #content>
                <div class="p-4 max-w-md">
                    <UForm @submit.prevent="addTable" class="space-y-4">
                        <UFormField label="Table Name" name="name" required>
                            <UInput v-model="tableName" placeholder="Enter table name" required />
                        </UFormField>

                        <div class="flex justify-end gap-3">
                            <UButton type="button" variant="ghost" @click="isOpen = false">
                                Cancel
                            </UButton>
                            <UButton type="submit" color="primary">
                                Add Table
                            </UButton>
                        </div>
                    </UForm>
                </div>
            </template>
        </UModal>
    </div>
</template>
