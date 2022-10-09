import { Form, useFormSubmit } from "next-runtime/form"
import { useRouter } from "next/router"
import { Button } from "./Button"
import { DecoratedInput } from "./DecoratedInput"
import { PickPackage } from "./PickPackage"
import { Typography } from "./Typography"

type Props = {
    readonly buttonText: string
}

export function ProfileDetailsForm({ buttonText }: Props) {
    const router = useRouter()
    const startPlan = (router.query.startPlan as string) || "Basic"
    const { isSubmitting } = useFormSubmit()

    return (
        <Form
            method='post'
            action={`/register?startPlan=${startPlan}`}
            className='mx-auto flex flex-col items-center justify-center gap-4 group mb-8 mt-8'
        >
            <PickPackage selectedPackage={startPlan} />
            <Typography variant='h2' component='h2' className='mt-8 text-center'>
                Zadej své jméno
            </Typography>
            <DecoratedInput name='name' type='text' placeholder='Zadejte své jméno' required />

            <Button
                size='huge'
                type='submit'
                theme='main'
                className='w-fit group-invalid:opacity-50 group-invalid:pointer-events-none'
                disabled={isSubmitting}
            >
                {buttonText}
            </Button>
        </Form>
    )
}
