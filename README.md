# Gravitate Ai - Challenge Assignament - Form Submiter & Creator
  - Made with React, Typescript & TailwindCss 🚀

## Review code and Fix issues:

  - Usage of **any type** - The code initially had various places where the any type was used, which can cause type safety issues in TypeScript
    - changed to right ones string, boolean, FormData
  -  In the original onSubmit function, the **axios** call was not correctly wrapped in async/await
     - Without async/await, the API call would't wait for the response, causing issues with how the application handles the submission process and even leading to incorrect errors handling
     - Request in the form submission was wrapped in async/await to handle asynchronous operations properly
  - **Axios** was not installed
  - Tailwind CSS was not properly implemented, which resulted in styling issues
    - Handling properly on vite.config.js and also creating tailwind config file - working now
  - The body CSS was styled in such a way that caused improper layout of content
    - CSS was preventing proper content display and layout. Fixing this ensures that the form and modal are properly centered and that the content looks clean.
  -  The **isSending** state was being used but not correctly reflected in the UI
      - Causes a bad user experience, where the UI does not properly indicate when the form is submitting, making it unclear if the form is working or not
  - Basic error handling & validation
    - users might submit forms with incorrect or missing data, leading to failed submissions

## Form Builder & project integration

The Form Builder component dynamically creates form fields of different types (text, number, and dropdown). The component accepts a callback from outside parent to add a new field. The state of the form fields (like field name, type, and dropdown options) is managed locally within the Form Builder component. When a new field is created, it updates the parent component’s state, which then renders the additional fields dynamically in the form.

Also, the Form Builder is composed of reusable components such as InputField to handle the different field types and DropdownOptions to manage dropdown-specific fields. This modular approach makes it easy to extend the form builder to support more field types in the future and allow us to keep growing

## Challenges we faced

- One challenge was ensuring that form validation worked across both static and dynamic fields. Initially, only the static fields had validation, leaving dynamic fields without any. To resolve this, we created a unified validation function that checks both static and dynamic fields before submission.
- To keep all sync across component, hook was created and reused to ensure all components are handling exact the same data
- Tailwind was a little tricky to implement with Vite, I find bunch of people with same problem. Once fixed I share the solution with them too

## ToDo - Near future

- Field Validation: In the future, field validation could be managed using libraries like Formik or Yup, which support custom validation rules per field (e.g., minimum/maximum length for text fields or specific validation patterns for emails).
- Better User Feedback: Now, we simulate the server response. Adding a real backend or integrating with a service could provide real-world functionality
- Global Alert/Toast Provider: Adding a toast/alert system maybe could improve the overall user experience by showing status messages throughout the app (using libraries like react-toastify).
- Enhanced UX: Further improvements, such as tooltips, loading indicators, and more detailed error messaging, could be added to enhance the user experience.

**Evidence:**

<img width="1466" alt="Captura de pantalla 2024-09-12 a la(s) 11 12 02" src="https://github.com/user-attachments/assets/c1872400-89a0-4f24-9ae4-b092f3da44db">

