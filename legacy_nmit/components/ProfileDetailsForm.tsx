import { Button } from "./Button"
import { DecoratedInput } from "./DecoratedInput"
import { PickPackage } from "./PickPackage"
import { Typography } from "./Typography"

type Props = {
    readonly name: string
    readonly startPlan: string
    readonly isEdit: boolean
}

export function ProfileDetailsForm({ name, startPlan, isEdit }: Props) {
    const isUnpaid = startPlan === "Basic"

    return (
        // Can't be <Form> because it doesn't follow redirect, see https://github.com/smeijer/next-runtime/issues/51
        <form
            method='post'
            action={`/profile/edit?startPlan=${startPlan}`}
            className='mx-auto flex flex-col items-center justify-center gap-4 group mb-8 mt-8'
            data-splitbee-event='Register form'
        >
            <PickPackage selectedPackage={startPlan} isEdit={isEdit} />
            <Typography variant='h2' component='h2' className='mt-8 text-center'>
                Zadej své jméno
            </Typography>
            <DecoratedInput
                name='name'
                type='text'
                placeholder='Zadejte své jméno'
                defaultValue={name}
                required
                width='w-full lg:w-1/2'
            />

            <div className='flex flex-row-reverse gap-4 justify-between mt-4'>
                <Button
                    size='huge'
                    type='submit'
                    theme='main'
                    name='wantsToPay'
                    value='pay'
                    className='w-fit group-invalid:opacity-50 group-invalid:pointer-events-none'
                    disabled={isUnpaid}
                    tabIndex={isUnpaid ? -1 : 0}
                >
                    Zaplatit
                </Button>
                <Button
                    size='huge'
                    type='submit'
                    theme='off'
                    name='wantsToPay'
                    value='skip'
                    className='w-fit group-invalid:opacity-50 group-invalid:pointer-events-none'
                >
                    Uložit
                </Button>
            </div>
        </form>
    )
}
