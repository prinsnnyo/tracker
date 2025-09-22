"use client"

import { AuthProvider } from '@/contexts/auth-context'

export default function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}