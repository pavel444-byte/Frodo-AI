import os
import requests
import json

def chat_with_openrouter(message):
    """
    Sends a message to the OpenRouter API and prints the response.
    """
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        print("Error: OPENROUTER_API_KEY environment variable not set.")
        return

    api_url = "https://api.openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "mistralai/Mistral-7B-Instruct-v0.1",
        "messages": [{"role": "user", "content": message}]
    }

    try:
        response = requests.post(api_url, headers=headers, data=json.dumps(data))
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)

        response_json = response.json()
        if response_json and response_json["choices"]:
            ai_response = response_json["choices"][0]["message"]["content"]
            print("AI Response:", ai_response)
        else:
            print("Error: Unexpected response format from OpenRouter API.")
            print("Response:", response_json)

    except requests.exceptions.RequestException as e:
        print(f"Request Error: {e}")
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        print(f"Raw Response Text: {response.text}")
    except KeyError as e:
        print(f"Key Error: {e}. Check the response format.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

def test_server_connection():
    """
    Tests the connection to the /test-env endpoint of the server.
    """
    try:
        response = requests.get("http://localhost:5000/test-env")
        response.raise_for_status()
        print("Server connection test successful!")
        print("Response:", response.text)
    except requests.exceptions.RequestException as e:
        print(f"Server connection test failed: {e}")

if __name__ == "__main__":
    test_server_connection()
    message = input("Enter your message: ")
    chat_with_openrouter(message)
