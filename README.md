
# ShipShip - Project Maker For NextJS, Payload CMS, Tailwind CSS

This project is a modern website template built with Next.js and Payload CMS, featuring automatic plugin integrations and addons like authentication, S3 storage and billing. It uses the convenience of Payload CMS and NextJS framework to create efficient websites fast.
## Features

- Next.js Framework
- Payload CMS
- Tailwind CSS
- TypeScript
- Authentication (using BetterAuth)
- Plugins support (currently Stripe, Forms, Posts, and S3 Storage)
- Modern webpage seeding with basic UI and framer motion


## Environment Variables

Before running this project, you will need to add the necessary environment variables to your .env file. Else, this can crash the project on start-up and fail to seed the database appropriately. The .env file will contain the data you need to add for the choices in addons and plugins you have provided. 

Remember: you can generate secret keys where necessary using tools like openssl rand -base64 32 or an online key generator. Always keep your secrets secure and never commit them to version control.


## Usage

To make the best use of this projects work, please follow these instructions or you will more than likely come across errors.

Now, you should have your .env file ready, so now its time to get the code ready. Since we are utilizing Payload CMS and each project potentially has different components, once downloaded please run these commands in the terminal.

```bash
  npx payload generate:types
  npx payload generate:importmap
```

Once complete, you can then run the server locally by:

(1) First Installing dependencies

```bash
  npm install
```

(2) Then you can start the server

```bash
  npm run dev
```

## Feedback

If you have any feedback, please reach out to us at fake@fake.com


## Contributing

Contributions are always welcome! Below is the roadmap I believe will be extremely helpful for developers that enjoy coding using NextJS and Payload CMS.


### Roadmap
✨ Add prompt copy button after project creation to let users paste it into an AI. Use the AI’s JSON response to dynamically seed website content (e.g., title, subtitle, etc).

🎨 Enhance color and styling customization. Let users define primary, secondary colors, etc., to be integrated with Tailwind CSS for consistent theming.

🏢 Finalize and test the multi-tenancy plugin implementation.

📊 Add graphs and statistics to the admin dashboard for better insights.

📄 Make the "Pages" collection available as an optional plugin.

✅ Implement testing setup (e.g., using Jest, Playwright, or Selenium) to ensure stability and CI-readiness.
## License

[MIT](https://choosealicense.com/licenses/mit/)

