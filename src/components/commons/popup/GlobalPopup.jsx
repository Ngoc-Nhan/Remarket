import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  XCircle
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

// export type PopupVariant =
// 	| 'confirm'
// 	| 'info'
// 	| 'warning'
// 	| 'error'
// 	| 'success'
// 	| 'custom';
// export type PopupSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
// export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

// export interface PopupButton {
// 	label: string;
// 	variant?: ButtonVariant;
// 	onClick: () => void;
// 	disabled?: boolean;
// 	className?: string;
// }

// export interface VariantConfig {
// 	icon: LucideIcon | null;
// 	iconColor: string;
// 	bgColor: string;
// 	borderColor: string;
// }

// export interface GlobalPopupProps {
// 	isOpen?: boolean;
// 	onClose?: () => void;
// 	variant?: PopupVariant;
// 	title?: string;
// 	message?: string | ReactNode;
// 	showCloseButton?: boolean;
// 	closable?: boolean;
// 	size?: PopupSize;
// 	animation?: boolean;
// 	customIcon?: LucideIcon | null;
// 	customContent?: ReactNode;
// 	buttons?: PopupButton[];
// 	autoClose?: number | null;
// 	backdrop?: boolean;
// 	className?: string;
// }

// export type PopupConfig = Omit<GlobalPopupProps, 'isOpen' | 'onClose'>;

// export interface PopupState {
// 	isOpen: boolean;
// 	config: PopupConfig;
// }

// export interface UseGlobalPopupReturn {
// 	popupState: PopupState;
// 	showPopup: (config: PopupConfig) => void;
// 	hidePopup: () => void;
// 	confirm: (
// 		title: string,
// 		message: string | ReactNode,
// 		onConfirm?: () => void,
// 		onCancel?: () => void,
// 	) => void;
// 	alert: (title: string, message: string | ReactNode, variant?: PopupVariant) => void;
// }

const POPUP_VARIANTS = {
  confirm: {
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  warning: {
    icon: AlertCircle,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  error: {
    icon: XCircle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  custom: {
    icon: null,
    iconColor: '',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  }
}

export function GlobalPopup({
  isOpen = false,
  onClose = () => {},
  variant = 'info',
  title = '',
  message = '',
  showCloseButton = true,
  closable = true,
  size = 'md',
  animation = true,
  customIcon = null,
  customContent = null,
  buttons = [],
  autoClose = null,
  backdrop = true,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const handleClose = useCallback(() => {
    if (closable) {
      onClose()
    }
  }, [closable, onClose])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      setTimeout(() => setIsVisible(false), animation ? 300 : 0)
    }
  }, [isOpen, animation])

  useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        handleClose()
      }, autoClose)
      return () => clearTimeout(timer)
    }
  }, [isOpen, autoClose, handleClose])

  // Xử lý ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closable && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closable, handleClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && backdrop && closable) {
      handleClose()
    }
  }

  if (!isVisible) return null

  const variantConfig = POPUP_VARIANTS[variant] || POPUP_VARIANTS.info
  const IconComponent = customIcon || variantConfig.icon

  // Size configurations
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4'
  }

  // Default buttons cho các variant
  const getDefaultButtons = () => {
    switch (variant) {
      case 'confirm':
        return [
          {
            label: 'Hủy',
            variant: 'secondary',
            onClick: handleClose
          },
          {
            label: 'Xác nhận',
            variant: 'primary',
            onClick: () => {
              handleClose()
            }
          }
        ]
      case 'error':
      case 'warning':
        return [
          {
            label: 'Đóng',
            variant: 'primary',
            onClick: handleClose
          }
        ]
      case 'success':
        return [
          {
            label: 'OK',
            variant: 'primary',
            onClick: handleClose
          }
        ]
      default:
        return [
          {
            label: 'Đóng',
            variant: 'secondary',
            onClick: handleClose
          }
        ]
    }
  }

  const renderButtons = () => {
    const buttonsToRender = buttons.length > 0 ? buttons : getDefaultButtons()

    const buttonVariants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
      secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300',
      danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600',
      success: 'bg-green-600 hover:bg-green-700 text-white border-green-600'
    }

    return (
      <div className='flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6'>
        {buttonsToRender.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            disabled={button.disabled}
            className={`
              px-4 py-2 text-sm font-medium rounded-md border transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${buttonVariants[button.variant || 'secondary']}
              ${button.className || ''}
            `}
          >
            {button.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/55 bg-opacity-50 transition-opacity duration-300'
        style={{ opacity: isAnimating ? 1 : 0 }}
      />

      {/* Popup Content */}
      <div
        className={`
          relative bg-white rounded-lg shadow-xl w-full
          transform transition-all duration-300
          ${sizeClasses[size]}
          ${isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
          ${className}
        `}
      >
        {/* Close Button */}
        {showCloseButton && closable && (
          <button
            onClick={handleClose}
            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10'
          >
            <X size={20} />
          </button>
        )}

        {/* Content */}
        <div className='p-6'>
          {customContent ? (
            customContent
          ) : (
            <>
              {/* Header với Icon */}
              {(IconComponent || title) && (
                <div className='flex items-start gap-4 mb-4'>
                  {IconComponent && (
                    <div
                      className={`
                      flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                      ${variantConfig.bgColor} ${variantConfig.borderColor} border
                    `}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${variantConfig.iconColor}`}
                      />
                    </div>
                  )}

                  {title && (
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                        {title}
                      </h3>
                    </div>
                  )}
                </div>
              )}

              {/* Message */}
              {message && (
                <div
                  className={`text-gray-600 ${
                    IconComponent || title ? 'ml-16' : ''
                  }`}
                >
                  {typeof message === 'string' ? <p>{message}</p> : message}
                </div>
              )}
            </>
          )}

          {/* Buttons */}
          {!customContent && renderButtons()}
        </div>
      </div>
    </div>
  )
}
