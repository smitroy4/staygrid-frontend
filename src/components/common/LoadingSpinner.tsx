import { Loader2 } from 'lucide-react'

interface Props {
  size?: number
  text?: string
  fullPage?: boolean
}

export default function LoadingSpinner({ size = 24, text, fullPage }: Props) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className="animate-spin text-brand-500" style={{ width: size, height: size }} />
      {text && <p className="text-surface-400 text-sm">{text}</p>}
    </div>
  )

  if (fullPage) {
    return <div className="min-h-[60vh] flex items-center justify-center">{content}</div>
  }

  return content
}
