import { XMarkIcon, BugAntIcon, CalendarIcon } from "@heroicons/react/24/outline"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import React, { useState } from "react"
import { PopupModal } from "react-calendly"
import { useTrackedUser } from "../hooks/useTrackedUser"
import { SocialButton } from "./Button"
import { ErrorForm } from "./ErrorForm"

export function ActionSidebar() {
    const [user] = useTrackedUser()
    const [openError, setOpenError] = useState(false)
    const [openCalendly, setOpenCalendly] = useState(false)

    if (!user || !user.name || !user.email) return null

    return (
        <DialogPrimitive.Root modal={false} open={openError} onOpenChange={setOpenError}>
            <DialogPrimitive.Trigger asChild>
                {!openError && (
                    <SocialButton className='!fixed right-20' label='Nahlásit chybu'>
                        <BugAntIcon className='block h-10 w-10' aria-hidden='true' />
                    </SocialButton>
                )}
            </DialogPrimitive.Trigger>
            <SocialButton className='!fixed right-44' label='Domluvit schůzku' onClick={() => setOpenCalendly(true)}>
                <CalendarIcon className='block h-10 w-10' aria-hidden='true' />
            </SocialButton>
            <PopupModal
                url='https://calendly.com/syreanis/konzultace-nauc-me-it?hide_gdpr_banner=1'
                rootElement={document.getElementById("calendly")!}
                onModalClose={() => setOpenCalendly(false)}
                open={openCalendly}
                prefill={{
                    email: user.email,
                    name: user.name,
                }}
            />
            <DialogPrimitive.Content className='flex items-center justify-center'>
                <div className='fixed flex flex-col items-center justify-center w-fit px-8 py-16 mx-auto text-center transform backdrop-blur bg-background/90 right-0 top-0 z-50'>
                    {openError && <ErrorForm user={user} onSuccess={() => setOpenError(false)} />}
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
