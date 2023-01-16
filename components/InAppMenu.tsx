import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { useTrackedUser } from "../hooks/useTrackedUser"
import { SocialButton } from "./Button"
import { Menu } from "./Menu"

export function InAppMenu() {
	const [user, { logout }] = useTrackedUser()

	return (
		<Menu items={[]} logoLink='/' inApp>
			{user ? (
				<SocialButton label='Odhlásit se' naked className='hover:text-secondary !aspect-auto flex' onClick={logout}>
					<>
						<ArrowLeftOnRectangleIcon className='h-6 w-6 mr-2' aria-hidden='true' /> Odhlásit se
					</>
				</SocialButton>
			) : (
				<SocialButton label='Přihlásit se' naked className='hover:text-secondary !aspect-auto flex' href='/sign'>
					<>
						<ArrowRightOnRectangleIcon className='h-6 w-6 mr-2' aria-hidden='true' /> Přihlásit se
					</>
				</SocialButton>
			)}
		</Menu>
	)
}
