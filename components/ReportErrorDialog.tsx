import { XMarkIcon, BugAntIcon } from "@heroicons/react/24/outline"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import React, { useState } from "react"
import { useTrackedUser } from "../hooks/useTrackedUser"
import { SocialButton } from "./Button"
import { ErrorForm } from "./ErrorForm"

export function ReportErrorDialog() {
    const [user] = useTrackedUser()
    const [open, setOpen] = useState(false)

    if (!user) return null

    return (
        <DialogPrimitive.Root modal={false} open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
                {!open && (
                    <SocialButton className='!fixed right-20' label='Nahlásit chybu'>
                        <BugAntIcon className='block h-10 w-10' aria-hidden='true' />
                    </SocialButton>
                )}
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Content className='flex items-center justify-center'>
                <div className='fixed flex flex-col items-center justify-center w-fit px-8 py-16 mx-auto text-center transform backdrop-blur bg-background/90 right-0 top-0 z-50'>
                    {open && <ErrorForm user={user} onSuccess={() => setOpen(false)} />}
                </div>
                <DialogPrimitive.Close asChild>
                    <button className='z-50 fixed top-0 right-0 flex flex-col items-center justify-center p-3 duration-500 outline-none cursor-pointer lg:p-6 hover:opacity-30'>
                        <XMarkIcon className='block h-10 w-10' aria-hidden='true' />
                    </button>
                </DialogPrimitive.Close>
            </DialogPrimitive.Content>
        </DialogPrimitive.Root>
    )
}
