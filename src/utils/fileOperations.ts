let tauriApi: any = null

export async function checkTauri(): Promise<boolean> {
  try {
    if (typeof window !== 'undefined' && (window as any).__TAURI__) {
      tauriApi = await import('@tauri-apps/api')
      return true
    }
  } catch {
    // Not in Tauri environment
  }
  return false
}

export async function openFile(): Promise<{ content: string; fileName: string } | null> {
  if (!tauriApi) return null

  try {
    const { open } = await import('@tauri-apps/api/dialog')
    const { readTextFile } = await import('@tauri-apps/api/fs')

    const selected = await open({
      filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
      multiple: false,
    })

    if (selected && typeof selected === 'string') {
      const content = await readTextFile(selected)
      const fileName = selected.split(/[/\\]/).pop() || 'untitled.md'
      return { content, fileName }
    }
  } catch (error) {
    console.error('Error opening file:', error)
  }

  return null
}

export async function saveFile(content: string, fileName: string | null): Promise<string | null> {
  if (!tauriApi) return null

  try {
    const { save } = await import('@tauri-apps/api/dialog')
    const { writeTextFile } = await import('@tauri-apps/api/fs')

    const filePath = await save({
      filters: [{ name: 'Markdown', extensions: ['md'] }],
      defaultPath: fileName || 'untitled.md',
    })

    if (filePath) {
      await writeTextFile(filePath, content)
      return filePath.split(/[/\\]/).pop() || null
    }
  } catch (error) {
    console.error('Error saving file:', error)
  }

  return null
}

