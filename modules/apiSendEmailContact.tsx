import ContactFormData from "./contactTypes";

export const apiSendContactEmail = async (formData: ContactFormData) => {

    const BACKEND_ADDRESS =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://port-folio-backend-three.vercel.app";

    const API_ENDPOINT = "/emails/send"
    try {
      const response = await fetch(`${BACKEND_ADDRESS}${API_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      return { success: false, error: "Erreur de connexion au serveur" };
    }
  };
  
  