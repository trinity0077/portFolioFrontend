import React from "react";
import EmailContactForm from "./EmailContactForm";
import { Mail } from "lucide-react";
import styles from "../../styles/ContactForm/HomeEmailContact.module.css";

function HomeEmailContact() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Mail className={styles.icon} />
        </div>
        <h1 className={styles.title}>Contactez-moi</h1>
        <p className={styles.description}>
          Je suis là pour vous aider. Remplissez le formulaire ci-dessous et je
          vous répondrais dans les plus brefs délais.
        </p>
      </div>

      <EmailContactForm />
    </div>
  );
}

export default HomeEmailContact;
