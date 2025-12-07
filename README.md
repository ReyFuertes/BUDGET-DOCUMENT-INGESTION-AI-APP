# Receipt Budget App

This project is a Receipt Budgeting Application that utilizes AI to extract data from receipt images.

## Recent Updates (December 7, 2025)

### Gemini API Integration Fix
The application has been updated to use the latest **Google Gemini 2.5 Flash** model (`gemini-2.5-flash`), as the previous `gemini-1.5-flash` model has been retired.

**Changes:**
- **Service:** `AiExtractionService.cs` was refactored to use the official `Google.GenAI` .NET SDK instead of raw HTTP requests.
- **Dependencies:** Added `Google.GenAI` NuGet package to the Server project.
- **Configuration:** Ensure your `appsettings.json` or `appsettings.Development.json` in the `Server` project contains the `GeminiApiKey`.

### Git Configuration
A `.gitignore` file has been added to the project root to exclude build artifacts (`bin`, `obj`, `.vs`) and text files (`.txt`).

## Getting Started

### Prerequisites
- .NET 9.0 SDK
- Node.js (for the Client)
- A Google Cloud API Key with access to the Gemini API.

### Server Setup
1. Navigate to the `Server` directory.
2. Update `appsettings.json` with your API Key:
   ```json
   {
     "GeminiApiKey": "YOUR_VALID_GEMINI_API_KEY",
     ...
   }
   ```
3. Build and run the server:
   ```bash
   dotnet build
   dotnet run
   ```

### Client Setup
1. Navigate to the `Client` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## Project Structure
- **Server:** ASP.NET Core Web API backend.
- **Client:** Angular frontend.
