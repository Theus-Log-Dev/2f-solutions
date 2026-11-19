import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { format, parseISO, subMonths } from 'date-fns';
import { AlertTriangle, Wallet, ArrowDownToLine, ArrowUpFromLine, TrendingUp, PiggyBank, Gauge, Plus, Target, BarChart3 } from 'lucide-react';
import { useStore } from '../context/Store.jsx';
import { summarize, byCategory, goalStats, effective } from '../utils/finance.js';
import { fmt } from '../utils/money.js';
import { Kpi, Empty, TONE } from '../components/ui.jsx';

const COLORS = ['#3985CC', '#70B7FF', '#34d399', '#f59e0b', '#a78bfa', '#f87171'];
const pc = (v) => `${v.toFixed(1).replace('.', ',')}%`;

export default function Dashboard({ month, go }) {
  const { state } = useStore();
  const s = summarize(state, month);
  const base = parseISO(month + '-01');
  const prev = summarize(state, format(subMonths(base, 1), 'yyyy-MM'));
  const cats = byCategory(state, month);
  const delta = s.expense - prev.expense;

  const slices = cats.filter((c) => c.used > 0).map((c) => ({ name: c.name, used: c.used }));
  const rest = s.expense - slices.reduce((a, c) => a + c.used, 0);
  if (rest > 0) slices.push({ name: 'Sem categoria', used: rest });
  const donut = slices.map((c, i) => ({ ...c, value: c.used / 100, fill: COLORS[i % COLORS.length] }));

  const budgets = cats.filter((c) => c.limit > 0).slice(0, 5);
  const goals = goalStats(state).slice(0, 2);
  const recent = state.transactions.filter(effective).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const usage = [['Despesas', s.expense, '#f87171'], ['Investido', s.invest, '#70B7FF'], ['Guardado', s.saved, '#3985CC'], ['Saldo', Math.max(s.balance, 0), '#34d399']];
  const usageTotal = usage.reduce((a, u) => a + u[1], 0);
  const bars = [5, 4, 3, 2, 1, 0].map((i) => {
    const d = subMonths(base, i);
    const x = summarize(state, format(d, 'yyyy-MM'));
    return { m: format(d, 'MM/yy'), Receitas: (x.reference + x.income) / 100, Despesas: x.expense / 100 };
  });
  const money = (v) => fmt(Math.round(v * 100));

  return (
    <div className="space-y-6">
      {!s.reference && state.transactions.length === 0 && (
        <Empty title="Comece por aqui" text="Informe as rendas em Configurações e registre a primeira movimentação." />
      )}
      {cats.filter((c) => c.over).map((c) => (
        <div key={c.id} className="flex items-center gap-2 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertTriangle size={16} /> Orçamento de {c.name} excedido em {fmt(-c.remaining)}
        </div>
      ))}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Kpi icon={Wallet} hue="#3985CC" label="Saldo disponível" value={fmt(s.balance)} tone={s.balance < 0 ? 'neg' : 'pos'} />
        <Kpi icon={ArrowDownToLine} hue="#34d399" label="Renda de referência" value={fmt(s.reference)} note={s.income ? `+ ${fmt(s.income)} em receitas registradas` : undefined} />
        <Kpi icon={ArrowUpFromLine} hue="#a78bfa" label="Despesas" value={fmt(s.expense)} note={`${delta > 0 ? '↑' : delta < 0 ? '↓' : '='} ${fmt(Math.abs(delta))} vs. mês anterior`} />
        <Kpi icon={TrendingUp} hue="#70B7FF" label="Investido" value={fmt(s.invest)} />
        <Kpi icon={PiggyBank} hue="#f59e0b" label="Guardado" value={fmt(s.saved)} />
        <Kpi icon={Gauge} hue="#3985CC" label="Renda utilizada" value={pc(s.percentUsed)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="card lg:col-span-3">
          <h3 className="mb-4 font-semibold">Resumo do mês</h3>
          {donut.length ? (
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative h-48 w-48 shrink-0">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={donut} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={2} stroke="none">
                      {donut.map((d) => <Cell key={d.name} fill={d.fill} />)}
                    </Pie>
                    <Tooltip formatter={money} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                  <div>
                    <p className="text-lg font-semibold">{fmt(s.expense)}</p>
                    <p className="muted text-xs">Total de gastos</p>
                  </div>
                </div>
              </div>
              <ul className="w-full space-y-2 text-sm">
                {donut.map((d) => (
                  <li key={d.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.fill }} />
                    <span className="flex-1">{d.name}</span>
                    <span className="muted w-14 text-right">{pc((d.used / s.expense) * 100)}</span>
                    <span className="w-24 text-right">{fmt(d.used)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="muted text-sm">Nenhuma despesa registrada neste mês.</p>
          )}
        </div>

        <div className="card lg:col-span-2">
          <h3 className="mb-4 font-semibold">Orçamentos</h3>
          {budgets.length === 0 && <p className="muted text-sm">Defina limites por categoria em Configurações.</p>}
          <div className="space-y-4">
            {budgets.map((c) => (
              <div key={c.id} className="text-sm">
                <div className="flex justify-between">
                  <span>{c.name}</span>
                  <span className={c.over ? 'text-red-400' : 'muted'}>{fmt(c.used)} / {fmt(c.limit)}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full" style={{ background: 'var(--surface)' }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(c.pct, 100)}%`, background: c.over ? '#f87171' : c.pct >= 80 ? '#f59e0b' : '#3985CC' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="btn-ghost btn mt-5 w-full" onClick={() => go('orc')}>Ver todos os orçamentos →</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="card lg:col-span-3">
          <h3 className="mb-3 font-semibold">Receitas e despesas · 6 meses</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={bars}>
                <XAxis dataKey="m" stroke="#8fa3bd" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8fa3bd" fontSize={12} width={54} tickLine={false} axisLine={false} />
                <Tooltip formatter={money} cursor={{ fill: 'rgba(57,133,204,.08)' }} />
                <Legend />
                <Bar dataKey="Receitas" fill="#34d399" radius={[6, 6, 0, 0]} barSize={14} />
                <Bar dataKey="Despesas" fill="#f87171" radius={[6, 6, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="mb-4 font-semibold">Como a renda foi usada</h3>
          {usageTotal > 0 ? (
            <>
              <div className="flex h-3 overflow-hidden rounded-full" style={{ background: 'var(--surface)' }}>
                {usage.filter((u) => u[1] > 0).map((u) => (
                  <div key={u[0]} title={u[0]} style={{ width: `${(u[1] / usageTotal) * 100}%`, background: u[2] }} />
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {usage.map((u) => (
                  <li key={u[0]} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: u[2] }} />
                    <span className="flex-1">{u[0]}</span>
                    <span className="muted">{fmt(u[1])}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="muted text-sm">Sem dados neste mês.</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="card lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Últimas transações</h3>
            <button className="btn-ghost btn !px-3 !py-1 text-xs" onClick={() => go('tx')}>Ver todas →</button>
          </div>
          {recent.length === 0 && <p className="muted text-sm">Nenhuma movimentação registrada.</p>}
          {recent.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 border-b py-2.5 text-sm last:border-0" style={{ borderColor: 'var(--line)' }}>
              <span className="min-w-0 truncate">
                {t.description} <span className="muted text-xs">{format(parseISO(t.date), 'dd/MM/yyyy')}</span>
              </span>
              <span className={`shrink-0 font-medium ${TONE[t.type]}`}>
                {t.type === 'income' ? '+' : t.type === 'transfer' ? '' : '−'}{fmt(t.amount)}
              </span>
            </div>
          ))}
        </div>

        <div className="card lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Nossas metas</h3>
            <button className="btn-ghost btn !px-3 !py-1 text-xs" onClick={() => go('plan')}>Ver todas →</button>
          </div>
          {goals.length === 0 && <p className="muted text-sm">Nenhuma meta ainda. Crie a primeira em Planos.</p>}
          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.id} className="text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">{g.name}</span>
                  <span className="muted">{g.pct.toFixed(0)}%</span>
                </div>
                <p className="muted text-xs">{fmt(g.accumulated)} / {fmt(g.target)}</p>
                <div className="mt-1.5 h-2 rounded-full" style={{ background: 'var(--surface)' }}>
                  <div className="h-2 rounded-full bg-[#3985CC] transition-all" style={{ width: `${g.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {[['tx', Plus, 'Adicionar transação'], ['cfg', Wallet, 'Criar orçamento'], ['plan', Target, 'Nova meta'], ['hist', BarChart3, 'Ver relatórios']].map(([id, Icon, text]) => (
          <button key={id} className="btn-ghost btn !rounded-full" onClick={() => go(id)}><Icon size={16} />{text}</button>
        ))}
      </div>
    </div>
  );
}