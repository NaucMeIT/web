export function isDateBeforeNow(date: string | Date): boolean {
  return new Date(typeof date === 'string' ? date : date.toDateString()) < new Date(new Date().toDateString())
}
