// src/hooks/useFormValidation.js
import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validar todos los campos
  const validateAll = useCallback(() => {
    const newErrors = {};
    let formIsValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const value = values[fieldName];
      const rules = validationRules[fieldName];

      if (rules.required && (!value && value !== 0 && value !== false)) {
        newErrors[fieldName] = rules.required.message || 'Este campo es requerido';
        formIsValid = false;
        return;
      }

      if (rules.minLength && value && value.length < rules.minLength.value) {
        newErrors[fieldName] = rules.minLength.message || `Mínimo ${rules.minLength.value} caracteres`;
        formIsValid = false;
        return;
      }

      if (rules.maxLength && value && value.length > rules.maxLength.value) {
        newErrors[fieldName] = rules.maxLength.message || `Máximo ${rules.maxLength.value} caracteres`;
        formIsValid = false;
        return;
      }

      if (rules.min && value && Number(value) < rules.min.value) {
        newErrors[fieldName] = rules.min.message || `Mínimo ${rules.min.value}`;
        formIsValid = false;
        return;
      }

      if (rules.max && value && Number(value) > rules.max.value) {
        newErrors[fieldName] = rules.max.message || `Máximo ${rules.max.value}`;
        formIsValid = false;
        return;
      }

      if (rules.pattern && value && !rules.pattern.value.test(value)) {
        newErrors[fieldName] = rules.pattern.message || 'Formato inválido';
        formIsValid = false;
        return;
      }

      if (rules.validate && value) {
        const customError = rules.validate(value, values);
        if (customError) {
          newErrors[fieldName] = customError;
          formIsValid = false;
        }
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  }, [values, validationRules]);

  // Validar un campo específico
  const validateField = useCallback((fieldName) => {
    const value = values[fieldName];
    const rules = validationRules[fieldName];
    const newErrors = { ...errors };

    if (!rules) {
      delete newErrors[fieldName];
      setErrors(newErrors);
      return true;
    }

    if (rules.required && (!value && value !== 0 && value !== false)) {
      newErrors[fieldName] = rules.required.message || 'Este campo es requerido';
      setErrors(newErrors);
      return false;
    }

    if (rules.minLength && value && value.length < rules.minLength.value) {
      newErrors[fieldName] = rules.minLength.message || `Mínimo ${rules.minLength.value} caracteres`;
      setErrors(newErrors);
      return false;
    }

    if (rules.maxLength && value && value.length > rules.maxLength.value) {
      newErrors[fieldName] = rules.maxLength.message || `Máximo ${rules.maxLength.value} caracteres`;
      setErrors(newErrors);
      return false;
    }

    if (rules.min && value && Number(value) < rules.min.value) {
      newErrors[fieldName] = rules.min.message || `Mínimo ${rules.min.value}`;
      setErrors(newErrors);
      return false;
    }

    if (rules.max && value && Number(value) > rules.max.value) {
      newErrors[fieldName] = rules.max.message || `Máximo ${rules.max.value}`;
      setErrors(newErrors);
      return false;
    }

    if (rules.pattern && value && !rules.pattern.value.test(value)) {
      newErrors[fieldName] = rules.pattern.message || 'Formato inválido';
      setErrors(newErrors);
      return false;
    }

    if (rules.validate && value) {
      const customError = rules.validate(value, values);
      if (customError) {
        newErrors[fieldName] = customError;
        setErrors(newErrors);
        return false;
      }
    }

    delete newErrors[fieldName];
    setErrors(newErrors);
    return true;
  }, [values, validationRules, errors]);

  // Cambiar valor de campo
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: finalValue
    }));

    if (touched[name]) {
      validateField(name);
    }
  }, [touched, validateField]);

  // Marcar campo como tocado
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name);
  }, [validateField]);

  // Resetear formulario
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsValid(false);
  }, [initialValues]);

  // Establecer valores manualmente
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      validateField(name);
    }
  }, [touched, validateField]);

  // Establecer error manualmente
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Marcar campo como tocado
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({
      ...prev,
      [name]: isTouched
    }));
  }, []);

  // Obtener clases CSS para campo
  const getFieldProps = useCallback((fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName];
    
    return {
      name: fieldName,
      value: values[fieldName] || '',
      onChange: handleChange,
      onBlur: handleBlur,
      className: hasError ? 'is-invalid' : touched[fieldName] ? 'is-valid' : '',
      'aria-invalid': hasError ? 'true' : 'false',
      'aria-describedby': hasError ? `${fieldName}-error` : undefined
    };
  }, [values, errors, touched, handleChange, handleBlur]);

  // Validar formulario completo al cambiar valores
  useEffect(() => {
    validateAll();
  }, [values, validateAll]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    resetForm,
    setValues,
    setErrors,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    getFieldProps,
    validateAll,
    validateField
  };
};

export default useFormValidation;