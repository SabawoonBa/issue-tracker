'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
  

const Navbar = () => {
    const currentAddress = usePathname();
    const {status, data: session} = useSession();

    const links = [
        {title: "Dashboard", href: "/"},
        {title: "Issues", href: "/issues"},
    ]
  return (
    <nav className='px-4 border-b py-4'>
      <Container>
      <Flex justify="between">
        <Flex align='center' gap="3">
        <Link href="/"><FaBug /></Link>
        <ul className='flex space-x-6'>
          {links.map(link => (
              <li className={classNames({
                'text-zinc-900': link.href === currentAddress,
                'text-zinc-500': link.href !== currentAddress,
                'hover:text-zinc-800 transition-colors': true
              })} key={link.href}><Link href={link.href} >{link.title}</Link></li>
          ))}
        </ul>
        </Flex>
        <Box> 
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
          { status === 'authenticated' && (<Avatar src={session.user!.image!} fallback="?" size="2" radius='full' className='cursor-pointer' />)}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">
              { session?.user!.email }
              </Text>
              </DropdownMenu.Label>

              <DropdownMenu.Item>
                <Link href="api/auth/signout">Logout</Link>
              </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        { status === 'unauthenticated' &&  <Link href="api/auth/signin">Sign In</Link>}
       </Box>
      </Flex>
      </Container>
      
    </nav>
  )
}

export default Navbar
