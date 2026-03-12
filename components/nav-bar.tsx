import Link from 'next/link'
import { LogOut, Plus, Users } from 'lucide-react'
import { Button } from './ui/button'
import { cn, hasEnvVars } from '@/lib/utils'
import { Suspense } from 'react'
import { AuthButton } from './auth-button'
import { EnvVarWarning } from './env-var-warning'

const navItems = [
  { to: '/', label: 'Leads', icon: Users },
  { to: '/leads/new', label: 'New Lead', icon: Plus },
];

export default function Header() {

  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            LeadFlow
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link key={to} href={to}>
                <Button
                  variant='ghost'
                  size="sm"
                  className={cn(
                    'gap-2',
                    'font-semibold'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {!hasEnvVars ? (
            <EnvVarWarning />
          ) : (
            <Suspense>
              <AuthButton />
            </Suspense>
          )}
        </div>

      </div>
    </header>
  )
}
