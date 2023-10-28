import { FC, useState } from 'react'
import Modal from './Modal'
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'
import { Product } from '../types/ProductType'
import { useApi } from '../hooks/useApi'
import { useForm, Controller } from 'react-hook-form'
import validator from 'validator'
import { Category } from '../types/CategoryType'
import toast from 'react-hot-toast'

type SubmitProductFormType = {
  name: string
  description: string
  categoryId: string
  color: string
  price: number | string
}

export interface ICreateModalProps {
  // eslint-disable-next-line no-unused-vars
  setModalOpen: (modalOpen: boolean) => void
  // eslint-disable-next-line no-unused-vars
  onCreate: (prod: Product) => void
  categories: Category[]
}

const CreateModal: FC<ICreateModalProps> = ({
  categories,
  onCreate,
  setModalOpen
}) => {
  const [creating, setCreatring] = useState(false)
  const api = useApi()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
      color: '',
      price: 0
    }
  })

  const onConfirmCreate = async (data: SubmitProductFormType) => {
    setCreatring(true)
    const requestData = {
      ...data,
      price:
        typeof data.price === 'number'
          ? data.price
          : parseFloat(data.price.replace(',', '.'))
    }
    api
      .post('/product/', requestData)
      .then((res) => {
        toast.success('Produto criado')
        onCreate(res.data)
        reset()
        setModalOpen(false)
      })
      .catch(() => {
        toast.error('Algo deu errado, tente mais tarde')
      })
      .finally(() => {
        setCreatring(false)
      })
  }
  return (
    <Modal
      title={`Create new product: `}
      actionLabel="Create"
      secondActionLabel="Cancel"
      onClose={() => {
        reset()
        setModalOpen(false)
      }}
      secondAction={() => {
        setModalOpen(false)
      }}
      open={true}
      action={handleSubmit(onConfirmCreate)}
      disabled={creating}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: 'Required',
                validate: (value) => {
                  if (value.length <= 25) {
                    return true
                  }
                  return 'Name must be 25 characters or less'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  error={!!errors.name}
                  fullWidth
                  margin="normal"
                  variant="standard"
                  required
                  autoFocus
                  helperText={errors.name && errors.name.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="color"
              control={control}
              defaultValue=""
              rules={{
                required: 'Required',
                validate: (value) => {
                  if (value.length <= 25) {
                    return true
                  }
                  return 'Color must be 25 characters or less'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Color"
                  error={!!errors.color}
                  fullWidth
                  margin="normal"
                  variant="standard"
                  required
                  autoFocus
                  helperText={errors.color && errors.color.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              rules={{
                required: 'Required'
              }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  error={!!errors.categoryId}
                  variant="standard"
                  required
                >
                  <InputLabel id="select-label">Category</InputLabel>
                  <Select
                    {...field}
                    labelId="select-label"
                    label="Category"
                    error={!!errors.categoryId}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.categoryId && errors.categoryId.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="price"
              control={control}
              defaultValue={0}
              rules={{
                required: 'Campo obrigatório',
                validate: {
                  isNumeric: (value) =>
                    validator.isNumeric(value.toString().replace(',', '.')) ||
                    'Invalid Price',
                  isPositive: (value) =>
                    parseFloat(value.toString().replace(',', '.')) > 0 ||
                    'Invalid Price'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  error={!!errors.price}
                  fullWidth
                  margin="normal"
                  variant="standard"
                  required
                  helperText={errors.price && errors.price.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: 'Required',
                validate: (value) => {
                  if (value.length <= 90) {
                    return true
                  }
                  return 'Description must be 90 characters or less'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  error={!!errors.description}
                  minRows={2}
                  maxRows={2}
                  multiline
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  autoFocus
                  helperText={errors.description && errors.description.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default CreateModal
