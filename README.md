# Beckn BAP User Strapi

This repository contains the implementation of a Beckn BAP (Buyer App Provider) using Strapi CMS. It provides a robust backend for implementing Beckn-compliant services, specifically focused on user management and order processing.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Release Notes](#release-notes)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Beckn Protocol is an open and decentralized standard designed to enable interoperability among various digital platforms. This implementation provides a Strapi-based backend for a Beckn BAP, handling user management, order processing, and other essential functionalities.

## Features

- User authentication and authorization
- Order management and processing
- Category-based order filtering
- Account reset functionality
- Webhook support for unsolicited calls

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/beckn/beckn-bap-user-strapi.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

4. **Start the Application**:
   ```bash
   npm run develop
   ```

## Configuration

The application can be configured through environment variables and Strapi's configuration files. Key configurations include:

- Database settings
- JWT authentication
- API endpoints
- Webhook configurations

## Usage

### Authentication
```bash
# Login to get JWT token
curl -X POST http://localhost:1338/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "your-email@example.com",
    "password": "your-password"
  }'
```

### Reset Account
```bash
curl -X POST http://localhost:1338/api/reset-account \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "category-id"
  }'
```

## Release Notes

### Latest Changes
1. **Initial Code**: Base implementation of Strapi for BAP Orders, providing core functionality for order management and processing
2. **Webhook Support**: Added support for unsolicited webhooks to handle real-time order status updates from BPPs
3. **Account Reset**: Implemented account reset functionality allowing users to delete all orders for a specific category

## Contributing

Contributions are welcome! If you want to contribute to this project, follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

Make sure to follow the coding standards and include relevant test cases.

## License

This project is licensed under the [MIT License](LICENSE).

---

For any queries or support, please raise an issue in this repository or reach out to the Beckn team.
