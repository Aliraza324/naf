import React, { useRef } from 'react'
import {
  Bold,
  Check,
  CircleDot,
  FileText,
  Image,
  Italic,
  Link,
  List,
  Plus,
  Search,
  Send,
  ShoppingCart,
  SlidersHorizontal,
  Users,
} from 'lucide-react'

const products = [
  {
    name: 'Vortex Elite V4',
    sku: 'VT-EL-2024',
    stock: 'High Stock',
    tone: 'text-emerald-400',
    selected: true,
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Sentinel Carrier MK3',
    sku: 'ST-C3-0012',
    stock: 'Low Stock (22)',
    tone: 'text-yellow-400',
    selected: false,
    image: 'https://images.unsplash.com/photo-1601924357840-3e50ad4dd9fd?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Nomad Grip Gloves',
    sku: 'NM-GO-29',
    stock: 'High Stock',
    tone: 'text-emerald-400',
    selected: false,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=160&q=80',
  },
  {
    name: 'Lumen X Beam',
    sku: 'LX-BM-92',
    stock: 'Out Of Stock',
    tone: 'text-red-500',
    selected: false,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=160&q=80',
  },
]

const placeholders = ['{DealerName}', '{ProductName}', '{StockCount}', '{OrderLink}']

const defaultMessage = `Dear {DealerName},

We are excited to announce the immediate availability of the {ProductName}. As one of our premier partners, you have early access to restock your inventory before the national marketing push. {StockCount} units are currently reserved for your account.

Click the link below to secure your allocation.
Regards,
NAF Supply Command`

const CreateCampaign = () => {
  const editorRef = useRef(null)

  const runEditorCommand = (command, value = null) => {
    if (command === 'createLink') {
      const url = window.prompt('Enter link URL')
      if (!url) return
      editorRef.current?.focus()
      document.execCommand(command, false, url)
      return
    }

    editorRef.current?.focus()
    document.execCommand(command, false, value)
  }

  const handleEditorButtonMouseDown = (event, command) => {
    event.preventDefault()
    runEditorCommand(command)
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-5 text-white sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <button
            type="button"
            aria-label="Campaign filters"
            className="mt-1 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#080808] text-neutral-400"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-white sm:text-3xl">
              Create New Campaign
            </h1>
            <p className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              Operation: Outreach Alpha
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="h-11 rounded-[7px] border border-white/10 bg-black px-7 text-[11px] font-black uppercase tracking-[0.08em] text-white transition hover:bg-white/5"
          >
            Save Draft
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[7px] bg-red-600 px-7 text-[11px] font-black uppercase tracking-[0.08em] text-white shadow-[0_0_24px_rgba(239,68,68,0.36)] transition hover:bg-red-700"
          >
            <Send className="h-3.5 w-3.5" />
            Send Campaign
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-[10px] border border-white/7 bg-[#141414] p-5 sm:p-7">
            <div className="flex items-center gap-3 border-b border-white/6 pb-5">
              <ShoppingCart className="h-4 w-4 text-red-500" />
              <h2 className="text-sm font-black uppercase tracking-[0.13em]">01. Campaign Basics</h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-neutral-500">
                  Campaign Name
                </span>
                <input
                  type="text"
                  placeholder="e.g. Vortex Elite Launch Q3"
                  className="h-12 rounded-[7px] border border-white/8 bg-[#080808] px-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-red-500/60"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-neutral-500">
                  Campaign Type
                </span>
                <select className="h-12 rounded-[7px] border border-white/8 bg-[#080808] px-4 text-sm text-white outline-none focus:border-red-500/60">
                  <option>New Product Launch</option>
                  <option>Low Stock Alert</option>
                  <option>Promotion</option>
                  <option>System Update</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-[10px] border border-white/7 bg-[#141414] p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <CircleDot className="h-4 w-4 fill-red-500 text-red-500" />
                <h2 className="text-sm font-black uppercase tracking-[0.13em]">Select Products</h2>
              </div>
              <label className="flex h-9 w-full items-center gap-2 rounded-[5px] border border-white/8 bg-[#080808] px-3 sm:w-[210px]">
                <Search className="h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-neutral-500"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <button
                  key={product.name}
                  type="button"
                  className={`relative flex min-h-[86px] items-center gap-4 rounded-[9px] border bg-[#0b0b0b] p-4 text-left transition hover:border-red-500/40 ${
                    product.selected ? 'border-red-600' : 'border-white/6'
                  }`}
                >
                  <img
                    src={product.image}
                    alt=""
                    className="h-14 w-16 rounded-[6px] object-cover brightness-75"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-white">{product.name}</p>
                    <p className={`mt-1 text-[10px] font-black uppercase ${product.tone}`}>
                      {product.stock}
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-600">SKU: {product.sku}</p>
                  </div>
                  {product.selected && (
                    <span className="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-[4px] bg-red-600">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[10px] border border-white/7 bg-[#141414] p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Plus className="h-4 w-4 text-red-500" />
                <h2 className="text-sm font-black uppercase tracking-[0.13em]">03. Message Composer</h2>
              </div>
              <button
                type="button"
                className="h-8 rounded-[5px] border border-white/8 bg-white/5 px-4 text-[10px] font-black uppercase tracking-[0.08em] text-neutral-400"
              >
                Preview Email
              </button>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="mr-2 text-[10px] font-black uppercase tracking-[0.12em] text-neutral-500">
                  Placeholders:
                </span>
                {placeholders.map((item) => (
                  <span
                    key={item}
                    className="rounded-[4px] border border-red-500/20 bg-red-500/5 px-2 py-1 text-[9px] text-red-400"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="overflow-hidden rounded-[7px] border border-white/8 bg-[#070707]">
                <div className="flex h-10 items-center gap-4 border-b border-white/8 bg-[#181818] px-4 text-neutral-400">
                  <button
                    type="button"
                    onMouseDown={(event) => handleEditorButtonMouseDown(event, 'bold')}
                    aria-label="Bold selected text"
                    className="grid h-7 w-7 place-items-center rounded-[4px] transition hover:bg-white/10 hover:text-white"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(event) => handleEditorButtonMouseDown(event, 'italic')}
                    aria-label="Italic selected text"
                    className="grid h-7 w-7 place-items-center rounded-[4px] transition hover:bg-white/10 hover:text-white"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(event) => handleEditorButtonMouseDown(event, 'createLink')}
                    aria-label="Add link"
                    className="grid h-7 w-7 place-items-center rounded-[4px] transition hover:bg-white/10 hover:text-white"
                  >
                    <Link className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(event) => handleEditorButtonMouseDown(event, 'insertUnorderedList')}
                    aria-label="Bullet list"
                    className="grid h-7 w-7 place-items-center rounded-[4px] transition hover:bg-white/10 hover:text-white"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Image"
                    className="grid h-7 w-7 place-items-center rounded-[4px] transition hover:bg-white/10 hover:text-white"
                  >
                    <Image className="h-4 w-4" />
                  </button>
                </div>
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="min-h-[260px] w-full overflow-y-auto bg-[#070707] p-6 text-sm leading-6 text-neutral-300 outline-none focus:text-white [&_a]:text-red-400 [&_a]:underline [&_b]:text-white [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5"
                >
                  {defaultMessage.split('\n').map((line, index) => (
                    <React.Fragment key={`${line}-${index}`}>
                      {line}
                      {index < defaultMessage.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[10px] border border-white/7 bg-[#141414] p-5 sm:p-7 xl:sticky xl:top-6">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-red-500" />
              <h2 className="text-sm font-black uppercase tracking-[0.13em]">04. Recipients</h2>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                className="flex min-h-[70px] items-center gap-4 rounded-[8px] border border-red-600 bg-red-600/5 px-4 text-left"
              >
                <CircleDot className="h-4 w-4 fill-red-600 text-red-600" />
                <span>
                  <span className="block text-xs font-black uppercase tracking-[0.08em] text-white">
                    Select All Dealers
                  </span>
                  <span className="mt-1 block text-[10px] text-neutral-500">
                    Target 2,450 accounts globally
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="flex min-h-[70px] items-center gap-4 rounded-[8px] border border-white/7 bg-[#0b0b0b] px-4 text-left"
              >
                <span className="h-4 w-4 rounded-full border border-neutral-500" />
                <span>
                  <span className="block text-xs font-black uppercase tracking-[0.08em] text-white">
                    Manually Select
                  </span>
                  <span className="mt-1 block text-[10px] text-neutral-500">
                    Pick individual dealers from list
                  </span>
                </span>
              </button>
            </div>

            <div className="mt-8 rounded-[10px] bg-black p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-600/15 text-red-500">
                <Users className="h-6 w-6" />
              </div>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                Audience Estimator
              </p>
              <p className="mt-3 text-3xl font-black text-white">2,450</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                Verified Recipients
              </p>
              <div className="mx-auto mt-7 h-1 w-[78%] rounded-full bg-red-600" />
              <p className="mt-5 text-[10px] italic text-neutral-600">Estimated delivery: Instant</p>
            </div>

            <div className="mt-7">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-500">
                Campaign Summary
              </p>
              <div className="mt-4 grid gap-3 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-500">Type:</span>
                  <span className="font-bold text-white">Product Launch</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-500">Featured Items:</span>
                  <span className="font-bold text-white">1 Product</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-500">Estimated Reach:</span>
                  <span className="font-bold text-emerald-400">High</span>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}

export default CreateCampaign
