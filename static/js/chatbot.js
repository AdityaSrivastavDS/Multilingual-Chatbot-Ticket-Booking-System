document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Get the user's input from the chat input box
    const userInput = document.getElementById('chat_input').value;

    if (userInput.trim() === "") return; // Prevent sending empty messages

    // Display the user message in the chat box
    addChatMessage(userInput, 'user-message');

    // Send the user message to the backend for response
    fetch('/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: userInput}) // Send input to backend
    })
    .then(response => response.json()) // Get the JSON response
    .then(data => {
        // Display the bot's response in the chat box
        addChatMessage(data.response, 'bot-message');
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Clear the chat input field after sending the message
    document.getElementById('chat_input').value = '';
});

function addChatMessage(message, className) {
    const chatResponse = document.getElementById('chat-response');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', className);
    messageElement.textContent = message;
    chatResponse.appendChild(messageElement);

    // Scroll to the bottom of the chat box
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}
