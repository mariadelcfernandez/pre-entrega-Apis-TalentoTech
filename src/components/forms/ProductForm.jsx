// src/components/forms/ProductForm.jsx
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductsContext';
import styled from 'styled-components';
import { FaUpload, FaTimes, FaInfoCircle } from 'react-icons/fa';

const FormContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const FormTitle = styled.h3`
  color: #333;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #667eea;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
  
  .required {
    color: #dc3545;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc3545' : '#667eea'};
    box-shadow: ${props => props.error ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(102,126,234,.25)'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 5px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc3545' : '#667eea'};
    box-shadow: ${props => props.error ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(102,126,234,.25)'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc3545' : '#667eea'};
    box-shadow: ${props => props.error ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(102,126,234,.25)'};
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &.btn-secondary {
    background: #6c757d;
    color: white;
    margin-left: 1rem;
    
    &:hover {
      background: #5a6268;
    }
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed #ddd;
  border-radius: 5px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 1rem auto;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImage = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #dc3545;
  }
`;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .required('El nombre es requerido'),
  description: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede exceder 2000 caracteres')
    .required('La descripción es requerida'),
  price: Yup.number()
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999.99, 'El precio no puede exceder $999,999.99')
    .required('El precio es requerido'),
  category: Yup.string()
    .required('La categoría es requerida'),
  stock: Yup.number()
    .min(0, 'El stock no puede ser negativo')
    .max(99999, 'El stock no puede exceder 99,999 unidades')
    .required('El stock es requerido'),
  image: Yup.string()
    .url('Debe ser una URL válida')
    .optional()
});

const ProductForm = ({ product, onSubmit, onCancel, categories }) => {
  const { isAdmin } = useAuth();
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      category: product?.category || '',
      stock: product?.stock || '',
      image: product?.image || '',
      isNew: product?.isNew || false,
      rating: product?.rating || 4
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!isAdmin()) {
        toast.error('No tienes permisos para realizar esta acción');
        return;
      }

      setIsSubmitting(true);
      setError('');

      try {
        await onSubmit(values);
      } catch (err) {
        setError(err.message || 'Error al guardar el producto');
        toast.error('Error al guardar el producto');
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if (formik.values.image) {
      // Verificar si la URL de la imagen es válida
      const img = new Image();
      img.onload = () => setImagePreview(formik.values.image);
      img.onerror = () => {
        setImagePreview('');
        formik.setFieldError('image', 'No se pudo cargar la imagen desde esta URL');
      };
      img.src = formik.values.image;
    } else {
      setImagePreview('');
    }
  }, [formik.values.image]);

  const handleImageChange = (e) => {
    const url = e.target.value.trim();
    formik.setFieldValue('image', url);
    formik.setFieldTouched('image', true);
  };

  const removeImage = () => {
    formik.setFieldValue('image', '');
    setImagePreview('');
  };

  const handleNumberInput = (e, field) => {
    const value = e.target.value;
    // Permitir solo números y un punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      formik.setFieldValue(field, value);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{product ? 'Editar Producto' : 'Nuevo Producto'}</FormTitle>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          <FaInfoCircle className="me-2" />
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="name">
                Nombre <span className="required">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
                placeholder="Ej: iPhone 14 Pro"
                maxLength={100}
              />
              {formik.touched.name && formik.errors.name && (
                <ErrorMessage>
                  <FaInfoCircle /> {formik.errors.name}
                </ErrorMessage>
              )}
              <div className="text-end small text-muted mt-1">
                {formik.values.name.length}/100
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price">
                Precio ($) <span className="required">*</span>
              </Label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <Input
                  id="price"
                  name="price"
                  type="text"
                  onChange={(e) => handleNumberInput(e, 'price')}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  error={formik.touched.price && formik.errors.price}
                  placeholder="0.00"
                />
              </div>
              {formik.touched.price && formik.errors.price && (
                <ErrorMessage>
                  <FaInfoCircle /> {formik.errors.price}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">
                Categoría <span className="required">*</span>
              </Label>
              <Select
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                error={formik.touched.category && formik.errors.category}
              >
                <option value="">Seleccionar categoría</option>
                {categories && categories.map(cat => (
                  <option key={cat.id || cat.name} value={cat.name}>
                    {cat.displayName || cat.name}
                  </option>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <ErrorMessage>
                  <FaInfoCircle /> {formik.errors.category}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="stock">
                Stock <span className="required">*</span>
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                max="99999"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                error={formik.touched.stock && formik.errors.stock}
                placeholder="0"
              />
              {formik.touched.stock && formik.errors.stock && (
                <ErrorMessage>
                  <FaInfoCircle /> {formik.errors.stock}
                </ErrorMessage>
              )}
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="description">
                Descripción <span className="required">*</span>
              </Label>
              <TextArea
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                error={formik.touched.description && formik.errors.description}
                placeholder="Describe el producto en detalle..."
                maxLength={2000}
              />
              {formik.touched.description && formik.errors.description && (
                <ErrorMessage>
                  <FaInfoCircle /> {formik.errors.description}
                </ErrorMessage>
              )}
              <div className="text-end small text-muted mt-1">
                {formik.values.description.length}/2000
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="image">URL de la Imagen</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
                error={formik.touched.image && formik.errors.image}
              />
              {formik.touched.image && formik.errors.image && (
                <ErrorMessage>
                  <FaInfoCircle /> {formik.errors.image}
                </ErrorMessage>
              )}
            </FormGroup>

            {imagePreview && (
              <FormGroup>
                <Label>Vista previa:</Label>
                <ImagePreview>
                  <PreviewImage src={imagePreview} alt="Preview" />
                  <RemoveImage type="button" onClick={removeImage}>
                    <FaTimes />
                  </RemoveImage>
                </ImagePreview>
              </FormGroup>
            )}

            <FormGroup>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={formik.values.isNew}
                  onChange={formik.handleChange}
                />
                <Label className="form-check-label" htmlFor="isNew" style={{ fontWeight: 'normal' }}>
                  Marcar como nuevo producto
                </Label>
              </div>
            </FormGroup>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="btn-primary ms-3"
            disabled={isSubmitting || !formik.isValid}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {product ? 'Actualizando...' : 'Creando...'}
              </>
            ) : (
              product ? 'Actualizar Producto' : 'Crear Producto'
            )}
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ProductForm;