# Facebook Tools

![npm type definitions](https://img.shields.io/npm/types/typescript)

The tool set is a comprehensive TypeScript and React-based client-side module that provides first-class functionality for adding Social Plugins and Facebook Login to your web application.

This module allows seamless integration of Facebook features into your React components. The following example demonstrates the usage of the components provided by Nom:

## Installation

To install the tool set, use the following command:

```bash
npm install @tusken-s/facebook-tools
# OR
yarn add @tusken-s/facebook-tools
```

## Usage

Import the required components from the Nom module as shown below:

```jsx
import { Script, Chat, Button } from "@tusken-s/facebook-tools";
```

### Script Component

The `Script` component enables you to load the necessary Facebook scripts and initialize the Social Plugins. Here is an example of how to use it:

```jsx
import { Features, Script } from "@tusken-s/facebook-tools";
...
<Script
  cookie={false}
  nonce="xxxxxxx"
  features={[Features.LOGIN_BUTTON, Features.CHAT_PLUGIN]}
  appId={facebook_app_id}
  pageId={facebook_page_id}
/>
```

Make sure to replace `your_theme_color`, `facebook_app_id` and `facebook_page_id` with the actual values from your application's configuration.

### Script Component Props

| Prop     | Type             | Description                                                    |
| -------- | ---------------- | -------------------------------------------------------------- |
| appId    | string           | The Facebook app ID.                                           |
| pageId   | string           | The Facebook page ID.                                          |
| cookie   | boolean          | Specifies whether the cookie should be used. Default: `false`. |
| nonce    | string           | The nonce value for script security.                           |
| language | ISOLangCountry   | The language for the script.                                   |
| features | Array\<Features> | An array of Facebook features to enable.                       |

### Chat Component

The `Chat` component allows you to embed a Facebook Chat Plugin into your application. Here is an example of how to use it:

```jsx
<Chat minimized={true} color={your_theme_color} pageId={facebook_page_id} />
```

Ensure to replace `facebook_page_id` with the appropriate Facebook page ID from your application's configuration. Additionally, you can customize the `minimized` and `color` props to fit your specific requirements.

### Chat Plugin Component Props

| Prop      | Type    | Description                                     |
| --------- | ------- | ----------------------------------------------- |
| pageId    | string  | The Facebook page ID.                           |
| color     | string  | The color of the chat plugin.                   |
| minimized | boolean | Specifies whether the chat plugin is minimized. |

### Login Button Component

The `Button` component provides an easy way to integrate Facebook Login into your application. Here is an example of how to use it:

```jsx
import { Button } from "@tusken-s/facebook-tools";
...
<Button
  scope="public_profile,email"
  width="100%"
  language="fr_FR"
  buttonType="continue_with"
  callback={loginFacebookCallback}
/>
```

Replace `loginFacebookCallback` with the function that will handle the Facebook login callback in your application. Customize the `scope` and `width` props as needed.

Or use it as a wrapper for your already made custom button.

```jsx
<Button scope="public_profile,email" callback={loginFacebookCallback}>
  <button>Custom FB login button</button>
</Button>
```

### Button Component Props

| Prop       | Type                                        | Description                                                 |
| ---------- | ------------------------------------------- | ----------------------------------------------------------- |
| disabled   | boolean                                     | Specifies whether the button is disabled. Default: `false`. |
| width      | string \| number                            | The width of the button.                                    |
| scope      | string                                      | The Facebook login permissions scope.                       |
| buttonType | "continue_with" \| "login_with"             | The type of the button.                                     |
| callback   | (x: StatusResponse["authResponse"]) => void | The callback function triggered on successful login.        |
| style      | CSSProperties                               | Custom styles to be applied to the button.                  |
| language   | ISOLangCountry                              | The language for the button.                                |
| children   | ReactNode                                   | The content to be displayed inside the button.              |

## Language Support

The Facebook Tools module supports the following languages:

- English (en_US)
- French (fr_FR)
- Arabic (ar_AR)
- Spanish (es_ES)
- German (de_DE)
- Portuguese (pt_PT)
- Chinese (zh_CN)
- Hebrew (he_IL)

If the desired language is not specified or unsupported, the module will default to English (en_US). Additionally, when the user does not explicitly specify a language, the module will automatically use the browser's language setting.
Your [contribution](/CONTRIBUTING.md) to energize this with predefined facebook languages or to add more to the package will be welcome.

## Facebook SDK Type Definitions

In addition to the React components and functionality mentioned above, this module also offers comprehensive type definitions for Facebook's SDK native methods, classes, and tools. By simply installing the module, you gain access to the full range of Facebook SDK features with TypeScript support.

For example, you can use the Facebook SDK methods and classes as follows:

```jsx
// Access Facebook SDK methods and classes
window.FB.init({
  appId: "your_app_id",
  version: "v12.0",
});

window.FB.api("/me", (response) => {
  console.log(response);
});
```

and you won't get any type errors.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the [GitHub repository](https://github.com/tusken-s/facebook-tools).

Read the [contributing guide](/CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

Notice that contributions go far beyond pull requests and commits.
Although we love giving you the opportunity to put your stamp on the module, we also are thrilled to receive a variety of [other contributions](/CONTRIBUTORS).

## Changelog

The [changelog](/CHANGELOG.md) is regularly updated to reflect what's changed in each new release.

## Roadmap

Future plans and high-priority features and enhancements can be found **soon** in our [roadmap page](https://tuskens.com/libs#/facebook-tools/roadmap/).

## License

This project is licensed under the terms of the [MIT license](/LICENSE).

## Sponsoring services

Our Sponsors push our Research, Development & Infrastructure:

[<img loading="lazy" alt="Tuskens" src="https://tuskens.com/img/android-chrome-192x192.png" height="25">](https://tuskens.com/)

Tuskens allow us to host the Git repository and coordinate contributions.
