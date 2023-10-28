import { FC, useState } from 'react'
import Modal from './Modal'
import { Product } from '../types/ProductType'
import { useApi } from '../hooks/useApi'
import toast from 'react-hot-toast'

export interface IDeleteModalProps {
  product: Product | null
  // eslint-disable-next-line no-unused-vars
  setSelectedProduct: (prod: null) => void
  onDelete: () => void
}

const DeleteModal: FC<IDeleteModalProps> = ({
  product,
  setSelectedProduct,
  onDelete
}) => {
  const [deleting, setDeleting] = useState(false)
  const api = useApi()
  const onConfirmDelete = async () => {
    setDeleting(true)
    api
      .delete(`/product/${product?.id}`)
      .then(() => onDelete())
      .catch(() => toast.error('Something went wrong'))
      .finally(() => {
        toast.success('Product deleted')
        setDeleting(false)
        setSelectedProduct(null)
      })
  }
  return (
    <Modal
      title={`Delete ${product?.name}?`}
      actionLabel="Delete"
      secondActionLabel="Cancel"
      onClose={() => {
        setSelectedProduct(null)
      }}
      secondAction={() => {
        setSelectedProduct(null)
      }}
      open={!!product}
      action={onConfirmDelete}
      disabled={deleting}
    >
      Tem certeza que deseja deletar &quot;{product?.name}&quot;?
    </Modal>
  )
}

export default DeleteModal
