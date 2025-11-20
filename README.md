<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT
License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>
<br />
<div align="center">
  <h1 align="center">Course 2 Calendar</h1>

  <p align="center">
    Add an SFU course schedule to your calendar. This project is not endorsed or supported by Simon Fraser University.
    <br />
    Live Project: <a href="https://course2calendar.com"><strong>https://course2calendar.com</strong></a>
    <br />
    <br />
    <a href="https://github.com/ewanbrinkman/course2calendar/issues">Report Bug</a>
    ·
    <a href="https://github.com/ewanbrinkman/course2calendar/issues">Request Feature</a>
  </p>
</div>

<!-- Table of contents. -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

Live Project: [https://course2calendar.com](https://course2calendar.com)

I used to spend about 15 minutes every term adding my courses to my
calendar. I found that a bit annoying - and so spent much more time
creating this website - ha! Now, simply add all your courses, then
download a file you can import into your calendar with your schedule.
Hopefully it saves some of you some time!

**This project is not endorsed or supported by Simon Fraser University.**

## Getting Started

Instructions for how to set up locally are below.

### Prerequisites

- node
- npm _(comes with node)_

### Installation

1. Clone this repository. For example, if using SSH:
   ```sh
   git clone git@github.com:ewanbrinkman/course2calendar.git
   ```
2. Go to the directory of `course2calendar`.
   ```sh
   cd course2calendar
   ```
3. Install NPM packages.
   ```sh
   npm install
   ```
4. Start the dev server.
   ```sh
   npm run dev
   ```

For hosting, update `baseUrl` in [src/app/sitemap.ts](src/app/sitemap.ts).

## Contributing

For suggesting new areas and locations for an area: feel free to open an issue
[here](https://github.com/ewanbrinkman/course2calendar/issues).

For code changes: feel free to fork and create a pull request, or open an issue
[here](https://github.com/ewanbrinkman/course2calendar/issues).

## License

Distributed under the MIT License. See [`LICENSE`](/LICENSE) for more
information.

## Contact

Ewan Brinkman

Project Link:
[https://github.com/ewanbrinkman/course2calendar](https://github.com/ewanbrinkman/course2calendar)

<!-- Markdown links and images. -->

[contributors-shield]: https://img.shields.io/github/contributors/ewanbrinkman/course2calendar.svg?style=for-the-badge
[contributors-url]: https://github.com/ewanbrinkman/course2calendar/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ewanbrinkman/course2calendar.svg?style=for-the-badge
[forks-url]: https://github.com/ewanbrinkman/course2calendar/network/members
[stars-shield]: https://img.shields.io/github/stars/ewanbrinkman/course2calendar.svg?style=for-the-badge
[stars-url]: https://github.com/ewanbrinkman/course2calendar/stargazers
[issues-shield]: https://img.shields.io/github/issues/ewanbrinkman/course2calendar.svg?style=for-the-badge
[issues-url]: https://github.com/ewanbrinkman/course2calendar/issues
[license-shield]: https://img.shields.io/github/license/ewanbrinkman/course2calendar.svg?style=for-the-badge
[license-url]: https://github.com/ewanbrinkman/course2calendar/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ewan-brinkman
