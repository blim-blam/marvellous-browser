import sanitizeHtml from 'sanitize-html'

export const cleanString = (dirty) => dirty ? sanitizeHtml(dirty, {}) : ''