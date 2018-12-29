const fields = {
  page: {
    uid: {
      required: true,
      mutable: false,
      type: String,
      unique: true
    },
    slug: {
      required: true,
      mutable: true,
      type: String,
      unique: "partial"
    },
    title: {
      required: true,
      mutable: true,
      type: String
    },
    content: {
      required: true,
      mutable: true,
      type: Markdown
    },
    type: {
      required: true,
      mutable: false,
      type: String
    }
  },
  post: {
    datetime: {
      required: true,
      mutable: true,
      type: DateTime
    },
    published: {
      mutable: true,
      type: Boolearn
    },
    ref: {
      required: true,
      mutable: true,
      type: String
    },
    locale: {
      required: true,
      mutable: true,
      type: String,
      range: ["zh", "en"],
      default: "zh"
    },
    keywords: {
      mutable: true,
      type: String
    },
    description: {
      mutable: true,
      type: Text
    }
  }
}

export default fields
