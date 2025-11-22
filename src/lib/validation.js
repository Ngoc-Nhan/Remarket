export const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // email username at least 5 letters,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ // includes at least one uppercase letter, one lowercase letter, one number, and one special character, password length at least 8 letter
}

export const validate = (formValues, validationSchema) => {
  const errors = {}

  Object.keys(validationSchema).forEach((field) => {
    const rules = validationSchema[field]
    const value = formValues[field]

    if (rules.required && !value.trim()) {
      errors[field] =
        rules.errorMessage || `${rules.fieldName || field} is required.`
      return
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.errorMessage
      return
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
      errors[field] =
        rules.errorMessage ||
        `${rules.fieldName || field} must be at least ${
          rules.minLength
        } characters long.`
      return
    }

    // Check max length
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] =
        rules.errorMessage ||
        `${rules.fieldName || field} must be less than ${
          rules.maxLength
        } characters long.`
      return
    }

    // Check custom validation
    if (rules.customValidate && !rules.customValidate(formValues)) {
      errors[field] = rules.errorMessage
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  }
}
