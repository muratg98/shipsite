import { EmailAdapter, SendEmailOptions } from "payload";

const brevoAdapter = (): EmailAdapter => {

  const adapter = () => ({
    name: "brevo",
    defaultFromName: process.env.BREVO_SENDER_NAME as string,
    defaultFromAddress: process.env.BREVO_SENDER_EMAIL as string,
    sendEmail: async (message: SendEmailOptions): Promise<unknown> => {
      console.log(message);

      if(!process.env.BREVO_EMAILS_ACTIVE){
        console.log("Emails disabled, logging to console");
        console.log(message);
        return;
      }
      try{
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": process.env.BREVO_API_KEY as string,
              "content-type": "application/json",
              "accept": "application/json"
            },
            body: JSON.stringify({
              sender: {
                name: process.env.BREVO_SENDER_NAME as string,
                email: process.env.BREVO_SENDER_EMAIL as string
              },
              to: [{ email: message.to }],
              subject: message.subject,
              htmlContent: message.html
            })
          });
          if (!res.ok) {
            throw new Error(`Brevo API error: ${res.status} ${res.statusText}`);
          }
          
          return await res.json();
          
      }catch(error){
        console.error("Error sending email with Brevo", error);
      }
    }
  })

  return adapter;
}

export default brevoAdapter;