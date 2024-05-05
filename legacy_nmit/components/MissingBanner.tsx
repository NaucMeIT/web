import { Typography } from "./Typography"
import { useTrackedUser } from "../hooks/useTrackedUser"
import { Button } from "./Button"

export function MissingBanner() {
    const [user] = useTrackedUser()
    const hasCredits = !!user?.credits
    const hasFreePlan = user?.paymentStatus === "NotNecessary"

    return (
        <div className={`${hasCredits ? "bg-transparent" : "bg-secondary/5"} w-full p-4 text-center align-middle`}>
            <Typography variant='important'>
                {!user
                    ? "Nejsi přihlášen. Většina funkcí pro tebe není dostupná."
                    : hasCredits
                      ? `Skvělá volba plánu, máš k dispozici ještě ${user.credits} konzultací!`
                      : "Nemáš žádné konzultace k dispozici, změň to a získej konzultace za ty nejlepší ceny!"}
            </Typography>
            {user && !hasCredits ? (
                <Button
                    theme='main'
                    className='mx-10'
                    href={hasFreePlan ? "/profile/edit?isEdit=true&startPlan=Core" : "/pay"}
                >
                    {hasFreePlan ? "Změň plán" : "Zaplať plán"}
                </Button>
            ) : null}
            {!user && (
                <Button theme='main' className='mx-10' href='/sign'>
                    Přihlásit se
                </Button>
            )}
        </div>
    )
}
