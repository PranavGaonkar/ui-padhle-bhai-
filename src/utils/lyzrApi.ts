
interface LyzrStudioRequest {
  user_id: string;
  agent_id: string;
  session_id: string;
  message: string;
}

interface LyzrStudioResponse {
  response: string;
  // Add other properties as needed based on the actual API response
}

const LYZR_API_KEY = "sk-default-Ex1Rz76gO4Pqk0So9WjI4EWtzyz3rSst";

export const sendMessageToLyzr = async (message: string): Promise<LyzrStudioResponse> => {
  try {
    const payload: LyzrStudioRequest = {
      user_id: "cgpranav@gmail.com", // This could be made configurable
      agent_id: "67f7ca81f6ac7a3813f4b521",
      session_id: "67f7ca81f6ac7a3813f4b521",
      message: message
    };

    const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': LYZR_API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error from Lyzr API: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message to Lyzr:', error);
    throw error;
  }
}
