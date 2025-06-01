<script setup lang="ts">
const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Bride',
        content: 'Weddy made organizing our guest list so much easier. The table assignment feature saved us hours of planning.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Event Planner',
        content: 'The CSV upload feature is a game changer. I can import guest lists from any source and have everything organized in minutes.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Party Host',
        content: 'Simple, intuitive, and powerful. Weddy helped me manage 200+ guests for my anniversary party effortlessly.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
]
</script>

<template>
    <div>
        <!-- Hero Section -->
        <UContainer>
            <div class="py-24 text-center">
                <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Simplify Your Event Planning
                </h1>
                <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Create guest lists, organize seating arrangements, and manage your events with ease.
                    Perfect for weddings, parties, and special occasions.
                </p>
                <div class="flex gap-4 justify-center">
                    <UButton size="lg" color="primary">
                        Get Started Free
                    </UButton>
                    <UButton size="lg" variant="outline" color="gray">
                        Learn More
                    </UButton>
                </div>
            </div>
        </UContainer>

        <!-- Features Section -->
        <div class="bg-gray-50 dark:bg-gray-900 py-24">
            <UContainer>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div
                            class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UIcon name="i-heroicons-user-group" class="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Guest Management</h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            Easily create and manage your guest lists with our intuitive interface
                        </p>
                    </div>
                    <div class="text-center">
                        <div
                            class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UIcon name="i-heroicons-table-cells" class="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Table Assignments</h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            Organize seating arrangements and assign guests to tables effortlessly
                        </p>
                    </div>
                    <div class="text-center">
                        <div
                            class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UIcon name="i-heroicons-document-arrow-up" class="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 class="text-xl font-semibold mb-2">CSV Import</h3>
                        <p class="text-gray-600 dark:text-gray-300">
                            Upload your existing guest lists via CSV and let us handle the rest
                        </p>
                    </div>
                </div>
            </UContainer>
        </div>

        <!-- Testimonials Section -->
        <div class="py-24">
            <UContainer>
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        What Our Users Say
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300">
                        Join thousands of event planners who trust Weddy
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <UCard v-for="testimonial in testimonials" :key="testimonial.id" class="p-6">
                        <div class="flex items-center mb-4">
                            <UAvatar :src="testimonial.avatar" :alt="testimonial.name" size="md" class="mr-4" />
                            <div>
                                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.role }}</p>
                            </div>
                        </div>
                        <p class="text-gray-700 dark:text-gray-300">
                            "{{ testimonial.content }}"
                        </p>
                    </UCard>
                </div>
            </UContainer>
        </div>

        <!-- Call to Action Section -->
        <div>
            <UContainer class="bg-primary-600 py-24 rounded-lg">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-white mb-4">
                        Ready to Plan Your Perfect Event?
                    </h2>
                    <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Start organizing your guest list today and make your event planning stress-free.
                    </p>
                    <UButton size="lg" color="neutral" variant="subtle">
                        Start Planning Now
                    </UButton>
                </div>
            </UContainer>
        </div>
    </div>
</template>