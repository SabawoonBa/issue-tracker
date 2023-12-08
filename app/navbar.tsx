'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';
  

const Navbar = () => {
    const currentAddress = usePathname();
    const {status, data: session} = useSession();

    const links = [
        {title: "Dashboard", href: "/"},
        {title: "Issues", href: "/issues"},
    ]
  return (
    <div className='flex space-x-2 px-4 border-b py-4'>
      <Link href="/"><FaBug /></Link>
      <ul className='flex space-x-3 pl-5'>
        {links.map(link => (
            <li className={classNames({
              'text-zinc-900': link.href === currentAddress,
              'text-zinc-500': link.href !== currentAddress,
              'hover:text-zinc-800 transition-colors': true
            })} key={link.href}><Link href={link.href} >{link.title}</Link></li>
        ))}
      </ul>
      <Box> 
        { status === 'authenticated' && <Link href="/api/auth/signout">Logout</Link>}
        { status === 'unauthenticated' &&  <Link href="api/auth/signin">Sign In</Link>}
       </Box>
    </div>
  )
}

export default Navbar
