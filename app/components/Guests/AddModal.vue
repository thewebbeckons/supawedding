<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
const open = ref(false)
const tables = ref([
    { name: 'Table 1', id: 'table1' },
    { name: 'Table 2', id: 'table2' },
    { name: 'Table 3', id: 'table3' },
])

console.log(user.value)
const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    table: z.object({
        value: z.string().min(1, 'Not a valid table name'),
        label: z.string().min(1, 'Label is required'),
    }),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
    name: undefined,
    table: undefined,
})

async function addGuest(event: FormSubmitEvent<Schema>) {

    if (!user) {
        toast.add({
            title: 'Not Authenticated',
            description: 'You must be logged in to add guests.',
            variant: 'warning',
            duration: 3000,
        })
        return
    }

    try {
        const { data, error } = await supabase.from('guests').insert({
            name: state.name,
            user_id: user.value.id,
        })

        if (error) {
            throw error
        }
        toast.add({
            title: 'Guest Added',
            description: `Successfully added ${name} to the guest list.`,
            variant: 'success',
            duration: 3000,
        })

    } catch (error) {
        toast.add({
            title: 'Error',
            description: 'Failed to add guest. Please try again.',
            variant: 'danger',
            duration: 3000,
        })
        console.error('Error adding guest:', error)
    } finally {
        state.name = undefined
        state.table = undefined
        //close the modal if needed
        open.value = false
    }
}

function onCreateTable(name: string) {
    const newTable = { name, id: `table-${tables.value.length + 1}` }
    tables.value.push(newTable)
    selectedTable.value = newTable.id
}
</script>
<template>
    <UButton icon="i-lucide-plus" color="primary" variant="solid" @click="open = true">
        Add Guest
    </UButton>
    <UModal v-model:open="open">
        <template #content>
            <UCard>
                <UForm :schema="schema" :state="state" @submit="addGuest" class="space-y-4">
                    <UFormField label="Name" name="name" required>
                        <UInput v-model="state.name" placeholder="Enter guest name" class="w-48" />
                    </UFormField>
                    <UFormField label="Table" name="table" type="table" required>
                        <USelectMenu v-model="state.table" create-item
                            :items="tables.map(table => ({ label: table.name, value: table.id }))"
                            placeholder="Select a table" @create="onCreateTable" class="w-48" />
                    </UFormField>
                    <UButton type="submit" color="primary" variant="solid">
                        Add Guest
                    </UButton>
                </UForm>
            </UCard>
        </template>
    </UModal>
</template>