'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function ClientChakraProvider({ children }: { children: React.ReactNode }) {
    return <ChakraProvider>{children}</ChakraProvider>
}