using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using BudgetApp.Server.Models;
using Microsoft.Extensions.Configuration;
using Google.GenAI;
using Google.GenAI.Types;

namespace BudgetApp.Server.Services
{
    public interface IAiExtractionService
    {
        Task<Receipt> ExtractDataAsync(string imageBase64);
    }

    public class AiExtractionService : IAiExtractionService
    {
        private readonly Client _client;
        private const string ModelName = "gemini-2.5-flash";

        public AiExtractionService(IConfiguration configuration)
        {
            var apiKey = configuration["GeminiApiKey"];
            if (string.IsNullOrEmpty(apiKey))
            {
                throw new ArgumentNullException(nameof(apiKey), "GeminiApiKey not found in configuration");
            }
            // Initialize the client with the API key
            _client = new Client(apiKey: apiKey);
        }

        public async Task<Receipt> ExtractDataAsync(string imageBase64)
        {
            var prompt = "Extract data from this receipt. Return ONLY valid JSON with this structure: { \"merchantName\": string, \"storeDate\": \"YYYY-MM-DD\", \"totalAmount\": number, \"currency\": string, \"items\": [{ \"description\": string, \"amount\": number, \"quantity\": number }] }. Do not include Markdown formatting.";

            try 
            {
                // Construct the request using the types from Google.GenAI.Types
                var request = new GenerateContentConfig
                {
                    // Wait, GenerateContentAsync usually takes (model, content) or (model, request).
                    // Let's assume the request object is GenerateContentRequest or similar.
                    // If the SDK is 0.7.0, it might use 'Content' objects directly.
                };

                // Preparing content
                var content = new Content
                {
                    Parts = new List<Part>
                    {
                        new Part { Text = prompt },
                        new Part 
                        {
                            InlineData = new Blob 
                            {
                                MimeType = "image/jpeg", 
                                Data = Convert.FromBase64String(imageBase64) 
                            } 
                        }
                    }
                };

                // Calling the API. 
                // Based on search: client.Models.GenerateContentAsync(model, contents, config)
                // Note: 'contents' might be IEnumerable<Content> or a single Content.
                
                var response = await _client.Models.GenerateContentAsync(
                    model: ModelName, 
                    contents: new List<Content> { content }
                );
                
                string? text = null;
                if (response?.Candidates != null && response.Candidates.Count > 0)
                {
                    var firstCandidate = response.Candidates[0];
                    if (firstCandidate?.Content?.Parts != null && firstCandidate.Content.Parts.Count > 0)
                    {
                        text = firstCandidate.Content.Parts[0].Text;
                    }
                }

                if (string.IsNullOrEmpty(text))
                {
                     throw new Exception("No text generated from Gemini API.");
                }

                return ParseGeminiResponse(text);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Gemini SDK Error: {ex.Message}");
                throw;
            }
        }

        private Receipt ParseGeminiResponse(string jsonText)
        {
            var cleanJson = jsonText.Replace("```json", "").Replace("```", "").Trim();
            
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            try 
            {
                return JsonSerializer.Deserialize<Receipt>(cleanJson, options) 
                       ?? new Receipt { MerchantName = "Failed to parse" };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"JSON Parse Error: {ex.Message}\nJSON: {cleanJson}");
                throw;
            }
        }
    }
}
