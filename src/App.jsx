import { useState } from 'react';
import { format } from 'date-fns';
import { LayoutDashboard, ArrowLeftRight, Settings, Sun, Moon, Wallet, TrendingUp, Target, History as HistoryIcon, Hexagon } from 'lucide-react';
import { useStore } from './context/Store.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions.jsx';
import SettingsPage from './pages/Settings.jsx';
import Budget from './pages/Budget.jsx';
import Investments from './pages/Investments.jsx';
import Plans from './pages/Plans.jsx';
import HistoryPage from './pages/History.jsx';

// Troque aqui o nome e o lema do app, se quiser.
const BRAND = { name: 'Finanças do Casal', tagline: 'Juntos, mais longe.' };

const NAV = [
  ['dash', 'Visão geral', LayoutDashboard, Dashboard],
  ['orc', 'Meu orçamento', Wallet, Budget],
  ['tx', 'Movimentações', ArrowLeftRight, Transactions],
  ['inv', 'Investimentos', TrendingUp, Investments],
  ['plan', 'Planos', Target, Plans],
  ['hist', 'Histórico', HistoryIcon, HistoryPage],
  ['cfg', 'Configurações', Settings, SettingsPage],
];

export default function App() {
  const { state, dispatch } = useStore();
  const [page, setPage] = useState('dash');
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [, label, , Page] = NAV.find((n) => n[0] === page);
  const names = state.people.map((p) => p.name).join(' & ');
  const dark = state.theme === 'dark';
  const link = (on) =>
    `flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm transition ${
      on ? 'bg-[#3985CC]/20 text-[#2a6fb0] ring-1 ring-[#3985CC]/40 dark:text-[#70B7FF]' : 'muted hover:bg-[#3985CC]/10'
    }`;

  return (
    <div className="min-h-screen md:pl-64">
      <aside className="glass fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-0 border-r p-5 md:flex">
        <div className="mb-8 flex items-center gap-3 px-1">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#3985CC]/20 text-[#70B7FF]"><Hexagon size={22} /></span>
          <div>
            <p className="font-semibold leading-tight">{BRAND.name}</p>
            <p className="muted text-xs">{BRAND.tagline}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map(([id, text, Icon]) => (
            <button key={id} className={link(page === id)} onClick={() => setPage(id)}><Icon size={18} />{text}</button>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl p-4 text-center" style={{ background: 'var(--surface)' }}>
          <div className="mb-2 flex justify-center">
            {state.people.map((p, i) => (
              <span
                key={p.id}
                className={`grid h-10 w-10 place-items-center rounded-full bg-[#3985CC]/30 text-sm font-semibold text-[#70B7FF] ${i ? '-ml-2' : ''}`}
                style={{ boxShadow: '0 0 0 2px var(--bg)' }}
              >
                {(p.name[0] || '?').toUpperCase()}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium">{names}</p>
          <p className="muted text-xs">Dados salvos neste navegador</p>
        </div>
      </aside>

      <main className="mx-auto max-w-6xl space-y-6 p-4 pb-28 md:p-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{page === 'dash' ? `Olá, ${names}!` : label}</h1>
            <p className="muted text-sm">{page === 'dash' ? 'Que tal organizar as finanças de hoje?' : BRAND.tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="month"
              className="input w-auto rounded-full"
              value={month}
              aria-label="Mês de referência"
              onChange={(e) => e.target.value && setMonth(e.target.value)}
            />
            <button
              className="btn-ghost btn h-10 w-10 !rounded-full !p-0"
              aria-label="Alternar tema"
              onClick={() => dispatch({ type: 'patch', patch: { theme: dark ? 'light' : 'dark' } })}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>
        <Page key={page} month={month} go={setPage} />
      </main>

      <nav className="glass fixed inset-x-0 bottom-0 z-30 flex gap-1 overflow-x-auto border-0 border-t p-2 md:hidden">
        {NAV.map(([id, text, Icon]) => (
          <button
            key={id}
            className={`flex min-w-[72px] shrink-0 flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-[11px] ${
              page === id ? 'bg-[#3985CC]/20 text-[#2a6fb0] dark:text-[#70B7FF]' : 'muted'
            }`}
            onClick={() => setPage(id)}
          >
            <Icon size={20} />{text}
          </button>
        ))}
      </nav>
    </div>
  );
}