export function toggleTheme() {
  const body = document.body
  const isDark = body.hasAttribute('theme-mode')

  const newTheme = isDark ? 'light' : 'dark'
  localStorage['theme'] = newTheme

  if (newTheme === 'dark') {
    body.setAttribute('theme-mode', 'dark')
  } else {
    body.removeAttribute('theme-mode')
  }
}
