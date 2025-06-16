import { useEffect, useState } from 'react'

interface CountdownTimerProps {
    targetDate: Date
    className?: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [isExpired, setIsExpired] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient) return

        const calculateTimeRemaining = () => {
            const now = new Date()
            const difference = targetDate.getTime() - now.getTime()

            if (difference <= 0) {
                setIsExpired(true)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                return
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((difference % (1000 * 60)) / 1000)

            setTimeLeft({ days, hours, minutes, seconds })
        }

        // Calculate immediately
        calculateTimeRemaining()

        // Set up interval to update every second
        const timer = setInterval(calculateTimeRemaining, 1000)

        return () => clearInterval(timer)
    }, [targetDate, isClient])

    if (!isClient) {
        return (
            <span className={className}>
                načítání...
            </span>
        )
    }

    if (isExpired) {
        return (
            <span className={className}>
                Registrace ukončena!
            </span>
        )
    }

    const formatTimeUnit = (value: number, singular: string, few: string, many: string) => {
        if (value === 1) return singular
        if (value >= 2 && value <= 4) return few
        return many
    }

    return (
        <span className={className}>
            {timeLeft.days > 0 && (
                <>
                    {timeLeft.days} {formatTimeUnit(timeLeft.days, 'den', 'dny', 'dní')}{' '}
                </>
            )}
            {timeLeft.hours > 0 && (
                <>
                    {timeLeft.hours} {formatTimeUnit(timeLeft.hours, 'hodina', 'hodiny', 'hodin')}{' '}
                </>
            )}
            {timeLeft.minutes > 0 && (
                <>
                    {timeLeft.minutes} {formatTimeUnit(timeLeft.minutes, 'minuta', 'minuty', 'minut')}{' '}
                </>
            )}
            {timeLeft.seconds} {formatTimeUnit(timeLeft.seconds, 'sekunda', 'sekundy', 'sekund')}
        </span>
    )
}
