'use client'
import Image from 'next/image'
import logoLinkLab from '../../public/logoLinkLab.png'
import MenuIcon from '../../icons/menu.svg'
import { Button } from '../ui/button'
import Link from 'next/link'
export const Navbar = () => {
	return (
		<div className="bg-black">
			<div className="px-4 ">
				<div className="py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Image src={logoLinkLab} alt="logo LinkLab" className="h-12 w-14" />
						<p className="text-4xl font-bold text-white">LinkLab</p>
					</div>

					<div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
						<MenuIcon className="text-white" />
					</div>
					<nav className="flex gap-6 items-center hidden sm:flex">
						<a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">
							About
						</a>
						<a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">
							Pricing
						</a>
						<a href="#" className="text-opacity-60 text-white hover:text-opacity-100 transition">
							Help
						</a>
						<Button className=" text-black bg-white py-2 px-4 rounded-lg " asChild>
							<Link href="/sign-in">Sign In</Link>
						</Button>
						{/* <Button className="text-black bg-white py-2 px-4 rounded-lg" asChild>
							<Link href="/sign-up">Rejestracja</Link>
						</Button> */}
					</nav>
				</div>
			</div>
		</div>
	)
}
