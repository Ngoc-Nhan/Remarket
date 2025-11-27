// import type {
// 	PopupConfig,
// 	PopupState,
// 	PopupVariant,
// 	UseGlobalPopupReturn,
// } from './GlobalPopup';
import { useState } from 'react'

export const useGlobalPopup = () => {
  const [popupState, setPopupState] = useState({ isOpen: false, config: {} })

  const showPopup = (config) => {
    setPopupState({
      isOpen: true,
      config
    })
  }

  const hidePopup = () => {
    setPopupState((prev) => ({
      ...prev,
      isOpen: false
    }))
  }

  const confirm = (title, message, onConfirm, onCancel) => {
    showPopup({
      variant: 'confirm',
      title,
      message,
      buttons: [
        {
          label: 'Hủy',
          variant: 'secondary',
          onClick: () => {
            onCancel?.()
            hidePopup()
          }
        },
        {
          label: 'Xác nhận',
          variant: 'primary',
          onClick: () => {
            onConfirm?.()
            hidePopup()
          }
        }
      ]
    })
  }

  const alert = (title, message, variant) => {
    showPopup({
      variant,
      title,
      message,
      buttons: [
        {
          label: 'OK',
          variant: 'primary',
          onClick: hidePopup
        }
      ]
    })
  }

  return {
    popupState,
    showPopup,
    hidePopup,
    confirm,
    alert
  }
}
