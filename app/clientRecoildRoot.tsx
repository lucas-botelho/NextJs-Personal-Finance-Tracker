'use client'

import { RecoilRoot } from "recoil"


export function ClientRecoildRoot({ children }: { children: React.ReactNode }) {
    return <RecoilRoot>{children}</RecoilRoot>
}