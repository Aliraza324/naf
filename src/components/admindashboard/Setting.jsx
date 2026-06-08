import React, { useRef, useState } from 'react'
import {
  AlignJustify,
  Bold,
  FileImage,
  Italic,
  Link,
  List,
  Plus,
  Redo2,
  Save,
  Trash2,
  Upload,
} from 'lucide-react'

const tabs = [
  {
    group: 'Static Content',
    items: [
      { id: 'banners', label: 'Banner Management', meta: 'Last updated 2 days ago' },
    ],
  },
  {
    group: 'Legal Pages',
    items: [
      { id: 'terms', label: 'Terms & Conditions', meta: 'Edited 1 hour ago', live: true },
      { id: 'privacy', label: 'Privacy Policy', meta: 'Last updated 2 days ago', live: true },
    ],
  },
]

const banners = [
  { title: 'Home Page Hero', size: '1920x800 px', updated: 'Last updated: 2 days ago' },
  { title: 'New Drops', size: '1920x450 px', updated: 'Last updated: 5 days ago' },
  { title: 'Blog', size: '1920x450 px', updated: 'Last updated: 5 days ago' },
  { title: 'Contact Us', size: '1920x800 px', updated: 'Last updated: 2 days ago' },
  { title: 'Blog Details', size: '1920x450 px', updated: 'Last updated: 5 days ago' },
  { title: 'Main Pop Up Banner', size: '1920x450 px', updated: 'Last updated: 5 days ago' },
]

const socialLinks = [
  ['Facebook Profile', 'https://facebook.com/nafsupply', 'Test Link'],
  ['Twitter/X', 'https://x.com/username', 'Test Link'],
  ['Youtube Channel', 'https://youtube.com/c/nafsupplyofficial', 'Test Link'],
  ['Instagram Handle', '@naf_supply_tactical', 'Verify'],
  ['LinkedIn Company', 'https://linkedin.com/company/naf-supply', 'Verified'],
]

const legalCopy = {
  terms: {
    title: 'Terms & Conditions',
    note: 'OPERATIONAL NOTE: Last comprehensive system audit of this protocol was performed on October 12, 2024.',
  },
  privacy: {
    title: 'Privacy Policy',
    note: 'OPERATIONAL NOTE: Last comprehensive system audit of this protocol was performed on October 12, 2024.',
  },
}

const Setting = () => {
  const [activeTab, setActiveTab] = useState('banners')
  const [, setSavedContent] = useState({})
  const [saveStatus, setSaveStatus] = useState('')
  const [activeTool, setActiveTool] = useState('')
  const editorRef = useRef(null)
  const activeLegal = legalCopy[activeTab]

  const getToolButtonClass = (toolKey, extraClasses = '') =>
    `grid h-7 place-items-center rounded-[5px] text-white transition hover:bg-red-500/20 hover:text-red-300 ${activeTool === toolKey
      ? 'bg-red-500/25 text-red-300 shadow-[0_0_16px_rgba(239,68,68,0.2)]'
      : 'hover:bg-white/10'
    } ${extraClasses}`

  const applyBlockFormat = (tagName) => {
    const editor = editorRef.current
    const selection = window.getSelection()

    if (!editor || !selection?.rangeCount) return

    const anchorNode = selection.anchorNode
    const anchorElement =
      anchorNode?.nodeType === Node.TEXT_NODE ? anchorNode.parentElement : anchorNode
    const currentBlock = anchorElement?.closest?.('h1,h2,h3,p,div,li,blockquote')

    if (!currentBlock || !editor.contains(currentBlock) || currentBlock === editor) return

    const formattedBlock = document.createElement(tagName)
    formattedBlock.innerHTML = currentBlock.innerHTML
    currentBlock.replaceWith(formattedBlock)

    const range = document.createRange()
    range.selectNodeContents(formattedBlock)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  const formatEditorText = (command, value = null) => {
    if (document.activeElement !== editorRef.current) {
      editorRef.current?.focus()
    }

    if (command === 'formatBlock') {
      const blockValue = `<${value}>`
      const didApply = document.execCommand(command, false, blockValue)

      if (!didApply) {
        applyBlockFormat(value)
      }

      return
    }

    document.execCommand(command, false, value)
  }

  const handleToolbarMouseDown = (event, command, value = null) => {
    event.preventDefault()
    setActiveTool(value || command)
    formatEditorText(command, value)
  }

  const saveEditorContent = () => {
    const html = editorRef.current?.innerHTML || ''
    setSavedContent((previousContent) => ({
      ...previousContent,
      [activeTab]: html,
    }))
    setActiveTool('save')
    setSaveStatus('Saved')
    window.setTimeout(() => setSaveStatus(''), 1500)
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-5 text-white lg:h-[calc(100vh-120px)] lg:grid-cols-[260px_minmax(0,1fr)] lg:overflow-hidden lg:px-6">
      <aside className="h-fit max-h-[430px] overflow-y-auto rounded-[20px] bg-[#141414] p-4 sm:p-5 lg:sticky lg:top-5 lg:h-[430px]">
        {tabs.map((section) => (
          <div key={section.group} className="mb-6 last:mb-0">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
              {section.group}
            </p>
            <div className="grid gap-2">
              {section.items.map((item) => {
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`rounded-[10px] border p-3 text-left transition ${isActive
                        ? 'border-red-500/45 bg-red-500/8 shadow-[0_0_28px_rgba(239,68,68,0.22)]'
                        : 'border-transparent hover:bg-white/4'
                      }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-white">{item.label}</span>
                      {isActive && item.live && (
                        <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-black uppercase text-white">
                          Live
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block text-xs text-slate-500">{item.meta}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </aside>

      <section className="min-w-0 lg:overflow-y-auto lg:pr-1">
        {activeTab === 'banners' && (
          <div className="space-y-6">
            <section className="rounded-[10px] bg-[#141414] p-5 sm:p-7">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-[5px] bg-red-500/12 text-red-500">
                    <FileImage className="h-4 w-4" />
                  </span>
                  <h2 className="text-base font-black uppercase tracking-[0.08em]">
                    Banner Management
                  </h2>
                </div>
                <button className="inline-flex h-10 items-center justify-center gap-2 rounded-[6px] bg-red-600 px-5 text-xs font-black uppercase text-white transition hover:bg-red-700">
                  <Plus className="h-4 w-4" />
                  Add Banner
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {banners.map((banner) => (
                  <article
                    key={banner.title}
                    className="overflow-hidden rounded-[7px] border border-white/8 bg-[#0b0b0b]"
                  >
                    <div className="relative h-24 bg-[linear-gradient(90deg,rgba(0,0,0,0.8),rgba(0,0,0,0.18)),url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center">
                      <div className="absolute right-3 top-3 flex gap-2">
                        <button className="grid h-7 w-7 place-items-center rounded bg-black/70 text-white">
                          <Upload className="h-3.5 w-3.5" />
                        </button>
                        <button className="grid h-7 w-7 place-items-center rounded bg-black/70 text-white">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.06em] text-white">
                        {banner.title}
                      </h3>
                      <p className="mt-2 text-[10px] text-slate-500">{banner.updated}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[9px] font-black uppercase text-emerald-400">
                          Active
                        </span>
                        <span className="text-[9px] text-slate-500">{banner.size}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[10px] bg-[#141414] p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-[5px] bg-red-500/12 text-red-500">
                  <Link className="h-4 w-4" />
                </span>
                <h2 className="text-base font-black uppercase tracking-[0.08em]">
                  Social Media Links
                </h2>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {socialLinks.map(([label, value, action]) => (
                  <label key={label} className="grid gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                      {label}
                    </span>
                    <span className="flex gap-2">
                      <input
                        defaultValue={value}
                        className="h-10 min-w-0 flex-1 rounded-[5px] border border-white/8 bg-black px-3 text-xs text-white outline-none focus:border-red-500/60"
                      />
                      <button
                        type="button"
                        className={`h-10 rounded-[5px] border px-4 text-[10px] font-black uppercase ${action === 'Verified'
                            ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-400'
                            : 'border-white/8 text-slate-400'
                          }`}
                      >
                        {action}
                      </button>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeLegal && (
          <div className="space-y-5">
            <section className="rounded-[10px] bg-[#171717] p-5 sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
                Page Title
              </p>
              <h1 className="mt-3 text-xl font-black uppercase text-white sm:text-2xl">
                {activeLegal.title}
              </h1>
            </section>

            <section className="overflow-hidden rounded-[10px] bg-[#070707]">
              <div className="flex flex-wrap items-center gap-4 bg-[#1b1b1b] px-5 py-3 text-white">
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'bold')}
                  className={getToolButtonClass('bold', 'w-7')}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'italic')}
                  className={getToolButtonClass('italic', 'w-7')}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'justifyFull')}
                  className={getToolButtonClass('justifyFull', 'w-7')}
                  title="Justify text"
                >
                  <AlignJustify className="h-4 w-4" />
                </button>
                <span className="h-5 w-px bg-white/10" />
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'formatBlock', 'h1')}
                  className={getToolButtonClass('h1', 'min-w-7 px-2 text-sm font-bold')}
                  title="Heading 1"
                >
                  1
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'formatBlock', 'h2')}
                  className={getToolButtonClass('h2', 'min-w-7 px-2 text-sm font-bold')}
                  title="Heading 2"
                >
                  2
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'formatBlock', 'blockquote')}
                  className={getToolButtonClass('blockquote', 'min-w-7 px-2 text-sm font-bold')}
                  title="Quote"
                >
                  9
                </button>
                <span className="h-5 w-px bg-white/10" />
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'insertUnorderedList')}
                  className={getToolButtonClass('insertUnorderedList', 'w-7')}
                  title="Bullet list"
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={saveEditorContent}
                  className={getToolButtonClass('save', 'w-7')}
                  title="Save"
                >
                  <Save className="h-4 w-4" />
                </button>
                <span className="h-5 w-px bg-white/10" />
                <button
                  type="button"
                  onMouseDown={(event) => handleToolbarMouseDown(event, 'redo')}
                  className={getToolButtonClass('redo', 'w-7')}
                  title="Redo"
                >
                  <Redo2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={saveEditorContent}
                  className="ml-auto rounded-[6px] bg-red-500 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.08em] text-white transition hover:bg-red-600"
                >
                  {saveStatus || 'Save Progress'}
                </button>
              </div>

              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="mx-auto max-w-2xl px-5 py-8 text-slate-400 outline-none focus:ring-0 sm:px-8 [&_blockquote]:border-l-4 [&_blockquote]:border-red-500 [&_blockquote]:bg-red-500/10 [&_blockquote]:p-4 [&_blockquote]:text-red-300 [&_h1]:text-2xl [&_h1]:font-black [&_h1]:uppercase [&_h1]:text-white [&_h2]:text-xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:text-white [&_li]:leading-6 [&_ul]:list-disc [&_ul]:pl-6"
              >
                <h2 className="text-xl font-black uppercase text-white">1. Introduction</h2>
                <p className="mt-5 text-sm leading-7 sm:text-base">
                  Welcome to the NAF Tactical Supply CMS. These Terms & Conditions govern your
                  operational use of the content distribution platform. By accessing this editor,
                  you agree to comply with all security protocols and organizational standards for
                  tactical data management.
                </p>

                <h2 className="mt-9 text-xl font-black uppercase text-white">2. Use Of Content</h2>
                <p className="mt-5 text-sm leading-7 sm:text-base">
                  All operational assets managed via this nexus remain the sole intellectual
                  property of NAF Tactical. Internal operators are granted restricted access for the
                  purpose of maintaining inventory accuracy and public-facing catalog synchronization.
                </p>
                <ul className="mt-6 grid gap-3 pl-6 text-sm leading-6 sm:text-base">
                  <li>Operators must not compromise secure metadata during the drafting process.</li>
                  <li>Asset descriptions must match official tactical specifications (TS-900).</li>
                  <li>
                    Synchronized changes must be audited by Level 5 Administrators before live
                    deployment.
                  </li>
                </ul>

                <div className="mt-8 border-l-4 border-red-500 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                  <span className="font-black uppercase">Operational Note:</span> {activeLegal.note}
                </div>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  )
}

export default Setting
