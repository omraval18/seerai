import React from 'react'

type Props = {
    children:React.ReactNode
}

export default function SignUpLayout({children}: Props) {
  return <main className="w-full h-full flex justify-center items-center overflow-y-hidden">{children}</main>;
}