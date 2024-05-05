export function SideDecoration() {
    return (
        <>
            <picture>
                <source srcSet='/images/left.svg' media='(min-width: 1800px)' />
                <img
                    height='110vh'
                    aria-hidden
                    srcSet=''
                    alt=''
                    loading='lazy'
                    className='fixed top-0 hidden h-full 3xl:block'
                />
            </picture>
            <picture>
                <source srcSet='/images/right.svg' media='(min-width: 1800px)' />
                <img
                    height='110vh'
                    aria-hidden
                    srcSet=''
                    alt=''
                    loading='lazy'
                    className='fixed top-0 right-0 hidden h-full 3xl:block'
                />
            </picture>
        </>
    )
}
