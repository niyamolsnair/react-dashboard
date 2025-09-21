import { create } from "zustand"
import { nanoid } from "nanoid"

export const useDashboardStore = create((set, get) => ({
  categories: [],

  setInitialData: data => set({ categories: data.categories }),

  addCategory: name =>
    set(state => ({
      categories: [
        ...state.categories,
        { id: nanoid(), name, widgets: [] }
      ]
    })),

  removeCategory: categoryId =>
    set(state => ({
      categories: state.categories.filter(cat => cat.id !== categoryId)
    })),

  addWidget: (categoryId, title, text) =>
    set(state => ({
      categories: state.categories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              widgets: [
                ...cat.widgets,
                { id: nanoid(), title, text }
              ]
            }
          : cat
      )
    })),

  removeWidget: (categoryId, widgetId) =>
    set(state => ({
      categories: state.categories.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              widgets: cat.widgets.filter(w => w.id !== widgetId)
            }
          : cat
      )
    }))
}))
