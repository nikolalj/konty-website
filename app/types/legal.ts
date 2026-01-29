export interface DefinitionItem {
  term: string
  definition: string
}

export interface Subsection {
  title: string
  paragraphs?: string[]
  items?: string[]
  orderedItems?: string[]
}

export interface Section {
  title: string
  paragraphs?: string[]
  items?: string[]
  definitionItems?: DefinitionItem[]
  subsections?: Subsection[]
  footerParagraphs?: string[]
  showContactInfo?: boolean
}

export interface LegalPageData {
  title: string
  lastUpdated: string
  date: string
  sections: Section[]
}
