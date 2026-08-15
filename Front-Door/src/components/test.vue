<template>
    <section class="bg-gray-100 min-h-screen flex items-center justify-center">
       <div class="bg-white-100 flex justify-center">
        <form action="">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" class="border border-gray-300 rounded-md p-2 mb-4 w-full">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" class="border border-gray-300 rounded-md p-2 mb-4 w-full">
            <label for="message">Message:</label>
            <textarea name="message" id="message" class="border border-gray-300 rounded-md p-2 mb-4 w-full"></textarea>
            <button type="submit" class="bg-blue-500 text-white rounded-md p-2 w-full">Submit</button>
        </form>
       </div>

    </section>
</template>