import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
	try {
		const { email } = await req.json()

		console.log('Próba wysłania maila na:', email) // Dodane dla debugowania

		const response = await resend.emails.send({
			from: 'delivered@resend.dev', // Upewnij się, że ten adres jest zweryfikowany w Resend
			to: 'jakub.palka97@op.pl',
			subject: 'Nowe zgłoszenie do aplikacji',
			text: `Nowe zgłoszenie do aplikacji.\n\nE-mail: ${email}`,
		})

		console.log('Odpowiedź z Resend:', response) // Dodane dla debugowania

		return Response.json({ success: true, response })
	} catch (error) {
		console.error('Błąd wysyłania maila:', error) // Dodane dla debugowania

		return Response.json(
			{ success: false, error: JSON.stringify(error) },
			{
				status: 500,
			}
		)
	}
}
