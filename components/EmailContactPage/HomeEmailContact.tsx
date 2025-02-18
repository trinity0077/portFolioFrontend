import React from 'react';
import EmailContactForm from './EmailContactForm';
import { Mail } from 'lucide-react';
import styles from '../../styles/ContactForm/HomeEmailContact.module.css';

function HomeEmailContact() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Mail className={styles.icon} />
        </div>
        <h1 className={styles.title}>Contactez-moi</h1>
        <p className={styles.description}>
          Je suis là pour vous aider. Remplissez le formulaire ci-dessous et je vous répondrais dans les plus brefs délais.
        </p>
      </div>
      
      <EmailContactForm />
    </div>
  );
}

export default HomeEmailContact;

// import React from 'react';
// import EmailContactForm from './EmailContactForm';
// import { Mail } from 'lucide-react';

// function HomeEmailContact() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="text-center mb-12">
//         <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#7d9b79] bg-opacity-10 mb-4">
//           <Mail className="h-6 w-6 text-[#7d9b79]" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Contactez-nous</h1>
//         <p className="text-gray-600 max-w-md mx-auto">
//           Nous sommes là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
//         </p>
//       </div>
      
//       <EmailContactForm />
//     </div>
//   );
// }

// export default HomeEmailContact;