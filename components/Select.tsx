import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import * as RSelect from "@radix-ui/react-select"
import React from "react"

type Values = { readonly label: string; readonly value: string; readonly disabled?: boolean }[]
type GroupedValues = Readonly<Readonly<[string, ...Values]>[]>

// eslint-disable-next-line functional/no-mixed-types
type SelectProps = {
    readonly values?: Values
    readonly groupValues?: GroupedValues
    readonly onChange: (value: string) => void
    readonly value: string
    readonly label: string
    readonly placeholder: string
}

const Select = ({ groupValues, values, onChange, value, placeholder }: SelectProps) => {
    return (
        <RSelect.Root onValueChange={onChange} value={value}>
            <RSelect.Trigger
                className='flex items-center justify-between rounded px-4 text-base leading-none w-56 h-9 gap-1 bg-background text-highlight hover:text-secondary data-[placeholder]:text-secondary outline-none'
                aria-label='Food'
            >
                <RSelect.Value placeholder={placeholder} />
                <RSelect.Icon className='text-secondary'>
                    <ChevronDownIcon />
                </RSelect.Icon>
            </RSelect.Trigger>
            <RSelect.Portal>
                <RSelect.Content className='overflow-hidden bg-background rounded-md z-50'>
                    <RSelect.ScrollUpButton className='flex items-center justify-center h-6 bg-background text-primary cursor-default'>
                        <ChevronUpIcon />
                    </RSelect.ScrollUpButton>
                    <RSelect.Viewport className='p-1'>
                        {values?.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                        {groupValues?.map(([group, ...items]) => (
                            <RSelect.Group key={group}>
                                <RSelect.Label className='pl-1 leading-6 text-xs text-secondary'>{group}</RSelect.Label>
                                {items.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </RSelect.Group>
                        ))}
                    </RSelect.Viewport>
                    <RSelect.ScrollDownButton className='flex items-center justify-center h-6 bg-background text-secondary cursor-default'>
                        <ChevronDownIcon />
                    </RSelect.ScrollDownButton>
                </RSelect.Content>
            </RSelect.Portal>
        </RSelect.Root>
    )
}

const SelectItem = React.forwardRef<HTMLDivElement, { children: React.ReactNode; value: string }>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <RSelect.Item
                className='text-base leading-none text-highlight rounded-sm flex items-center h-6 pr-8 pl-4 relative select-none data-[disabled]:text-off data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-secondary data-[highlighted]:text-background'
                {...props}
                ref={forwardedRef}
            >
                <RSelect.ItemIndicator className='absolute left-0 w-4 inline-flex items-center justify-center'>
                    <CheckIcon />
                </RSelect.ItemIndicator>
                <RSelect.ItemText>{children}</RSelect.ItemText>
            </RSelect.Item>
        )
    },
)
SelectItem.displayName = "SelectItem"

export { Select }
