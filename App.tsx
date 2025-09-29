import { useMemo, useState } from "react"
import { Header } from "./components/Header"
import { Breadcrumbs } from "./components/Breadcrumbs"
import { Sidebar } from "./components/Sidebar"
import { DetailPane } from "./components/DetailPane"
import { SOLUTION_TREE, SolutionNode, SolutionDetail } from "./data/dummy"

export default function App() {
  const [activeId, setActiveId] = useState<string>("active-aerogel")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { detail, crumbs } = useMemo(() => {
    const stack: { id: string; label: string }[] = []
    let found: SolutionDetail | undefined
    function dfs(nodes: SolutionNode[], trail: { id: string; label: string }[]) {
      for (const n of nodes) {
        const next = [...trail, { id: n.id, label: n.label }]
        if ("children" in n) { dfs(n.children, next) }
        else if (n.id === activeId) { found = n.detail; stack.push(...next) }
      }
    }
    dfs(SOLUTION_TREE, [])
    return { detail: found!, crumbs: stack }
  }, [activeId])

  return (
    <div className="min-h-full">
      <Header userName="Manish" onToggleSidebar={() => setSidebarOpen(v => !v)} />
      <main className="grid md:grid-cols-[360px_1fr] gap-4 p-4">
        <div className="md:hidden">
          {sidebarOpen && (
            <>
              <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSidebarOpen(false)} />
              <aside className="fixed top-0 left-0 bottom-0 z-50 w-80 p-3 card overflow-auto">
                <h2 className="m-0 mb-3 border-b-4 border-brand-500 pb-2">Explore the Potential Solution of Your Problem</h2>
                <Sidebar tree={SOLUTION_TREE} activeId={activeId} onSelect={(id)=>{ setActiveId(id); setSidebarOpen(false) }} />
              </aside>
            </>
          )}
        </div>
        <aside className="hidden md:block card p-3 overflow-auto max-h-[calc(100vh-120px)]">
          <h2 className="m-0 mb-3 border-b-4 border-brand-500 pb-2">Explore the Potential Solution of Your Problem</h2>
          <Sidebar tree={SOLUTION_TREE} activeId={activeId} onSelect={setActiveId} />
        </aside>
        <section className="min-w-0">
          <div className="card p-3 md:p-4 min-h-[calc(100vh-120px)] grid grid-rows-[auto_1fr]">
            <header className="border-b border-slate-200 pb-2">
              <div className="text-slate-600 font-semibold">Description of Solution</div>
              <Breadcrumbs items={crumbs} onSelect={setActiveId} />
            </header>
            <DetailPane detail={detail} />
          </div>
        </section>
      </main>
    </div>
  )
}