import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked"; // Import the 'marked' package

// Ensure you have the correct API key and replace it with your own
const apiKey: string = "AIzaSyDuf8A2ZK2fECIIAJ_YzVVayW85v-Mg9Rc";

// Initialize the GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(apiKey);

// Type the model as `any` or create specific types if available
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define the function that takes a prompt and returns the text response
export async function generateAIContent(prompt: string): Promise<any> {
  try {
    // Await the content generation process
    const result = await model.generateContent(prompt);

    // Get the response in markdown
    const markdownText = result.response.text();
    console.log(markdownText);

    // Convert the markdown to HTML using the 'marked' library
    // const htmlText = marked(markdownText);

    //to json
    const markdownJSON = marked.lexer(markdownText);
    console.log(markdownJSON);

    // Return the HTML content
    return markdownJSON;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content");
  }
}

// Example usage of the reusable function
const prompt = "Explain how AI works";

generateAIContent(prompt)
  .then((htmlText) => {
    console.log("Generated HTML:", htmlText);
    // Now you can use `htmlText` to render HTML in your frontend (e.g., in a web app or mobile app)
  })
  .catch((error) => {
    console.error("Error:", error);
  });
