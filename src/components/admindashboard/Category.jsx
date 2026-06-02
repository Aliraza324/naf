import React, { useEffect, useMemo, useState } from 'react'
import {
  ChevronDown,
  Edit2,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import Pagination from './Pagination'
import logo from '../../assets/images/logo.svg'

const Category = () => {
  const initialCategories = [
    {
      id: '#GT1024',
      name: 'Ballistics',
      subCategories: ['Armor', 'Ammunition', 'Explosives'],
      products: 128,
      enabled: true,
      image: logo,
    },
    {
      id: '#GT1037',
      name: 'Optics',
      subCategories: ['Red Dot', 'Thermal', 'Night Vision'],
      products: 84,
      enabled: true,
      image: logo,
    },
    {
      id: '#GT1051',
      name: 'Tactical Gear',
      subCategories: ['Vests', 'Helmets', 'Gloves'],
      products: 56,
      enabled: false,
      image: logo,
    },
    {
      id: '#GT1078',
      name: 'Communications',
      subCategories: ['Radios', 'Headsets', 'Satcom'],
      products: 37,
      enabled: true,
      image: logo,
    },
    {
      id: '#GT1093',
      name: 'Maintenance',
      subCategories: ['Cleaning Kits', 'Lubricants', 'Tools'],
      products: 64,
      enabled: true,
      image: logo,
    },
  ]

  const [categories, setCategories] = useState(initialCategories)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    const updateShowPagination = () => {
      const hash = window.location.hash.trim().toLowerCase()
      setShowPagination(hash === '#sym:pagination')
    }

    updateShowPagination()
    window.addEventListener('hashchange', updateShowPagination)
    return () => window.removeEventListener('hashchange', updateShowPagination)
  }, [])
  const [filters, setFilters] = useState({
    name: '',
    product: '',
    subCategory: '',
  })
  const [form, setForm] = useState({
    name: '',
    slug: '',
    subCategoryInput: '',
    subCategories: [],
  })

  const createSlug = (value) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesName = category.name.toLowerCase().includes(filters.name.toLowerCase())
      const matchesProducts =
        !filters.product || String(category.products).includes(filters.product.trim())
      const matchesSubCategory =
        !filters.subCategory ||
        category.subCategories.some((item) =>
          item.toLowerCase().includes(filters.subCategory.toLowerCase()),
        )

      return matchesName && matchesProducts && matchesSubCategory
    })
  }, [categories, filters])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm({
      name: '',
      slug: '',
      subCategoryInput: '',
      subCategories: ['BBS', 'Guns', 'smoke', 'BBS'],
    })
    setEditingIndex(null)
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (category) => {
    const categoryIndex = categories.indexOf(category)
    setEditingIndex(categoryIndex)
    setForm({
      name: category.name,
      slug: createSlug(category.name),
      subCategoryInput: '',
      subCategories: category.subCategories,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleNameChange = (event) => {
    const nextName = event.target.value
    setForm((prev) => ({
      ...prev,
      name: nextName,
      slug: createSlug(nextName),
    }))
  }

  const handleSubCategoryInput = (event) => {
    setForm((prev) => ({
      ...prev,
      subCategoryInput: event.target.value,
    }))
  }

  const addSubCategory = () => {
    const nextSubCategory = form.subCategoryInput.trim()

    if (!nextSubCategory) return

    setForm((prev) => ({
      ...prev,
      subCategoryInput: '',
      subCategories: [...prev.subCategories, nextSubCategory],
    }))
  }

  const removeSubCategory = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      subCategories: prev.subCategories.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleSubCategoryKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addSubCategory()
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextCategory = {
      id: editingIndex === null ? `#GT${Math.floor(1000 + Math.random() * 9000)}` : categories[editingIndex].id,
      name: form.name.trim() || 'Category Name',
      subCategories: form.subCategories.length ? form.subCategories : ['General'],
      products: editingIndex === null ? 0 : categories[editingIndex].products,
      enabled: editingIndex === null ? true : categories[editingIndex].enabled,
      image: logo,
    }

    if (editingIndex === null) {
      setCategories((prev) => [nextCategory, ...prev])
    } else {
      setCategories((prev) =>
        prev.map((category, index) => (index === editingIndex ? nextCategory : category)),
      )
    }

    closeModal()
  }

  const toggleCategory = (categoryToToggle) => {
    setCategories((prev) =>
      prev.map((category) =>
        category === categoryToToggle ? { ...category, enabled: !category.enabled } : category,
      ),
    )
  }

  const deleteCategory = (categoryToDelete) => {
    setCategories((prev) => prev.filter((category) => category !== categoryToDelete))
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-5 text-white sm:px-6 lg:px-4">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-white">Categorizes list</h1>
          <p className="mt-1 text-sm text-neutral-500">Global operations overview</p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(239,68,68,0.38)] transition hover:bg-red-700 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Categorizes
        </button>
      </div>

      <div className="mt-7 rounded-lg border border-white/10 bg-[#141414] p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.85fr_auto]">
          <label className="flex min-h-12 items-center gap-3 rounded border border-white/10 bg-[#111111] px-4 transition focus-within:border-neutral-600">
            <Search className="h-5 w-5 shrink-0 text-neutral-500" />
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              placeholder="Search by Name"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </label>

          <label className="flex min-h-12 items-center gap-3 rounded border border-white/10 bg-[#111111] px-4 transition focus-within:border-neutral-600">
            <Search className="h-5 w-5 shrink-0 text-neutral-500" />
            <input
              type="text"
              name="product"
              value={filters.product}
              onChange={handleFilterChange}
              placeholder="Search by Produts"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </label>

          <label className="flex min-h-12 items-center gap-3 rounded border border-white/10 bg-[#111111] px-4 transition focus-within:border-neutral-600">
            <input
              type="text"
              name="subCategory"
              value={filters.subCategory}
              onChange={handleFilterChange}
              placeholder="Search by Sub Categories"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500" />
          </label>

          <button
            type="button"
            className="min-h-12 rounded bg-red-600 px-9 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-hidden border border-white/5 bg-[#111111] rounded-lg">
        <div className="flex flex-col gap-3 border-b border-white/5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-white">All Categorizes</h2>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
              LOG_FEED: LIVE
            </p>
          </div>
          <button type="button" className="w-fit text-sm text-neutral-500 transition hover:text-white">
            View All Logs
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                <th className="px-6 py-4 font-semibold">Categorizes ID</th>
                <th className="px-6 py-4 font-semibold">Categorizes Name</th>
                <th className="px-6 py-4 font-semibold">Sub Categorizes</th>
                <th className="px-6 py-4 font-semibold">Products</th>
                <th className="px-6 py-4 font-semibold">Enable / Disable</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredCategories.map((category, index) => (
                <tr
                  key={`${category.id}-${index}`}
                  className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={category.image}
                        alt=""
                        className="h-10 w-10 rounded-full object-contain"
                      />
                      <span className="font-medium text-neutral-300">{category.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-medium text-neutral-300">{category.name}</td>
                  <td className="px-6 py-5 font-medium text-neutral-300">
                    {category.subCategories.length}
                  </td>
                  <td className="px-6 py-5 font-medium text-neutral-300">{category.products}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-white">
                        {category.enabled ? 'Enable' : 'Disable'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCategory(category)}
                        aria-label={`${category.enabled ? 'Disable' : 'Enable'} ${category.name}`}
                        className={`relative h-7 w-12 rounded-full transition ${category.enabled ? 'bg-[#73d84a]' : 'bg-neutral-700'
                          }`}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${category.enabled ? 'left-6' : 'left-1'
                            }`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-5">
                      <button
                        type="button"
                        onClick={() => openEditModal(category)}
                        aria-label={`Edit ${category.name}`}
                        className="text-white transition hover:text-red-500"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategory(category)}
                        aria-label={`Delete ${category.name}`}
                        className="text-white transition hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCategories.length === 0 && (
          <div className="px-6 py-10 text-center text-sm text-neutral-500">
            No categorizes found.
          </div>
        )}
      </div>

      {showPagination && <Pagination />}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-[2px]">
          <div className="w-full max-w-[470px] overflow-hidden rounded-[14px] bg-[#202020] shadow-2xl">
            <div className="relative flex items-center justify-center bg-[#151515] px-6 py-5">
              <h3 className="text-base font-bold text-white">Add / Edit Category</h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close category form"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white transition hover:text-red-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-7">
              <p className="text-xs font-semibold text-neutral-500">
                Add Category image or a name of Category
              </p>

              <div className="mt-5 space-y-4">
                <input
                  type="text"
                  value={form.name}
                  onChange={handleNameChange}
                  placeholder="Category Name"
                  className="h-12 w-full rounded-lg border border-transparent bg-[#2b2b2b] px-5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-red-500/60"
                />

                <input
                  type="text"
                  value={form.slug}
                  readOnly
                  placeholder="Slug (auto-generated)"
                  className="h-12 w-full rounded-lg border border-transparent bg-[#2b2b2b] px-5 text-sm text-slate-400 outline-none placeholder:text-slate-400"
                />

                <div className="flex h-12 overflow-hidden rounded-lg bg-[#2b2b2b]">
                  <input
                    type="text"
                    value={form.subCategoryInput}
                    onChange={handleSubCategoryInput}
                    onKeyDown={handleSubCategoryKeyDown}
                    placeholder="Sub Category"
                    className="min-w-0 flex-1 border border-transparent bg-transparent px-5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-red-500/60"
                  />
                  <button
                    type="button"
                    onClick={addSubCategory}
                    className="m-1.5 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Add
                  </button>
                </div>

                <div className="flex min-h-[54px] flex-wrap items-center gap-2 rounded-lg bg-[#2b2b2b] px-3 py-3">
                  {form.subCategories.map((subCategory, index) => (
                    <span
                      key={`${subCategory}-${index}`}
                      className="inline-flex h-7 items-center gap-2 rounded border border-white/10 bg-[#303336] px-3 text-xs text-slate-300"
                    >
                      {subCategory}
                      <button
                        type="button"
                        onClick={() => removeSubCategory(index)}
                        aria-label={`Remove ${subCategory}`}
                        className="text-slate-400 transition hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 h-12 w-full rounded bg-gradient-to-r from-red-600 to-red-800 text-base font-semibold text-white transition hover:from-red-500 hover:to-red-700"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Category
