import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
}

export function ActiveLink(props: ActiveLinkProps) {
  const { children, activeClassName, ...rest } = props
  const { pathname } = useRouter()

  const className = pathname === rest.href && activeClassName

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}