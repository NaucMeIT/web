import { Typography } from "./Typography"

export function EmailThanks() {
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<span id='contact'>&nbsp;</span>
			<Typography variant='h2'>Děkujeme za zprávu!</Typography>
			<Typography>Budeme Vás kontaktovat co nejdříve.</Typography>
		</div>
	)
}
