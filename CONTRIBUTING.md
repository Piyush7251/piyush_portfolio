# Contributing to Piyush Bhatt's Portfolio

Thank you for your interest in contributing to this project! We welcome feedback, bug reports, feature suggestions, and pull requests to help improve the codebase.

The following guidelines explain how to contribute effectively and maintain project quality.

---

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [piyushbhatt7251@gmail.com](mailto:piyushbhatt7251@gmail.com).

---

## How Can I Contribute?

### 1. Reporting Bugs

Before creating a bug report, please check existing issues to ensure it hasn't already been addressed. When filing an issue, please include:
* **Clear description**: Summary of the bug.
* **Steps to reproduce**: Exact steps to encounter the problem.
* **Expected vs. Actual behavior**: What should have happened vs. what actually happened.
* **Screenshots / Logs**: Visual proof if applicable.
* **Device / Browser info**: Operating system, browser name, and version.

### 2. Suggesting Enhancements

Feature requests and design enhancements are welcome! When opening an issue:
* Explain the rationale and use case for the feature.
* Describe how it fits the portfolio's aesthetics, performance, and functionality.
* Provide mockups or code snippets if available.

### 3. Pull Requests

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/piyush_portfolio.git
   cd piyush_portfolio
   ```
3. **Create a descriptive feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
4. **Make your changes** following the project standards.
5. **Test locally**:
   - Open `index.html` in multiple browsers (Chrome, Firefox, Safari/Edge) to verify responsiveness.
   - Verify that all assets, links, and animations render properly.
6. **Commit your changes** with clear, concise messages:
   ```bash
   git commit -m "Add: description of your feature or fix"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** against the `main` branch of this repository.

---

## Coding Guidelines

* **HTML**: Semantic HTML5 markup, accessible landmarks, and valid nesting.
* **CSS**: Use established CSS variables from `css/index.css` for palette colors, fonts, and spacing. Ensure responsive design across mobile (<480px), tablet (<768px), and desktop.
* **JavaScript**: Modern ES6+ vanilla JavaScript without unnecessary external dependencies.
* **Assets**: Optimize images (JPEG/WebP/SVG) to keep page load times fast and preserve Core Web Vitals.

---

## Licensing

By contributing to this repository, you agree that your contributions will be licensed under the project's [Apache License 2.0](LICENSE).
