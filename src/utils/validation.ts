export interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  planInterest?: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // Standard RFC 5322 compatible regex check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please provide a valid work email address.';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Please specify a subject for your inquiry.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Your message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
