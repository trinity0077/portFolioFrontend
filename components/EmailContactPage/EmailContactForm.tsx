import styles from "../../styles/ContactForm/EmailContactForm.module.css";
import React, { useState } from "react";
import { Mail, Send, AlertCircle } from "lucide-react";

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

export default function EmailContactForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    subject: "",
    message: "",
    gdprConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    if (!email.includes("@")) {
      return "L'email doit contenir un @";
    }
    if (!email.includes(".")) {
      return "L'email doit contenir un point (.)";
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
      ? ""
      : "Veuillez entrer un email valide";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "L'objet est requis";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }

    // GDPR validation
    if (!formData.gdprConsent) {
      newErrors.gdprConsent =
        "Vous devez accepter la politique de confidentialité";
    }

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically send the form data to your backend
      setSubmitted(true);
      console.log("Form submitted:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === "email" ? value.toLowerCase() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      gdprConsent: e.target.checked,
    }));

    if (errors.gdprConsent) {
      setErrors((prev) => ({
        ...prev,
        gdprConsent: undefined,
      }));
    }
  };
  if (submitted) {
    return (
      <div className={styles.successMessageContainer}>
        <div className={styles.successContent}>
          <div className={styles.successIconWrapper}>
            <Mail className={styles.successIcon} />
          </div>
          <h2 className={styles.successTitle}>Message envoyé!</h2>
          <p className={styles.successText}>
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <div className={styles.formFields}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.formInput} ${
                errors.email ? styles.inputError : ""
              }`}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <div className={styles.errorIconWrapper}>
                <AlertCircle className={styles.errorIcon} />
              </div>
            )}
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.formLabel}>
            Objet
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`${styles.formInput} ${
                errors.subject ? styles.inputError : ""
              }`}
              placeholder="Sujet de votre message"
            />
            {errors.subject && (
              <div className={styles.errorIconWrapper}>
                <AlertCircle className={styles.errorIcon} />
              </div>
            )}
          </div>
          {errors.subject && (
            <p className={styles.errorMessage}>{errors.subject}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formLabel}>
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`${styles.formTextarea} ${
                errors.message ? styles.inputError : ""
              }`}
              placeholder="Votre message..."
            />
            {errors.message && (
              <div className={styles.textareaErrorIcon}>
                <AlertCircle className={styles.errorIcon} />
              </div>
            )}
          </div>
          {errors.message && (
            <p className={styles.errorMessage}>{errors.message}</p>
          )}
        </div>

        <div className={styles.consentGroup}>
          <div className={styles.checkboxWrapper}>
            <input
              id="gdprConsent"
              name="gdprConsent"
              type="checkbox"
              checked={formData.gdprConsent}
              onChange={handleCheckboxChange}
              className={styles.consentCheckbox}
            />
          </div>
          <div className={styles.consentTextWrapper}>
            <label htmlFor="gdprConsent" className={styles.consentLabel}>
              J'accepte la politique de confidentialité et le traitement de mes
              données personnelles
            </label>
            {errors.gdprConsent && (
              <p className={styles.errorMessage}>{errors.gdprConsent}</p>
            )}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          <Send className={styles.submitIcon} />
          Envoyer le message
        </button>
      </div>
    </form>
  );
}
