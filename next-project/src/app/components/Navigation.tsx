import React from 'react'
import Link from 'next/link'
import ThemeSwitcher from '@components/ThemeSwitcher/ThemeSwitcher'

export default function Navigation() {
  return (
    <div className='h-20 px-4 md:px8 bg-primary flex justify-between items-center w-full'>
      <Link href={"/"}>Home</Link>
      <ThemeSwitcher />
    </div>
  )
}
