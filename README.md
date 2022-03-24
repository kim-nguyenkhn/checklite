# Electron Todo App (Desktop)

Download the [MacOS app here.](https://github.com/kim-nguyenkhn/kim-trang-calendar/releases)

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
git clone https://github.com/kim-nguyenkhn/kim-trang-calendar.git
cd kim-trang-calendar
yarn install
yarn start
```

## Using Electron-Packager to Test Releases

Run this in the root directory:

```
electron-packager .
```

`electron-packager` will do the following:

* Use the current directory for the `sourcedir`
* Infer the `appname` from the `productName` in `package.json`
* Infer the `appVersion` from the `version` in `package.json`
* Infer the `platform` and `arch` from the host, in this example, `darwin` platform and `x64` arch.
* Download the darwin x64 build of Electron 1.4.15 (and cache the downloads in `~/.electron`)
* Build the OS X `Foo Bar.app`
* Place `Foo Bar.app` in `foobar/Foo Bar-darwin-x64/` (since an `out` directory was not specified, it used the current working directory)

The `Foo Bar.app` folder generated can be executed by a system running OS X, which will start the packaged Electron app. This is also true of the Windows x64 build on a system running a new enough version of Windows for a 64-bit system (via `Foo Bar-win32-x64/Foo Bar.exe`), and so on.

See more on Electron Packager [here](https://github.com/electron-userland/electron-packager).


## Recommended GitHub Releases Workflow

1. Bump the "Tag version" to the value of version in your application `package.json`, and prefix it with v. "Release title" can be anything you want.

For example, if your application `package.json` version is 1.0, your draft's "Tag version" would be v1.0.

2. Draft a new release with `yarn release`.

3. Push some commits. Every CI build will update the artifacts attached to this draft.

4. Once you are done, publish the release. GitHub will tag the latest commit for you.

The benefit of this workflow is that it allows you to always have the latest artifacts, and the release can be published once it is ready.

## Next Steps

- Add a timestamp/due date to the todo items
- Convert everything to React components
- Have some integration with Google Calendar, or iCal
- Implement a simple cache
