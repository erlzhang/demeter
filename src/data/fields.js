import CATEGORIES from '@/data/categories'

const fields = {
  page: {
    uid: {
      required: true,
      mutable: false,
      type: "string",
      unique: true
    },
    slug: {
      required: true,
      mutable: true,
      type: "string"
    },
    title: {
      required: true,
      mutable: true,
      type: "string"
    },
    content: {
      required: true,
      mutable: true,
      type: "markdown"
    },
    type: {
      required: true,
      mutable: false,
      type: "string"
    }
  },
  post: {
    datetime: {
      required: true,
      mutable: false,
      type: "datetime"
    },
    published: {
      mutable: false,
      type: "boolean"
    },
    keywords: {
      mutable: true,
      type: "string"
    },
    description: {
      mutable: true,
      type: "string"
    },
    category: {
      required: true,
      mutable: true,
      type: "range",
      range: CATEGORIES
    }
  }
}

export default fields
