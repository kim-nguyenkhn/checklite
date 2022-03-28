# Checklite - The lightweight checklist app.

Download the [MacOS app here.](https://github.com/kim-nguyenkhn/checklite/releases)

<kbd>![Todo App Demo Gif](DOCS/demo.gif)</kbd>

Built with ❤️ using [Electron](https://electronjs.org/), [Electron Packager](https://github.com/electron-userland/electron-packager), and [Electron Builder](https://github.com/electron-userland/electron-builder) for releases.

## Getting Started

The first thing to do is install Node.js, if you haven't already. The easiest
way to do that is by visiting [nodejs.org](https://nodejs.org) and downloading
the installer, which will set up `node` and `npm` for you.

Once you've got that out of the way, clone the repository. If you're new to
git, check out the
[guide to cloning a repository](https://help.github.com/articles/cloning-a-repository/).

```sh
git clone https://github.com/kim-nguyenkhn/checklite.git
cd checklite
yarn install
yarn start
```

## Recommended GitHub Releases Workflow

1. Bump the "Tag version" to the value of version in your application `package.json`, and prefix it with v. "Release title" can be anything you want.

For example, if your application `package.json` version is 1.0, your draft's "Tag version" would be v1.0.

2. Draft a new release with `yarn run make`.

3. Push some commits. Every CI build will update the artifacts attached to this draft.

4. Once you are done, publish the release. GitHub will tag the latest commit for you.

The benefit of this workflow is that it allows you to always have the latest artifacts, and the release can be published once it is ready.

## Next Steps

- Add a timestamp/due date to the todo items
- Convert everything to React components
- Have some integration with Google Calendar, or iCal
- Implement a simple cache
