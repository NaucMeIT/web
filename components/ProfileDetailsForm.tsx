import { useRouter } from "next/router"
import { Button } from "./Button"
import { DecoratedInput } from "./DecoratedInput"
import { PickPackage } from "./PickPackage"
import { Typography } from "./Typography"

type Props = {
    readonly name: string
}

export function ProfileDetailsForm({ name }: Props) {
    const router = useRouter()
    const startPlan = router.query.startPlan as string

    return (
        // Can't be <Form> because it doesn't follow redirect, see https://github.com/smeijer/next-runtime/issues/51
        <form
            method='post'
            action={`/register?startPlan=${startPlan}`}
            className='mx-auto flex flex-col items-center justify-center gap-4 group mb-8 mt-8'
            data-splitbee-event='Register form'
        >
            <PickPackage selectedPackage={startPlan} />
            <Typography variant='h2' component='h2' className='mt-8 text-center'>
                Zadej své jméno
            </Typography>
            <DecoratedInput name='name' type='text' placeholder='Zadejte své jméno' defaultValue={name} required />

            <Button
                size='huge'
                type='submit'
                theme='main'
                className='w-fit group-invalid:opacity-50 group-invalid:pointer-events-none'
            >
                Uložit
            </Button>
        </form>
    )
}
