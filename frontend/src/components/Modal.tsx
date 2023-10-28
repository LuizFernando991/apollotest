import { FC, ReactNode } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'

export interface IModalProps {
  title?: string
  actionLabel: string
  action: () => void
  actionButtonType?: string
  secondActionLabel?: string
  secondAction?: () => void
  onClose: () => void
  disabled?: boolean
  open: boolean
  children: ReactNode
}

const Modal: FC<IModalProps> = ({
  title,
  actionLabel,
  action,
  secondAction,
  secondActionLabel,
  disabled,
  open,
  onClose,
  children
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" color="primary">
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ marginRight: 2, marginBottom: 2, marginTop: 1 }}>
        {secondAction && secondActionLabel && (
          <Button
            disabled={disabled}
            onClick={secondAction}
            variant="outlined"
            color="error"
          >
            {secondActionLabel}
          </Button>
        )}
        <Button onClick={action} disabled={disabled} variant="contained">
          {actionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Modal
