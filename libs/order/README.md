**Some important information about this library**

- When creating a checkout session using the provided API, it's important that we make use of the custom*data object provided by LemonSqueezy to keep the API in sync with the webhook we receive.
  \_An example of this implementation would be to attach the currently authenticated user's email to the custom*data property, as some users might use a different email to complete checkout, and we need to ensure that permissions are granted to the appropriate account.\*
