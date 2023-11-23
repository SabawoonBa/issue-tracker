'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
  

const Navbar = () => {
    const currentAddress = usePathname();

    const links = [
        {title: "Dashboard", href: "/"},
        {title: "Issues", href: "/issues"},
    ]
  return (
    <div className='flex space-x-2 px-4 border-b py-4'>
      <Link href="/"><FaBug /></Link>
      <ul className='flex space-x-3 pl-5'>
        {links.map(link => (
            // <li className={`${currentAddress !== link.href ? 'text-slate-500 hover:text-slate-900' : 'text-slate-900'} transition-all`} key={link.href}><Link href={link.href} >{link.title}</Link></li>
            <li className={classNames({
              'text-zinc-900': link.href === currentAddress,
              'text-zinc-500': link.href !== currentAddress,
              'hover:text-zinc-800 transition-colors': true
            })} key={link.href}><Link href={link.href} >{link.title}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default Navbar
