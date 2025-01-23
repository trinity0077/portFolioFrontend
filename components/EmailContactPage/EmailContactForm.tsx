import React, { useState } from 'react';
import { Mail, Send, AlertCircle } from 'lucide-react';

interface FormData {
  email: string;
  subject: string;
  message: string;
  gdprConsent: boolean;
}

interface FormErrors {
  email?: string;
  subject?: string;
  message?: string;
  gdprConsent?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    subject: '',
    message: '',
    gdprConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    if (!email.includes('@')) {
      return 'L\'email doit contenir un @';
    }
    if (!email.includes('.')) {
      return 'L\'email doit contenir un point (.)';
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Veuillez entrer un email valide';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'L\'objet est requis';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    // GDPR validation
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'Vous devez accepter la politique de confidentialité';
    }

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send the form data to your backend
      setSubmitted(true);
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'email' ? value.toLowerCase() : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      gdprConsent: e.target.checked,
    }));
    
    if (errors.gdprConsent) {
      setErrors(prev => ({
        ...prev,
        gdprConsent: undefined,
      }));
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Message envoyé!</h2>
          <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full px-4 py-3 rounded-md border ${
                errors.email ? 'border-red-300' : 'border-[#7d9b79]'
              } focus:outline-none focus:ring-2 focus:ring-[#7d9b79] focus:border-transparent`}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Objet
          </label>
          <div className="relative">
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`block w-full px-4 py-3 rounded-md border ${
                errors.subject ? 'border-red-300' : 'border-[#7d9b79]'
              } focus:outline-none focus:ring-2 focus:ring-[#7d9b79] focus:border-transparent`}
              placeholder="Sujet de votre message"
            />
            {errors.subject && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`block w-full px-4 py-3 rounded-md border ${
                errors.message ? 'border-red-300' : 'border-[#7d9b79]'
              } focus:outline-none focus:ring-2 focus:ring-[#7d9b79] focus:border-transparent`}
              placeholder="Votre message..."
            />
            {errors.message && (
              <div className="absolute top-0 right-0 mt-3 mr-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="gdprConsent"
              name="gdprConsent"
              type="checkbox"
              checked={formData.gdprConsent}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-[#7d9b79] text-[#7d9b79] focus:ring-[#7d9b79]"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="gdprConsent" className="text-sm text-gray-600">
              J'accepte la politique de confidentialité et le traitement de mes données personnelles
            </label>
            {errors.gdprConsent && (
              <p className="mt-1 text-sm text-red-600">{errors.gdprConsent}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d9b79] hover:bg-[#6b8768] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7d9b79] transition-colors duration-200"
        >
          <Send className="h-5 w-5 mr-2" />
          Envoyer le message
        </button>
      </div>
    </form>
  );
}