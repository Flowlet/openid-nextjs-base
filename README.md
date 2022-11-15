# OpenID authentication in a NextJS SPA

This template is a boilerplate for Single Page Applications (SPAs) that require OpenID authentication. It is created to showcase the OpenID template in Flowlet.

The initial project was set up using [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). You might refer to their documentation for more
information on the framework.

## Getting started

An OpenID authority is required to run this project.
You can set up an authority in your Flowlet workspace using the OpenID template,
which you can install from the *Templates* section in the Flowlet admin.
After installation, go to the *Data* section and add a new row in the
*OpenIdClient* collection. Use the following values:

* *confidential* should be set to *false* for SPAs.
* *name* can be arbitrarily chosen.
* *redirectUri* is the URL where your application runs. Set this to "http://localhost:3000" for this example.
* *secret* is not used. You might leave it empty.
* *trusted* can be set to *true*. This will bypass the screen asking the user to allow access to this application. Set this to *false* when adding 3rd-party clients.

After saving this row, you will see an ID. This ID is used as the *Client ID*.

Open `pages/_app.tsx` in your editor and change the OpenID configuration on lines 5 to 8.
Use the config below, changing "WORKSPACE" to your workspace name and "CLIENT_ID" to
the ID you just got.

```
const openidConfig = {
  authority: 'WORKSPACE.flowlet.app',
  clientId: 'CLIENT_ID',
  redirectUri: 'http://localhost:3000/',
  scope: '*'
};
```

Install the dependencies using `npm install` and start the development server
with `npm run dev`.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You will be redirected to the OpenID login page if all is set up correctly.

To log in, create a user in your Flowlet workspace. Go to the *Data* section and
open the *User* collection. Add a new row using the following details:

* *mail* is used as the username and must be a valid e-mail address.
* *password* is the hashed password. Use the button aside from the input field to generate a hash.
* *scope* is the OAuth2 scope for this user. You can use "*" for testing, or you might want to learn more in our [blog on OAuth2 scopes](https://medium.com/@Flowlet/oauth2-scopes-for-fine-grained-acls-29efa536f1b0).
