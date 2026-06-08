import React, { useEffect, useMemo, useState } from 'react'
import {
  ChevronDown,
  Edit2,
  Plus,
  Search,
  X,
} from 'lucide-react'
import Pagination from './Pagination'
import logo from '../../assets/images/logo.svg'
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
} from '../../hooks/admin/useCategory'

const Category = () => {
  const { data: apiCategories = [], isLoading } = useAdminCategories()
  const createCategoryMutation = useCreateCategory()
  const updateCategoryMutation = useUpdateCategory()
  const isSaving = createCategoryMutation.isPending || updateCategoryMutation.isPending
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [showPagination, setShowPagination] = useState(false)

  useEffect(() => {
    if (apiCategories) {
      const mappedCategories = apiCategories.map((cat, index) => ({
        id: cat.id || cat._id,
        displayId: cat.id || cat._id || `#CAT${1000 + index}`,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon || '',
        description: cat.description || '',
        color: cat.color || '#000000',
        order: cat.order ?? index,
        subCategories: cat.subCategories?.map(sub => ({
          name: sub.name,
          order: sub.order ?? 0,
          children: sub.children || []
        })) || [],
        products: cat.productsCount || 0,
        enabled: cat.isActive !== false,
        image: logo,
      }))
      setCategories(mappedCategories)
    }
  }, [apiCategories])

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
    category: '',
  })
  const [form, setForm] = useState({
    name: '',
    slug: '',
    subCategoryInput: '',
    subCategories: [],
  })
  const [subCategoryChildInputs, setSubCategoryChildInputs] = useState({})

  const createSlug = (value) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesName = category.name?.toLowerCase().includes(filters.name.toLowerCase())
      const matchesProducts =
        !filters.product || String(category.products).includes(filters.product.trim())
      const matchesCategory =
        !filters.category || category.name?.toLowerCase() === filters.category.toLowerCase()

      return matchesName && matchesProducts && matchesCategory
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
      subCategories: [],
    })
    setSubCategoryChildInputs({})
    setEditingCategoryId(null)
  }

  const openAddModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const openEditModal = (category) => {
    setEditingCategoryId(category.id)
    setForm({
      name: category.name,
      slug: category.slug || createSlug(category.name),
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
      subCategories: [...prev.subCategories, { name: nextSubCategory, children: [] }],
    }))
  }

  const removeSubCategory = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      subCategories: prev.subCategories.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleSubCategoryChildInput = (index, value) => {
    setSubCategoryChildInputs((prev) => ({ ...prev, [index]: value }))
  }

  const addSubSubCategory = (subCatIndex) => {
    const value = subCategoryChildInputs[subCatIndex]?.trim()
    if (!value) return
    setForm((prev) => {
      const nextSubCategories = [...prev.subCategories]
      nextSubCategories[subCatIndex] = {
        ...nextSubCategories[subCatIndex],
        children: [...(nextSubCategories[subCatIndex].children || []), value],
      }
      return { ...prev, subCategories: nextSubCategories }
    })
    setSubCategoryChildInputs((prev) => ({ ...prev, [subCatIndex]: '' }))
  }

  const removeSubSubCategory = (subCatIndex, childIndex) => {
    setForm((prev) => {
      const nextSubCategories = [...prev.subCategories]
      nextSubCategories[subCatIndex] = {
        ...nextSubCategories[subCatIndex],
        children: nextSubCategories[subCatIndex].children.filter((_, i) => i !== childIndex),
      }
      return { ...prev, subCategories: nextSubCategories }
    })
  }

  const handleSubCategoryKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      addSubCategory()
    }
  }

  const normalizeSubCategories = (subCategories) =>
    subCategories.map((subCategory, index) => ({
      name: subCategory.name,
      order: subCategory.order ?? index,
      children: subCategory.children || [],
    }))

  const handleSubmit = async (event) => {
    event.preventDefault()

    const existingCategory = categories.find((category) => category.id === editingCategoryId)
    const categoryName = form.name.trim()
    const categorySlug = form.slug || createSlug(categoryName)

    if (!categoryName || !categorySlug) return

    const payload = {
      name: categoryName,
      slug: categorySlug,
      icon: existingCategory?.icon || '',
      description: existingCategory?.description || '',
      color: existingCategory?.color || '#000000',
      order: existingCategory?.order ?? categories.length,
      isActive: existingCategory?.enabled ?? true,
      subCategories: normalizeSubCategories(form.subCategories),
    }

    try {
      let response

      if (editingCategoryId === null) {
        response = await createCategoryMutation.mutateAsync(payload)
      } else {
        response = await updateCategoryMutation.mutateAsync({
          id: editingCategoryId,
          data: payload,
        })
      }

      if (response?.success) closeModal()
    } catch (error) {
      console.error('Save category error:', error)
    }
  }

  const toggleCategory = (categoryToToggle) => {
    if (!categoryToToggle.id) return

    updateCategoryMutation.mutate({
      id: categoryToToggle.id,
      data: { isActive: !categoryToToggle.enabled },
    })
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
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#111111] text-neutral-400">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.displayId} value={cat.name} className="bg-[#111111] text-white">
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 pointer-events-none" />
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
                  key={`${category.displayId}-${index}`}
                  className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
                >
                 
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
                        disabled={updateCategoryMutation.isPending}
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isLoading && (
          <div className="px-6 py-10 text-center text-sm text-neutral-500">
            Loading categorizes...
          </div>
        )}

        {!isLoading && filteredCategories.length === 0 && (
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
                  required
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
                    placeholder="New Sub Category Name"
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

                <div className="flex flex-col gap-3 max-h-[35vh] overflow-y-auto pr-1">
                  {form.subCategories.map((subCategory, index) => (
                    <div key={index} className="rounded-lg bg-[#2b2b2b] p-3 border border-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-white">{subCategory.name}</span>
                        <button
                          type="button"
                          onClick={() => removeSubCategory(index)}
                          className="text-red-500 hover:text-red-400 text-xs"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex h-10 overflow-hidden rounded-md bg-[#1a1a1a]">
                        <input
                          type="text"
                          value={subCategoryChildInputs[index] || ''}
                          onChange={(e) => handleSubCategoryChildInput(index, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addSubSubCategory(index)
                            }
                          }}
                          placeholder={`Add sub-sub-category to ${subCategory.name}`}
                          className="min-w-0 flex-1 border-none bg-transparent px-4 text-xs text-white outline-none placeholder:text-slate-500"
                        />
                        <button
                          type="button"
                          onClick={() => addSubSubCategory(index)}
                          className="m-1 rounded bg-neutral-700 px-3 text-xs font-semibold text-white transition hover:bg-neutral-600"
                        >
                          Add
                        </button>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {subCategory.children?.map((child, cIndex) => (
                          <span
                            key={cIndex}
                            className="inline-flex h-6 items-center gap-1.5 rounded border border-white/10 bg-[#303336] px-2 text-[10px] text-slate-300"
                          >
                            {child}
                            <button
                              type="button"
                              onClick={() => removeSubSubCategory(index, cIndex)}
                              className="text-slate-400 transition hover:text-white"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving || !form.name.trim()}
                className="mt-7 h-12 w-full rounded bg-gradient-to-r from-red-600 to-red-800 text-base font-semibold text-white transition hover:from-red-500 hover:to-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : editingCategoryId === null ? 'Add' : 'Update'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Category
