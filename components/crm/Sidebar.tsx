'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const navItems = [
  {
    href: '/crm/leads',
    label: 'Leads',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1" y="2" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M4 6h8M4 9h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/crm/pipeline',
    label: 'Pipeline',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1" y="3" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.25" />
        <rect x="6" y="6" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.25" />
        <rect x="11" y="9" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
  {
    href: '/crm/clients',
    label: 'Clients',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M1 13c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M11 7.5c1.381 0 2.5 1.119 2.5 2.5v3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="11" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
]

export default function CRMSidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/crm/login')
    router.refresh()
  }

  return (
    <aside className="w-56 flex-shrink-0 bg-slate-900 flex flex-col h-full">
      <div className="px-5 py-4 border-b border-slate-800">
        <p className="text-white text-sm font-semibold">Texas Platinum Group</p>
        <p className="text-amber-500 text-xs mt-0.5 font-medium tracking-wide">Team CRM</p>
      </div>

      <nav aria-label="CRM navigation" className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === href || pathname.startsWith(href + '/')
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800 space-y-2">
        <p className="text-slate-500 text-xs truncate">{user.email}</p>
        <button
          onClick={handleSignOut}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
