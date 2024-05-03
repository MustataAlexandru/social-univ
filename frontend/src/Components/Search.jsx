import {Button} from 'flowbite-react'
import React from 'react'

export default function Search() {
    return (

        <form class="flex items-center max-w-lg mx-auto" style={{width: '50rem'}}>
            <label for="voice-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                    </svg>
                </div>
                <input type="text" id="voice-search"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-450 dark:focus:border-orange-450"
                       placeholder="Search" required/>
                <Button gradientDuoTone="pinkToOrange" type="submit"
                        className="bd-t-r-t-b inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white focus:ring-4 focus:outline-none absolute inset-y-0 end-0 flex items-center pe-3">
                    <svg className="w-4 h-4 me" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </Button>
            </div>

        </form>

    )
}
