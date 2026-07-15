import { AlertTriangle } from 'lucide-react'

interface Props {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <AlertTriangle className="w-12 h-12 text-brand-500" />
      <p className="text-surface-300 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
