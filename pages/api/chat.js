export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Simple AI agent logic with pattern matching and responses
  const response = generateResponse(message, history);

  res.status(200).json({ response });
}

function generateResponse(message, history) {
  const lowerMessage = message.toLowerCase();

  // Greeting patterns
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return "Hello! I'm a simple AI agent. How can I help you today?";
  }

  // How are you
  if (lowerMessage.match(/(how are you|how do you do)/)) {
    return "I'm functioning perfectly! Thanks for asking. What can I do for you?";
  }

  // Name questions
  if (lowerMessage.match(/(what's your name|who are you|your name)/)) {
    return "I'm a Simple AI Agent, created to demonstrate basic conversational AI capabilities. I can answer questions, help with tasks, and have conversations!";
  }

  // Math operations
  const mathMatch = lowerMessage.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
  if (mathMatch) {
    const num1 = parseFloat(mathMatch[1]);
    const op = mathMatch[2];
    const num2 = parseFloat(mathMatch[3]);
    let result;

    switch(op) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num2 !== 0 ? num1 / num2 : 'undefined (division by zero)'; break;
    }

    return `The result is: ${result}`;
  }

  // Time
  if (lowerMessage.match(/(what time|current time|time now)/)) {
    return `The current time is: ${new Date().toLocaleTimeString()}`;
  }

  // Date
  if (lowerMessage.match(/(what date|today's date|current date)/)) {
    return `Today's date is: ${new Date().toLocaleDateString()}`;
  }

  // Help
  if (lowerMessage.match(/(help|what can you do|capabilities)/)) {
    return "I can help you with:\n- Simple math calculations (e.g., '5 + 3')\n- Tell you the current time and date\n- Answer basic questions\n- Have a conversation\n- Provide information on various topics\n\nJust ask me anything!";
  }

  // Thank you
  if (lowerMessage.match(/(thank|thanks|appreciate)/)) {
    return "You're welcome! Let me know if you need anything else.";
  }

  // Goodbye
  if (lowerMessage.match(/(bye|goodbye|see you|farewell)/)) {
    return "Goodbye! Have a great day!";
  }

  // Weather (simulated)
  if (lowerMessage.match(/weather/)) {
    return "I don't have real-time weather data, but I can tell you it's always sunny in the digital world! 🌞";
  }

  // Jokes
  if (lowerMessage.match(/(tell.*joke|joke|funny)/)) {
    const jokes = [
      "Why did the AI go to school? To improve its neural network!",
      "What do you call an AI that sings? A-Dell!",
      "Why did the programmer quit? Because they didn't get arrays!",
      "How do robots eat guacamole? With computer chips!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Purpose/meaning
  if (lowerMessage.match(/(meaning of life|purpose|why are we here)/)) {
    return "The meaning of life is a profound question! While I can't give you a definitive answer, I can say that many find purpose in connections, growth, and making a positive impact.";
  }

  // Default response with context awareness
  const responses = [
    `That's an interesting point about "${message}". Could you tell me more?`,
    `I understand you're asking about "${message}". While I'm a simple agent, I'm here to help!`,
    `Thanks for sharing that! Regarding "${message}", I'd be happy to discuss it further.`,
    `That's a great question! While my knowledge is limited, I'll do my best to help with "${message}".`,
    `I'm processing your message about "${message}". Is there a specific aspect you'd like to explore?`
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
